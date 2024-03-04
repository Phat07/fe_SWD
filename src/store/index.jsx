import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user/reducer";
import productReducer from "./product/reducer"
const rootReducer = combineReducers({
  USER: userReducer,
  PRODUCT: productReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
