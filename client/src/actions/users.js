import * as api from '../api/index.js';
import { CREATE_USER, DELETE_USER, EDIT_PROFILE, END_LOADING_USER, LIST_USERS, PROFILE, PROFILE_LOADING, START_LOADING_USER, UPDATE_USER } from '../constants/actionTypes.js';

export const ListUsers = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_USER });
      const { data: { data } } = await api.ListUsers();
      dispatch({ type: LIST_USERS, payload: { data } });
      dispatch({ type: END_LOADING_USER });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const AddUser = (newUser) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_USER });
        const { data } = await api.AddUser(newUser);
        dispatch({ type: CREATE_USER, payload: data });
        dispatch({ type: END_LOADING_USER });
      } catch (error) {
        console.log(error);
      }
  };

  export const EditUser = (id, newUser) => async (dispatch) => {
    try {
      const { data } = await api.EditUser(id, newUser);
  
      dispatch({ type: UPDATE_USER, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const DeleteUser = (id) => async (dispatch) => {
    try {
      await api.DeleteUser(id);
  
      dispatch({ type: DELETE_USER, payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  export const GetProfile = (id) => async (dispatch) => {
    try {
      dispatch({ type: PROFILE_LOADING });
      const { data } = await api.getProfile(id);
      dispatch({ type: PROFILE, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  export const EditProfile = (id, formData) => async (dispatch) => {
    try {
      dispatch({ type: PROFILE_LOADING });
      const { data } = await api.editProfile(id, formData);
      dispatch({ type: EDIT_PROFILE, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

