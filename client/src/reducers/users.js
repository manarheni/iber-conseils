import { CREATE_USER, DELETE_USER, END_LOADING_USER, LIST_USERS, PROFILE, PROFILE_LOADING, START_LOADING_USER, UPDATE_USER, EDIT_PROFILE } from "../constants/actionTypes";

export default (state = { UsersIsLoading: true, users: [], profile: {}, profileIsLoading: false }, action) => {
    switch (action.type) {
        case START_LOADING_USER:
            return { ...state, UsersIsLoading: true };
        case END_LOADING_USER:
            return { ...state, UsersIsLoading: false };
        case LIST_USERS:
            return { ...state, users: action.payload.data };
        case CREATE_USER:
            return { ...state, users: [...state.users, action.payload.user] };
        case UPDATE_USER:
            return { ...state, users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)) };
        case DELETE_USER:
            return { ...state, users: state.users.filter((user) => user._id !== action.payload) };
        case PROFILE:
            return { ...state, profile: action.payload.data, profileIsLoading : false};
        case PROFILE_LOADING:
            return { ...state, profileIsLoading: true}
        case EDIT_PROFILE:
            const oldData = JSON.parse(localStorage.getItem('profile'))
            const newData = {
                result: action?.payload?.data,
                token: oldData.token
            }
            localStorage.setItem('profile', JSON.stringify(newData));
            return { ...state, profile: action?.payload?.data, profileIsLoading: false };
      default:
        return state;
    }
  };