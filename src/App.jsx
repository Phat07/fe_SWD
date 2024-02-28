import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import AuctionPage from "./components/pages/AuctionPage";
import Payment from "./components/pages/Payment";
import RoomAuctionPage from "./components/pages/AuctionRoom/RoomAuctionPage";
import DetailPage from "./components/pages/DetailPage";
import CreateAuctionProductForm from "./components/pages/ProductOwner/CreateAuctionPage";
import PaidItem from "./components/pages/PaidItem";
import Auction from "./components/pages/ProductOwner/Auction";
import AuctionDetail from "./components/pages/ProductOwner/AutionDetail";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/auction" element={<AuctionPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/room-auction" element={<RoomAuctionPage />} />
        <Route path="/create-auction" element={<CreateAuctionProductForm />} />
        <Route path="/manage-auction" element={<Auction />} />
        <Route path="/auction-detail/:auctionId" element={<AuctionDetail />} />
        <Route path="/paid-item" element={<PaidItem />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
