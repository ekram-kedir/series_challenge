import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../slices/cartSlice";

import { Link } from "react-router-dom";

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
        <div className="cart-empty shadow-md">
          <p className="p-2">Your cart is currently empty</p>
          <img src="./../../public/images/noitem.png" className="w-40 h-40"/>
          <div className="start-shopping">
            <Link to="/products">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div class="h-screen bg-gray-100 pt-20">
          <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div class="rounded-lg md:w-2/3">
              {cart.cartItems &&
                cart.cartItems.map((cartItem) => (
                  <div key={cartItem.id} class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="product-image" class="w-full rounded-lg sm:w-40" />
                    <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div class="mt-5 sm:mt-0">
                        <h2 class="text-lg font-bold text-gray-900">{cartItem.name}</h2>
                        <p class="mt-1 text-md text-gray-700">${cartItem.price}</p>
                      </div>
                      <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div class="flex items-center space-x-4 border-gray-100 gap-2">
                          <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                          <div className="count">{cartItem.cartQuantity}</div>
                          <button onClick={() => handleAddToCart(cartItem)}>+</button>
                        </div>
                        <div class="flex items-center space-x-4">
                          <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
        
            <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              {cart.cartItems.map((cartItem) => (
                <div key={cartItem.id}>
                  <div class="mb-2 flex justify-between">
                    <p class="text-gray-700">Subtotal</p>
                    <p class="text-gray-700">${cartItem.price * cartItem.cartQuantity}</p>
                  </div>
                  <div class="flex justify-between">
                    <p class="text-gray-700">Shipping</p>
                    <p class="text-blue-700">More info</p>
                  </div>
                  <hr class="my-4" />
                  <div class="flex justify-between">
                    <p class="text-lg font-bold">Total</p>
                    <div class="">
                      <p class="mb-1 text-lg font-bold">${cartItem.price * cartItem.cartQuantity}</p>
                      <p class="text-sm text-gray-700">including VAT</p>
                    </div>
                  </div>
                </div>
              ))}
              <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
