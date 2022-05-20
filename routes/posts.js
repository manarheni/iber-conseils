import express from "express"

import {
  getWaitingPosts,
  getPublicPosts,
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  commentPost,
  deletePost,
  publicWaiting,
  topSwtich,
  getPostsArchived,
  postsArchived,
  postsUnArchived,
  getLikedPosts,
  getMyPosts,
} from "../controllers/posts/posts.js"

const router = express.Router()
import auth from "../middleware/auth.js"
import { filterPosts } from "../controllers/posts/filterPosts.js"

router.get("/fetchClientPosts/", getPosts)
router.get("/waitingPosts/", auth, getWaitingPosts)
router.get("/publicPosts/", auth, getPublicPosts)
router.get("/archivedPosts/", auth, getPostsArchived)
router.get("/likedPosts/:id", auth, getLikedPosts)
router.get("/myPosts/:id", auth, getMyPosts)
router.get("/getpost/:id", getPost)

router.post("/createPost", auth, createPost)
router.patch("/:id", auth, updatePost)
router.delete("/:id", auth, deletePost)
router.patch("/likePost/:id", auth, likePost)
router.put("/:id/commentPost", commentPost)
router.put("/:id/publicWaiting", publicWaiting)
router.put("/:id/topSwitch", topSwtich)
router.put("/:id/postsArchived/", postsArchived)
router.put("/:id/postsUnArchived/", postsUnArchived)

router.post("/filterPosts", filterPosts)

export default router
