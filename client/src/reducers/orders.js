import { CREATE_ORDER, DETAIL_ORDER, LIST_ORDERS, EDIT_ORDER, END_LOADING_ORDER, START_LOADING_ORDER, DELETE_ORDER } from '../constants/actionTypes';

export default (state = {  orders: [], order: {},  OrdersIsLoading: true }, action) => {
  switch (action.type) {
    case START_LOADING_ORDER:
      return { ...state, OrdersIsLoading: true };
    case END_LOADING_ORDER:
      return { ...state, OrdersIsLoading: false };
    case DETAIL_ORDER:
      return { ...state, orders: action.payload };
    case LIST_ORDERS:
      return { ...state, orders: action.payload.data };
    case CREATE_ORDER:
      return { ...state, orders: [...state.orders, action.payload] };;
    case EDIT_ORDER:
        return { ...state, orders: state.orders.map((order) => (order._id === action.payload._id ? action.payload : order)) };
    case DELETE_ORDER:
        return { ...state, orders: state.orders.filter((order) => order._id !== action.payload) };
    default:
      return state;
  }
};

