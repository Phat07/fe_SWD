import {
  ACT_USER_LOGIN,
  ACT_USER_NOT_FETCH_ME,
  ALL_ROLE,
  // GET_ALL_ADMIN_AND_SUPERADMIN_USER,
  // GET_ALL_ADMIN_USER,
  // GET_ALL_TRAINEE_USER,
  // GET_ALL_TRAINER_USER,
  // GET_ALL_USER,
  // GET_ALL_USER_FAKE,
  // UPDATE_USER,
} from "./action";

const initialState = {
  users: [],
  token: null,
  currentUser: null,
  roles: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACT_USER_LOGIN:
      localStorage.setItem("ACCESS_TOKEN", action.payload.token);
      return {
        ...state,
        currentUser: action.payload.currentUser,
        token: action.payload.token,
        role: action.payload.role,
      };
    case ACT_USER_NOT_FETCH_ME:
      localStorage.setItem("ACCESS_TOKEN", null);
      return {
        ...state,
        token: action.payload,
      };
    case ALL_ROLE:
      return {
        ...state,
        roles: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
