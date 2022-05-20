import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import users from './users';
import chats from './chats';
import orders from './orders';


export const reducers = combineReducers({ posts, auth, users, chats, orders });
