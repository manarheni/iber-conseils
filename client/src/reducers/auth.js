import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null, error: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, error: null };
    case actionType.AUTH_ERROR:
      console.log(action)
      return { ...state, error: action?.error?.response?.data?.message }
    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
