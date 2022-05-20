import axios from 'axios';

// const API = axios.create({ baseURL: 'https://iber-conseils.com' });
export const API = axios.create({ baseURL: 'http://localhost:5002' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});


{/* //! -------------- POSTS ----------------- */ }

export const filterPosts = (data) => API.post("/api/posts/filterPosts", data)
export const fetchPosts = () => API.get('/api/posts/fetchClientPosts');
export const fetchMyPosts = (userId) => API.get(`/api/posts/myPosts/${userId}`);
export const fetchWaitingPosts = (page) =>
  API.get(`/api/posts/waitingPosts?page=${page} `)
export const fetchPublicPosts = () => API.get('/api/posts/publicPosts');
export const fetchArchivedPosts = () => API.get('/api/posts/archivedPosts');
export const fetchPost = (id) => API.get(`/api/posts/getPost/${id}`);
export const fetchLikedPosts = (userId) => API.get(`/api/posts/likedPosts/${userId}`);
export const createPost = (newPost) => API.post('/api/posts/createPost', newPost);
export const likePost = (id) => API.patch(`/api/posts/likePost/${id}`);
export const comment = (value, id) => API.put(`/api/posts/commentPost/${id}`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/api/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/api/posts/${id}`);
export const publicWaiting = (id, formData) => API.put(`/api/posts/${id}/publicWaiting`, formData);
export const topSwitch = (id, formData) => API.put(`/api/posts/${id}/topSwitch`, formData);
export const postsArchived = (id) => API.put(`/api/posts/${id}/postsArchived`);
export const postsUnArchived = (id) => API.put(`/api/posts/${id}/postsUnArchived`);

export const ListUsers = () => API.get(`/api/users/listUsers/`);
export const getProfile = (id) => API.get(`/api/users/profile/${id}`);
export const editProfile = (id, formData) => API.patch(`/api/users/profile/${id}`, formData);
export const signIn = (formData) => API.post('/api/users/signin', formData);
export const signUp = (formData) => API.post('/api/users/signup', formData);
export const forgotPassword = (formData) => API.post('/api/users/forgotPassword', {email: formData.email});
export const resetPassword = (formData) => API.post(`/api/users/resetPassword`, {password : formData.password}, { params: { token: formData.token } });
export const AddUser = (newUser) => API.post(`/api/users/addUser/`, newUser);
export const EditUser = (id, newUser) => API.patch(`/api/users/${id}`, newUser);
export const DeleteUser = (id) => API.delete(`/api/users/${id}`);

export const fetchChats = () => API.get(`/api/chats`);
export const fetchChatByPost = (id) => API.get(`/api/chats/${id}`);
export const createChatMessage = (newMessage, id) => API.post(`/api/chats/${id}`, newMessage);



export const listOrders = () => API.get('/api/orders/');
export const addOrder = (newOrder) => API.post(`/api/orders/`, newOrder);
export const editOrder = (id, newOrder) => API.patch(`/api/orders/${id}`, newOrder);
export const deleteOrder = (id) => API.delete(`/api/orders/${id}`);

