// Body.js
import React from "react";
import Banner from "../banner";
import Promotions from "../promotions";
import ProductList from "../ProductList";

const Body = () => {
  return (
    <div className="body-container">
      <Banner />
      <Promotions />
      <ProductList />
    </div>
  );
};

export default Body;
