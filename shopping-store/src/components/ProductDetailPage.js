import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'; 

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart"); 
  };
  
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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center shadow-md mt-28 mx-64 py-16">
      <h2 className="text-3xl font-bold mb-8">{product.name}</h2>
      <img src={product.image_url} alt="product-image" class="w-full rounded-lg sm:w-40" />
      
      <p className="text-xl text-gray-600">${product.price}</p>
      <p className="text-lg text-gray-800">{product.description}</p>
      <button class="mt-6 w-1/2 rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={() => handleAddToCart(product)}>
        Add To Cart </button>
    </div>
  );
}

export default ProductDetailPage;
