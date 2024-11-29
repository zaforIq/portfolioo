import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import bottomhero from '../../assets/images/Homeslider1_files/bottomhero.jpg';
import bottomhero2 from '../../assets/images/Homeslider1_files/bottomhero2/6377619.jpg';
import hero2 from '../../assets/images/hero2.jpg';
import acessories from '../../assets/images/Homeslider1_files/3-29-433x516.jpg';
import footwares from '../../assets/images/Homeslider1_files/footwear.jpg';
import bags from '../../assets/images/Homeslider1_files/bags.jpg';
import hats from '../../assets/images/Homeslider1_files/Hats.jpg';
import watches from '../../assets/images/Homeslider1_files/watch.jpg';
import womenmen from '../../assets/images/Homeslider1_files/woman-man.jpg';
import p1 from '../../assets/images/Homeslider1_files/1-32-433x516.jpg';
import { getProducts } from '../api/ApiProduct';
import ProductCard from './ProductCard';
import { isAuthenticated, userInfo } from '../../utils/auth';
import { addToCart } from '../api/ApiOrder';
import { useState } from 'react';
import { showError, showSuccess } from '../../utils/messages';



const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);
      const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [filters, setFilters] = useState({
        category: [],
        price: []
    })

  const handleClick = (item) => {
    navigate('/shop', { state: { item } });
  }

  useEffect(() => {
    getProducts('createdAt', 'desc', 6)
      .then(response => setProducts(response.data))
      .catch(err => console.log(err));
  }, []);

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



  const productList=products.map(product =><ProductCard  key={product._id} product={product} handleAddToCart={handleAddToCart(product)} />);

  return (
    <Layout title="Home" className='container mx-auto px-8 md:px-16'>
      <div>
        <img src={hero2} alt="hero1" className='w-full h-96 object-cover rounded' />
        <div className='absolute top-32 md:top-72 left-12 md:left-64'>
          <p className='font-bold text-xl md:text-5xl'>Sell Upto</p>
          <p className='font-bold text-xl md:text-5xl'>70% Off</p>
          <button onClick={() => navigate('/shop')} className='bg-black text-white px-1.5 md:px-4 py-1 md:py-2 md:mt-4 rounded text-sm md:text-lg'>Shop Now</button>
        </div>
      </div>

<div className='mt-8 md:mt-16'>
        <h1 className='text-4xl text-center'>Categories</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-4'>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-1'>
          <div className='relative group'>
            <img src={acessories} alt="accessories" className='w-full h-auto md:h-56 object-cover rounded' />
            <button onClick={() => handleClick('Accessories')} className='absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center rounded'>
              Accessories
            </button>
          </div>
          <div className='relative group'>
            <img src={watches} alt="watches" className='w-full h-auto md:h-56 object-cover rounded' />
            <button onClick={() => handleClick('Watches')} className='absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center rounded'>
              Watches
            </button>
          </div>
        </div>
        <div className='relative group'>
          <img src={womenmen} alt="womenmen" className='w-full h-auto object-cover rounded' />
          <button onClick={() => handleClick('Cloths')} className='absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center rounded'>
            Women & Men
          </button>
        </div>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-1'>
          <div className='relative group'>
            <img src={bags} alt="bags" className='w-full h-auto md:h-56 object-cover rounded' />
            <button onClick={() => handleClick('Bags')} className='absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center rounded'>
              Bags
            </button>
          </div>
          <div className='relative group'>
            <img src={footwares} alt="footwares" className='w-full h-auto md:h-56 object-cover rounded' />
            <button onClick={() => handleClick('Footwares')} className='absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center rounded'>
              Footwares
            </button>
          </div>
        </div>
      </div>
      </div>

      <div className='mt-16'>
        <h1 className='text-4xl text-center'>Featured Products</h1>
                      <div style={{ width: "100%" }}>
                {showError(error, error)}
                {showSuccess(success, "Added to cart successfully!")}
                
            </div>
        <div className='grid grid-cols-1 gap-2 rounded mt-4 md:grid-cols-4'>
      {productList}
        </div>
      </div>

      <div className='mt-16'>
        <img src={bottomhero2} alt="p1" className='w-full h-auto object-cover rounded' />

      </div>

      <div className='mt-16 text-center'>
        <h1 className='text-xl'>NewsLatter</h1>
        <input type="email" placeholder='Enter your email' className='border-b-2 mt-4 w-3/4' />
        <button className=''>Subscribe</button>
      </div>

    </Layout>
  );
}

export default Home;