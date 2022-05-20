import {
  CREATE_CHAT_MESSAGE,
  END_LOADING_CHAT,
  FETCH_CHAT_POST,
  START_LOADING_CHAT,
} from "../constants/actionTypes"

export default (state = { chatIsLoading: true, chats: [] }, action) => {
  switch (action.type) {
    case START_LOADING_CHAT:
      return { ...state, chatIsLoading: true }
    case END_LOADING_CHAT:
      return { ...state, chatIsLoading: false }
    case FETCH_CHAT_POST:
      return { ...state, chats: action.payload.chats }
    case CREATE_CHAT_MESSAGE:
      return { ...state, chats: [...state.chats, action.payload.chat] }
    default:
      return state
  }
}
