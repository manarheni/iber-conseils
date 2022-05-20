import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  name: { type: String, required:  true },
  phone: { type: String, required: true },
  offerBanque: { type: String, required: true },
  postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
},{timestamps: true});

export default mongoose.model("Order", orderSchema);