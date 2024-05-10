import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from "../slices/cartSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      {cart.cartItems.length === 0 ? (
        <motion.div 
          className="flex flex-col justify-center rounded-md items-center shadow-md mt-28 mx-64 py-16 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="p-2 text-lg font-semibold">Your cart is currently empty</p>
          <img src="/images/noitem.png" className="w-60 h-60"/>
          <div className="start-shopping">
            <Link to="/products">
              <span className='text-blue-700 text-md'>Start Shopping</span>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="h-screen bg-gray-100 pt-20">
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {cart.cartItems &&
                cart.cartItems.map((cartItem) => (
                  <motion.div 
                    key={cartItem.id} 
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    
                    <div className="sm:flex sm:w-full sm:justify-between">
                    <img src={cartItem.image_url} alt="product-image" className="w-full rounded-lg sm:w-40" />
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900 ml-4">{cartItem.name}</h2>
                        <p className="mt-1 text-md text-gray-700">${cartItem.price}</p>
                      </div>
                      <div className="mt-4 flex justify-center items-center sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex justify-center items-center space-x-2 border-gray-100 gap-2">
                          <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                          <div className="count">{cartItem.cartQuantity}</div> 
                          <button onClick={() => handleAddToCart(cartItem)}>+</button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              {cart.cartItems.map((cartItem) => (
                <motion.div 
                  key={cartItem.productId} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="mb-2 flex justify-between">
                    <p className="text-gray-700">Subtotal</p>
                    <p className="text-gray-700">${cartItem.price * cartItem.cartQuantity}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700">Shipping</p>
                    <p className="text-blue-700">More info</p>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <p className="text-lg font-bold">Total</p>
                    <div className="">
                      <p className="mb-1 text-lg font-bold">${cartItem.price * cartItem.cartQuantity}</p>
                      <p className="text-sm text-gray-700">including VAT</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
