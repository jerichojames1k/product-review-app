import React from "react";
//import './App.css';
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./view/components/layout";
import ProductListPage from "./view/pages/product-list-page";
import ProductDetailsPage from "./view/pages/product-details-page";
import ReviewProductPage from "./view/components/add-review-product";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<ProductListPage />} />
          <Route path="/product" element={<ProductDetailsPage />} />
          <Route path="/review" element={<ReviewProductPage />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
