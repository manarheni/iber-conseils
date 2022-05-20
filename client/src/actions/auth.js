import {
  AUTH,
  AUTH_ERROR,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    router.push("/");
  } catch (error) {
    dispatch({ type: AUTH_ERROR, error });
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.signUp(formData);
    console.log(data.data);
    dispatch({ type: AUTH, data });
    router.push("/");
  } catch (error) {
    dispatch({ type: AUTH_ERROR, error });
  }
};

export const forgotPassword = (formData) => async (dispatch) => {
  try {
    const { data } = await api.forgotPassword(formData);
    dispatch({ type: FORGOT_PASSWORD, data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, error });
  }
};

export const resetPassword = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.resetPassword(formData);
    dispatch({ type: RESET_PASSWORD, data });
    history.push("/auth");
  } catch (error) {
    dispatch({ type: AUTH_ERROR, error });
  }
};
