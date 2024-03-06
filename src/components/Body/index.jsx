// Body.js
import React from "react";
import Banner from "../banner";
import Promotions from "../promotions";
import ProductList from "../ProductList";
import AuctionPage from "../pages/AuctionPage";

const Body = () => {
  return (
    <div className="body-container">
      <Banner />
      <Promotions />
      <ProductList />
      <AuctionPage />
    </div>
  );
};

export default Body;
