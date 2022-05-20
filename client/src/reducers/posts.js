import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT, START_LOADING_POST, END_LOADING_POST, PUBLIC_WAITING, TOP_POST, WAITING_POSTS, ONE_POST_LOADING, ONE_POST_END_LOADING, PUBLIC_POSTS, ARCHIVED_POSTS, POSTS_ARCHIVED, POSTS_UNARCHIVED, LIST_LIKED_POSTS, LIST_MY_POSTS } from '../constants/actionTypes';
import { FILTER_POSTS } from './../constants/actionTypes';

export default (state = { OnePostIsLoading: true, PostsIsLoading: true, posts: [], post: {} }, action) => {
  switch (action.type) {
    case START_LOADING_POST:
      return { ...state, PostsIsLoading: true }
    case END_LOADING_POST:
      return { ...state, PostsIsLoading: false }
    case ONE_POST_LOADING:
      return { ...state, OnePostIsLoading: true }
    case ONE_POST_END_LOADING:
      return { ...state, OnePostIsLoading: false }
    case FETCH_ALL:
      return { ...state, posts: action.payload.data }
    case FETCH_POST:
      return { ...state, post: action.payload.data }
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      }
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      }
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] }
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      }
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      }
    case PUBLIC_WAITING:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      }
    case TOP_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      }
    case WAITING_POSTS:
      return { ...state, posts: action.payload.data }
    case PUBLIC_POSTS:
      return { ...state, posts: action.payload.data }
    case ARCHIVED_POSTS:
      return { ...state, posts: action.payload.data }
    case POSTS_ARCHIVED:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      }
    case POSTS_UNARCHIVED:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      }
    case LIST_LIKED_POSTS:
      return { ...state, posts: action.payload.data }
    case LIST_MY_POSTS:
      return { ...state, posts: action.payload.data }
      case FILTER_POSTS:
      return { ...state, posts: action.payload.data }
    default:
      return state
  }
};

