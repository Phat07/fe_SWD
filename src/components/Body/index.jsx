// Body.js
import React from "react";
import Banner from "../banner";
import Promotions from "../promotions";
import ProductList from "../ProductList";
import AuctionPage from "../pages/AuctionPage";
import { useSelector } from "react-redux";
import CarouselImg from "../Carousel";

const Body = () => {
  const user = useSelector((state) => state.USER.currentUser);
  console.log("user", user);

  return (
    <div className="body-container">
      <CarouselImg />
      <Banner />
      <Promotions />
      <ProductList />
      {user?.role_id?.title === "HOST" ? "" : <AuctionPage />}
    </div>
  );
};

export default Body;


