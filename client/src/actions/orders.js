import * as api from '../api/index.js';

import { CREATE_ORDER, LIST_ORDERS, EDIT_ORDER, START_LOADING_ORDER, END_LOADING_ORDER, DELETE_ORDER } from '../constants/actionTypes.js';

export const  addOrder = ( newOrder ) => async (dispatch) => {
  try {
      dispatch({ type: START_LOADING_ORDER });
      const { data } = await api.addOrder(newOrder);
      dispatch({ type: CREATE_ORDER, payload: data });
      dispatch({ type: END_LOADING_ORDER });
    } catch (error) {
      console.log(error);
    }
};

export const listOrders = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ORDER });
    const { data: { data } } = await api.listOrders();
    dispatch({ type: LIST_ORDERS, payload: { data } });
    dispatch({ type: END_LOADING_ORDER });
  } catch (error) {
    console.log(error);
  }
};

export const editOrder = (id, newOrder) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ORDER });
    const { data } = await api.editOrder(id, newOrder);
    dispatch({ type: EDIT_ORDER, payload: data });
    dispatch({ type: END_LOADING_ORDER });
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    await api.deleteOrder(id);
    dispatch({ type: DELETE_ORDER, payload: id });
  } catch (error) {
    console.log(error);
  }
};
