import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import { addOrder, getOrder, listOrder, editOrder, deleteOrder } from "../controllers/orders.js";

router.get("/", auth, listOrder);
router.get("/:id", auth, getOrder);
router.post("/", addOrder);
router.patch("/:id", auth, editOrder);
router.delete("/:id", auth, deleteOrder);

export default router;


