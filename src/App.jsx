import "./App.css";

import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import AuctionPage from "./components/pages/AuctionPage";
import Payment from "./components/pages/Payment";
import RoomAuctionPage from "./components/pages/AuctionRoom/RoomAuctionPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/auction" element={<AuctionPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/room-auction" element={<RoomAuctionPage />} />
      </Routes>
    </>
  );
}

export default App;
