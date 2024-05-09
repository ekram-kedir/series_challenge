import React from 'react';
import './App.css';
import Cart from "./components/Cart";
import ProductListPage from './components/ProductListPage';
import ProductDetailPage from './components/ProductDetailPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/products" element={<ProductListPage />} />
          {/* Ensure that the match object is passed to the ProductDetailPage component */}
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
