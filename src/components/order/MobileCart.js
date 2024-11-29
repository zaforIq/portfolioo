import React,{useState,useEffect} from 'react';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getCartItems,updateCartItems,deleteCartItem } from '../api/ApiOrder';
import { userInfo } from '../../utils/auth';
import { FaTimesCircle } from 'react-icons/fa';

const MobileCart = () => {
const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(false);

    const loadCart = () => {
    getCartItems(userInfo().token)
      .then((response) => setCartItems(response.data))
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Cart item loading failed");
      });
  };

    useEffect(() => {
    loadCart();
  }, []);

    const increaseItem = (item) => {
    if (item.count === 5) return;
    const cartItem = {
      ...item,
      count: item.count + 1,
    };

    updateCartItems(userInfo().token, cartItem)
      .then((response) => loadCart())
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Cart item update failed");
      });
  };

    const decreaseItem = (item) => {
    if (item.count === 1) return;
    const cartItem = {
      ...item,
      count: item.count - 1,
    };
    updateCartItems(userInfo().token, cartItem)
      .then((response) => loadCart())
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Cart item update failed");
      });
  };

    const removeItem = (item) => {

    if (!window.confirm("Delete Item?")) return;
    deleteCartItem(userInfo().token, item)
      .then((response) => {
        loadCart();
      })
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Cart item delete failed");
      });
  };



  return (
    <div>
      <div className="flex justify-between items-center bg-gray-100 p-2">
        <div className="text-lg font-semibold">Cart</div>
        <div className="text-lg font-semibold">Total: $100</div>
      </div>
      <div className="flex flex-col py-2">
        {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center p-2 my-2 bg-white shadow-md rounded">
                <div className="flex items-center space-x-2">
                <img src={`https://mycommerce-iy3p.onrender.com/api/product/photo/${item.product._id}`} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                <div>
                    <p>{item.product.name}</p>
                    <div className="flex items-center space-x-2">
                    <span style={{ fontSize: 20 }}>&#2547;</span>
                    <span className="font-semibold">{item.price}</span>
                    <p>
                        {item.product.quantity ? (
                            <div>
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full hidden md:block">In Stock</span>
                            <FaTimesCircle className="text-green-500 text-lg block md:hidden" />
                            </div>
                        ) : (
                            <div>
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full hidden md:block">Out of Stock</span>
                             <FaTimesCircle className="text-red-500 text-lg block md:hidden" />
                            </div>
                        
                        
                        )}
                    </p>
                    </div>
                </div>
                </div>
                <div className="flex items-center space-x-1 md:space-x-2">
                <div className="bg-gray-200 p-1 md:p-2 rounded-full">
                    <FaMinus onClick={() => decreaseItem(item)} className="text-black cursor-pointer" />
                </div>
                <div>{item.count}</div>
                <div className="bg-gray-200 p-1 md:p-2  rounded-full mr-2">
                    <FaPlus onClick={() => increaseItem(item)} className="text-black cursor-pointer" />
                </div>
                <div className="bg-red-200 p-1 md:p-2 rounded-full">
                    <FaTimes onClick={() => removeItem(item)} className="text-red-600 cursor-pointer" />
                </div>
                </div>
            </div>
         
        ))}
      </div>
            <div className="flex justify-between items-center p-4">
        <Link to="/shop" className="btn btn-warning">
          Continue Shopping
        </Link>
        <Link to="/shipping" className="btn btn-success">
          Checkout
        </Link>
        
      </div>
    </div>
  );
};

export default MobileCart;