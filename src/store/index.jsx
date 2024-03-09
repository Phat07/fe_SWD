import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user/reducer";
import productReducer from "./product/reducer";
import auctionReducer from "./auction/reducer";
import walletReducer from "./wallet/reducer";
const rootReducer = combineReducers({
  USER: userReducer,
  PRODUCT: productReducer,
  AUCTION: auctionReducer,
  WALLET: walletReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
