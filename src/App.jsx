import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { UserServices } from "./services/userServices";
import { actUserLogin } from "./store/user/action";
import { useEffect } from "react";

function App() {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.USER.currentUser);
  console.log("user", user);
  useEffect(() => {
    UserServices.fetchMe(token)
      .then((res) => {
        console.log("res", res);
        if (res.data && res.data.user) {
          const currentUser = res.data.user; // Sửa lại thành res.data.user
          const role = res.data.user.title; // Sửa lại thành res.data.user.title
          dispatch(actUserLogin(currentUser, token, role));
        } else {
          alert("Please login");
        }
      })
      .catch((err) => {
        if (err.response) {
          // Xử lý lỗi từ phía server nếu cần
        } else {
          alert("An error occurred. Please login.");
        }
        navigate("/login");
      });
  }, []);
  return (
    <>
      {/* <ToastContainer position="top-right" autoClose={2000} /> */}
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
