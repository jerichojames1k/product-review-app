import React from "react";
//import './App.css';
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./view/components/Layout";
import ProductListPage from "./view/pages";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<ProductListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
