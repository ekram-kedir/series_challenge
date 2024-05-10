import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, productId }));
      navigate("/cart"); 
    }
  };
  
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div 
      className="flex flex-col justify-center items-center shadow-md mt-28 mx-64 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-3xl font-bold mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {product.name}
      </motion.h2>
      <motion.img 
        src={product.image_url} 
        alt="product-image" 
        className="w-full rounded-lg sm:w-40"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      />
      
      <motion.p 
        className="text-xl text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        ${product.price}
      </motion.p>
      <motion.p 
        className="text-lg text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {product.description}
      </motion.p>
      <motion.button 
        className="mt-6 w-1/2 rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" 
        onClick={handleAddToCart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        Add To Cart
      </motion.button>
    </motion.div>
  );
}

export default ProductDetailPage;
