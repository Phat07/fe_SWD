import React from "react";
import "../../css/style.css";
import Header from "../Header";
import Body from "../Body";
import Footer from "../Footer";

function HomePage(props) {
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
