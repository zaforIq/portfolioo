import { useState, useEffect } from 'react';
import Layout from '../Layout';
import CheckBox from './Checkbox'
import { showError, showSuccess } from '../../utils/messages';
import { getCategories,getProducts,getProductDetails,getFilteredProducts } from '../api/ApiProduct'
import RadioBox from './RadioBox'
import { prices } from '../../utils/Prices'
import { isAuthenticated, userInfo } from '../../utils/auth';
import { addToCart } from '../api/ApiOrder';
import { useLocation } from 'react-router-dom';
import hero1 from '../../assets/images/hero1.jpg';
import { CiFilter } from "react-icons/ci";
import ProductCard from '../home/ProductCard';

const Shop = () => {
      const location = useLocation();
  const { item } = location.state || {};

  console.log(item);


    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [limit, setLimit] = useState(30);
    const [skip, setSkip] = useState(0);
    const [order, setOrder] = useState('desc');
    const [sortBy, setSortBy] = useState('createdAt');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [filters, setFilters] = useState({
        category: [],
        price: []
    })

    useEffect(() => {
        getProducts(sortBy, order, limit)
            .then(response => setProducts(response.data))
            .catch(err => setError("Failed to load products!"));

        getCategories()
            .then(response => setCategories(response.data))
            .catch(err => setError("Failed to load categories!"));
    }, [])



    const handleAddToCart=product=>()=>{
        if (isAuthenticated()){
            setError(false)
            setSuccess(false)
            const user=userInfo();
            const cartItem={
                user:user._id,
                product:product._id,
                price:product.price
            }
            addToCart(user.token,cartItem)
            .then(response=>setSuccess(true))
            .catch(err=>{
                if(err.response) setError(err.response.data)
                    else setError('adding to cart failed')
            })
        }
        else {
            setSuccess(false)
            setError('Please Log in first')
        }
    }


    const handleFilters = (myfilters, filterBy) => {
        const newFilters = { ...filters };
        if (filterBy === 'category') {
            newFilters[filterBy] = myfilters
        }
        if (filterBy==='price'){
            const data=prices
            let arr=[]
            for (let i in data){
                if (data[i].id===parseInt(myfilters)){
                    arr=data[i].arr
                }
            }
            newFilters[filterBy]=arr
        }
        setFilters(newFilters);
        getFilteredProducts(skip, limit, newFilters, order, sortBy)
            .then(response => setProducts(response.data))
            .catch(err => setError("Failed to load products!"));
    }

    const showFilters = () => {
        return (
            <>
                <div className="row md:flex md:justify-between">
                    <div className="mt-8">
                        <h5 className='text-sm ml-3'>Filter By Categories:</h5>

                        <ul className='ml-4'>
                            <CheckBox
                                categories={categories}
                                handleFilters={myfilters => handleFilters(myfilters, 'category')}
                                item={item}
                            />
                        </ul>
                    </div>
                    <div className='col-sm-5 mt-8'>
                        <h5 className='text-sm'>Filter By Price</h5>
                        <div className='row'>
                            <RadioBox prices={prices} handleFilters={myfilters=>handleFilters(myfilters,'price')}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }


      const [selectedCategory, setSelectedCategory] = useState('');
        const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    // Add logic to filter products based on selected category
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFIlterClick = () => {
    setIsModalOpen(true);
  }
  const handleFIlterCose = () => {
    setIsModalOpen(false);
    }

    return (
        <Layout title="Shop" className='container mx-auto px-8 md:px-16'>

            <div className=''>
                 <img src={hero1} alt="hero1" className='rounded' />

                 <div className='pt-8 pb-4 flex justify-between'>
                    <ul className='hidden md:flex space-x-2 md:space-x-4'>
                        <li className='text-xs md:text-sm'>All Products</li>
                        <li className='text-xs md:text-sm'>Best Sellers</li>
                        <li className='text-xs md:text-sm'>New Arrivals</li>
                    </ul>

            <div className='md:hidden'>
          <select
            className='text-xs md:text-sm'
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value='all-products'>All Products</option>
            <option value='best-sellers'>Best Sellers</option>
            <option value='new-arrivals'>New Arrivals</option>
          </select>
        </div>

                    <div className='flex space-x-2 md:space-x-4 relative'>
                            <button onClick={()=>handleFIlterClick()} className='flex'>
                            <CiFilter className='mt-1 md:mt-0.5' size={20} />
                            <p className='hidden md:block ml-1'>Filter</p>
                            </button>
                                      {isModalOpen && (
            <div className='absolute top-full mt-2 right-0 bg-white p-4 rounded shadow-lg z-20 md:w-96'>
                <div className='flex justify-between space-x-24'>
                    <h3 className='text-sm'>Filter</h3>
                    <button onClick={handleFIlterCose}>X</button>
                </div>
                <div>
            {showFilters()}
                </div>

            </div>
          )}

                        <div>
                            
                            <select className='text-xs md:text-sm'>
                                <option value=''>Default Sorting</option>
                                <option value=''>Ascending</option>
                                <option value=''>Discending</option>
                            </select>
                        </div>
                    </div>
                 </div>

            </div>

              <div style={{ width: "100%" }}>
                {showError(error, error)}
                {showSuccess(success, "Added to cart successfully!")}
                
            </div>



            <div className="grid grid-cols-1 gap-2 rounded mt-4 md:grid-cols-4">
                {products && products.map(product => <ProductCard product={product} key={product._id} handleAddToCart={handleAddToCart(product)}/>)}
            </div>
        </Layout>
    )
}

export default Shop;