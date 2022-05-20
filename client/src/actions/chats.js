import * as api from '../api/index.js';
import { CREATE_CHAT_MESSAGE, END_LOADING_CHAT, FETCH_CHAT_POST, START_LOADING_CHAT } from '../constants/actionTypes.js';

export const ListChatByPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_CHAT });
      const { data } = await api.fetchChatByPost(id);
      dispatch({ type: FETCH_CHAT_POST, payload: data });
      dispatch({ type: END_LOADING_CHAT });
    } catch (error) {
      console.log(error);
    }
};

export const CreateChatMessage = (msg, id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_CHAT });
      const { data } = await api.createChatMessage(msg, id);
      dispatch({ type: CREATE_CHAT_MESSAGE, payload: data });
      dispatch({ type: END_LOADING_CHAT });
    } catch (error) {
      console.log(error);
    }
  };
