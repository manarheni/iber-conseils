import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: { type: String, default: "Waiting" },
    type: String,
    category: String,
    title: String,
    activity: String,
    register: Boolean,
    undivided: Boolean,
    numTitle: String,
    location: String,
    adress: String,
    area: Number,
    agricole: String,
    nameOwner: String,
    phoneOwner: String,
    period: String,
    price: Number,
    rooms: Number,
    batherooms: Number,
    kitchens: Number,
    pools: Number,
    balconies: Number,
    description: String,
    docType: String,
    monthly: Boolean,
    rating: Number,
    photos: [String],
    plans: [String],
    docs: [String],
    top: { type: Boolean, default: false},
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    avis: String,
},  { timestamps: true })

var Post = mongoose.model('Post', postSchema);

export default Post

