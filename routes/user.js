import express from "express";
const router = express.Router();

import { addUser, deleteUser, editUser, listUsers, signin, signup, getUser, editProfile, forgotPassword, resetPassword } from "../controllers/user.js";
import auth from "../middleware/auth.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

router.get("/listUsers", listUsers);
router.post("/addUser", auth, addUser);
router.patch("/:id", auth, editUser);
router.delete("/:id", auth, deleteUser);

router.get("/profile/:id", getUser);
router.patch("/profile/:id",  editProfile);

export default router;