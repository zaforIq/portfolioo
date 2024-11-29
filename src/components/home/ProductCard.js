import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { MdOutlineShoppingCart } from "react-icons/md";

const ProductCard = (props) => {
  let url = 'https://mycommerce-iy3p.onrender.com/api/product/photo/' + props.product._id;

  return (
    <div className='my-3'>
    <div className='relative group'>
      <img src={url} alt={props.product.title} className='w-full h-56 object-cover rounded' />
      <div className='absolute bottom-4 right-4 flex space-x-2 z-10'>
         <div className='bg-white p-2 rounded-full shadow-md'>
          <MdOutlineShoppingCart onClick={props.handleAddToCart} className='text-black cursor-pointer' />
        </div>
        <div className='bg-white p-2 rounded-full shadow-md'>
          <FaHeart onClick={()=>console.log('heart clicked')} className='text-red-600 cursor-pointer' />
        </div>
      </div>
      <button onClick={()=>console.log('details clicked')} className='absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center rounded z-0'>
        View Details
      </button>
      
    </div>

    <div className='mt-2'>
       <p className='text-xs md:text-sm'>{props.product.name}</p>
        <div className='flex items-center space-x-2'>
          <span style={{ fontSize: 20 }}>&#2547;</span>
          <span className='font-semibold'>{props.product.price}</span>
          <p>
            {props.product.quantity ? (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">In Stock</span>
            ) : (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Out of Stock</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;