import React, { useEffect } from "react";
import "../../css/style.css";
import Header from "../Header";
import Body from "../Body";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actAuctionGetAsync, actAuctioningCustomerGetAsync } from "../../store/auction/action";
import { actMoneyCofigGetAsync } from "../../store/moneyConfig/action";

function HomePage(props) {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actAuctionGetAsync(token));
    dispatch(actMoneyCofigGetAsync(token));
    dispatch(actAuctioningCustomerGetAsync(token))
  }, []);

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(../../../public/assets/images/background/background5.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="header-container">
        <Header />
      </div>
      <div className="body-container">
        <Body />
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
