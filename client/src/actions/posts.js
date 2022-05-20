import {
  FETCH_ALL,
  FETCH_POST,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  START_LOADING_POST,
  END_LOADING_POST,
  PUBLIC_WAITING,
  TOP_POST,
  WAITING_POSTS,
  ONE_POST_LOADING,
  ONE_POST_END_LOADING,
  PUBLIC_POSTS,
  ARCHIVED_POSTS,
  POSTS_ARCHIVED,
  POSTS_UNARCHIVED,
  LIST_LIKED_POSTS,
  LIST_MY_POSTS,
} from "../constants/actionTypes"
import * as api from "../api/index.js"
import { FILTER_POSTS } from "./../constants/actionTypes"

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: ONE_POST_LOADING })
    const {
      data: { data },
    } = await api.fetchPost(id)
    dispatch({ type: FETCH_POST, payload: { data } })
    dispatch({ type: ONE_POST_END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_POST })
    const {
      data: { data },
    } = await api.fetchPosts()
    dispatch({ type: FETCH_ALL, payload: { data } })
    dispatch({ type: END_LOADING_POST })
  } catch (error) {
    console.log(error)
  }
}

export const getWaitingPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_POST })
    const data = await api.fetchWaitingPosts(page)
    dispatch({ type: WAITING_POSTS, payload: data.data })
    dispatch({ type: END_LOADING_POST })
    return Promise.resolve(data.headers)
  } catch (error) {
    console.log(error)
  }
}

export const getPublicPosts = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_POST })
    const {
      data: { data },
    } = await api.fetchPublicPosts()
    dispatch({ type: PUBLIC_POSTS, payload: { data } })
    dispatch({ type: END_LOADING_POST })
  } catch (error) {
    console.log(error)
  }
}

export const getArchivedPosts = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_POST })
    const {
      data: { data },
    } = await api.fetchArchivedPosts()
    dispatch({ type: ARCHIVED_POSTS, payload: { data } })
    dispatch({ type: END_LOADING_POST })
  } catch (error) {
    console.log(error)
  }
}

export const getLikedPosts = (userId) => async (dispatch) => {
  // const userId = JSON.parse(localStorage.getItem('profile'))?.result?._id
  try {
    dispatch({ type: START_LOADING_POST })
    const {
      data: { data },
    } = await api.fetchLikedPosts(userId)
    dispatch({ type: LIST_LIKED_POSTS, payload: { data } })
    dispatch({ type: END_LOADING_POST })
  } catch (error) {
    console.log(error)
  }
}

export const getMyPosts = (userId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_POST })
    const {
      data: { data },
    } = await api.fetchMyPosts(userId)
    dispatch({ type: LIST_MY_POSTS, payload: { data } })
    dispatch({ type: END_LOADING_POST })
  } catch (error) {
    console.log(error)
  }
}

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_POST })
    const { data } = await api.createPost(post)
    dispatch({ type: CREATE, payload: data })
    dispatch({ type: END_LOADING_POST })
  } catch (error) {
    console.log(error)
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_POST })
    const { data } = await api.updatePost(id, post)
    dispatch({ type: UPDATE, payload: data })
    dispatch({ type: END_LOADING_POST })
  } catch (error) {
    console.log(error)
  }
}

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"))
  try {
    const { data } = await api.likePost(id, user?.token)
    dispatch({ type: LIKE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id)
    dispatch({ type: COMMENT, payload: data })
    return data.comments
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id)
    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.log(error)
  }
}

export const publicWaiting = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_POST })
    const { data } = await api.publicWaiting(id, formData)
    dispatch({ type: PUBLIC_WAITING, payload: data })
    dispatch({ type: END_LOADING_POST })
  } catch (error) {
    console.log(error)
  }
}

export const postsArchived = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_POST })
    const { data } = await api.postsArchived(id)
    dispatch({ type: POSTS_ARCHIVED, payload: data })
    dispatch({ type: END_LOADING_POST })
  } catch (error) {
    console.log(error)
  }
}

export const postsUnArchived = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_POST })
    const { data } = await api.postsUnArchived(id)
    dispatch({ type: POSTS_UNARCHIVED, payload: data })
    dispatch({ type: END_LOADING_POST })
  } catch (error) {
    console.log(error)
  }
}

export const topSwitch = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_POST })
    const { data } = await api.topSwitch(id, formData)
    dispatch({ type: TOP_POST, payload: data })
    dispatch({ type: END_LOADING_POST })
  } catch (error) {
    console.log(error)
  }
}

export const FilterPosts = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_POST })
    const  data  = await api.filterPosts(formData)
    dispatch({ type: FILTER_POSTS, payload: data.data })
    dispatch({ type: END_LOADING_POST })
    return Promise.resolve(data.headers)

  } catch (error) {
    console.log(error)
  }
}
