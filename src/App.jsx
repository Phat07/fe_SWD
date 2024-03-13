import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import AuctionPage from "./components/pages/AuctionPage";
import Payment from "./components/pages/Payment";
import RoomAuctionPage from "./components/pages/AuctionRoom/RoomAuctionPage";
import DetailPage from "./components/pages/DetailPage";
import CreateAuctionProductForm from "./components/pages/AuctionOwner/CreateAuctionPage";
import PaidItem from "./components/pages/PaidItem";
import Auction from "./components/pages/AuctionOwner/Auction";
import AuctionDetail from "./components/pages/AuctionOwner/AutionDetail";
import Profile from "./components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { UserServices } from "./services/userServices";
import { actUserLogin } from "./store/user/action";
import { useEffect } from "react";
import moment from "moment";
import CreateProductForm from "./components/pages/ProductOwner/CreateProduct";
import Product from "./components/pages/ProductOwner/ProductList";
import JoinAuctionRoom from "./components/pages/AuctionRoom/JoinRoomAuction";
import ProductDetail from "./components/pages/ProductOwner/ProductDetail";
import { ToastContainer } from "react-bootstrap";
import { actAuctionGetAsync } from "./store/auction/action";
import NotYetAuctionUser from "./components/pages/AuctionUser/NotYetAuctionUser";
function App() {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.USER.currentUser);
  console.log("user", user);
  // YYYY-MM-DD HH:mm:ss
  const currentTime = moment("2024-03-05T01:56:00.000+00:00").format(
    "YYYY-MM-DD HH:mm:ss"
  ); // Lấy thời gian hiện tại với định dạng ngày và giờ
  console.log("time", currentTime);
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
          // navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response) {
          // Xử lý lỗi từ phía server nếu cần
        } else {
          // alert("An error occurred. Please login.");
          navigate("/login");
        }
        navigate("/login");
      });
    dispatch(actAuctionGetAsync(token));
  }, []);
  return (
    <>
      {/* <ToastContainer position="top-right" autoClose={2000} /> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/auction" element={<AuctionPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/payment" element={<Payment />} />
        {/* <Route path="/room-auction" element={<RoomAuctionPage />} /> */}
        <Route
          path="/room-auction"
          element={
            user?.role_id?.title === "HOST" ? (
              <Navigate to="/" replace />
            ) : (
              <RoomAuctionPage />
            )
          }
        />
        <Route
          path="/join-room-auction/:auctionID"
          element={<JoinAuctionRoom />}
        />
        <Route path="/create-product" element={<CreateProductForm />} />
        <Route
          path="/create-auction/:productID"
          element={<CreateAuctionProductForm />}
        />
        <Route
          path="/manage-auction"
          element={
            user?.role_id?.title === "MEMBER" ? (
              <Navigate to="/" replace />
            ) : (
              <Auction />
            )
          }
        />
        <Route
          path="/manage-product"
          element={
            user?.role_id?.title === "MEMBER" ? (
              <Navigate to="/" replace />
            ) : (
              <Product />
            )
          }
        />
        {/* <Route path="/manage-auction" element={<Auction />} /> */}
        {/* <Route path="/manage-product" element={<Product />} /> */}
        <Route path="/auction-detail/:auctionId" element={<AuctionDetail />} />
        <Route path="/product-detail/:productId" element={<ProductDetail />} />
        <Route path="/paid-item" element={<PaidItem />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/notyetauction-customer" element={<NotYetAuctionUser />} />
      </Routes>
    </>
  );
}

export default App;
