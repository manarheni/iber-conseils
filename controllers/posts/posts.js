import express from "express"
import mongoose from "mongoose"
import Post from "../../models/post.js"
import nodemailer from "nodemailer"
import User from "../../models/user.js"

const router = express.Router()

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find(
      { status: "Public" },
      {
        register: 0,
        undivided: 0,
        numTitle: 0,
        docType: 0,
        plans: 0,
        docs: 0,
        comments: 0,
        avis: 0,
        updatedAt: 0,
      }
    )
    if (posts) {
      posts.map((post) =>
        post.photos ? (post.photos = [post.photos[0]]) : (post.photos = [])
      )
    }
    res.json({ data: posts })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getWaitingPosts = async (req, res) => {
  try {
    const size = 10
    const page = req.query.page
    const posts = await Post.find(
      { status: "Waiting" },
      {
        avis: 0,
        rating: 0,
        register: 0,
        undivided: 0,
        numTitle: 0,
        adress: 0,
        area: 0,
        agricole: 0,
        nameOwner: 0,
        phoneOwner: 0,
        period: 0,
        price: 0,
        rooms: 0,
        batherooms: 0,
        kitchens: 0,
        pools: 0,
        balconies: 0,
        description: 0,
        // docType: 0,
        monthly: 0,
        // plans: 0,
        // docs: 0,
        top: 0,
        likes: 0,
        comments: 0,
        updatedAt: 0,
      }
    )
      .populate({ path: "creator", select: "name" })
      .skip(page * size)
      .limit(size)
      // .sort({createdAt : -1})
    const count = await Post.countDocuments({ status: "Waiting" })

    if (posts) {
      posts.map((post) =>
        post.photos ? (post.photos = [post.photos[0]]) : (post.photos = [])
      )
    }
    res
      .header("X-Pagination-Count", Math.ceil(count / size))
      .header("X-Pagination-Total", count)
      .header("X-Pagination-Page", page)
      .json({ data: posts })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getPublicPosts = async (req, res) => {
  try {
    const posts = await Post.find(
      { status: "Public" },
      {
        register: 0,
        undivided: 0,
        numTitle: 0,
        adress: 0,
        area: 0,
        agricole: 0,
        nameOwner: 0,
        phoneOwner: 0,
        period: 0,
        price: 0,
        rooms: 0,
        batherooms: 0,
        kitchens: 0,
        pools: 0,
        balconies: 0,
        description: 0,
        docType: 0,
        monthly: 0,
        plans: 0,
        docs: 0,
        avis: 0,
        updatedAt: 0,
      }
    ).populate({ path: "creator", select: "name" })
    if (posts) {
      posts.map((post) =>
        post.photos ? (post.photos = [post.photos[0]]) : (post.photos = [])
      )
    }
    res.json({ data: posts })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getPostsArchived = async (req, res) => {
  try {
    const posts = await Post.find(
      { status: "Archived" },
      {
        creator: 0,
        activity: 0,
        register: 0,
        undivided: 0,
        numTitle: 0,
        agricole: 0,
        nameOwner: 0,
        phoneOwner: 0,
        period: 0,
        docType: 0,
        monthly: 0,
        plans: 0,
        docs: 0,
        comments: 0,
        avis: 0,
        updatedAt: 0,
      }
    )
    if (posts) {
      posts.map((post) =>
        post.photos ? (post.photos = [post.photos[0]]) : (post.photos = [])
      )
    }
    res.json({ data: posts })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getLikedPosts = async (req, res) => {
  const { userId } = req.params

  try {
    const posts = await Post.find(
      { status: "Public" },
      {
        register: 0,
        undivided: 0,
        numTitle: 0,
        docType: 0,
        plans: 0,
        docs: 0,
        comments: 0,
        avis: 0,
        updatedAt: 0,
      }
    ).where("likes.length > 0")
    let result = []
    if (posts) {
      posts.map((post) =>
        post.photos ? (post.photos = [post.photos[0]]) : (post.photos = [])
      )
    }
    /* result = preResult.filter(post => {
            post.likes && post.likes.findIndex(id => id === String(userId)) !== -1
        }) */
    res.json({ data: posts })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getMyPosts = async (req, res) => {
  // const { userId } = req.params;
  try {
    const posts = await Post.find(
      { status: { $in: ["Public", "Waiting"] } },
      {
        register: 0,
        undivided: 0,
        numTitle: 0,
        docType: 0,
        plans: 0,
        docs: 0,
        comments: 0,
        avis: 0,
        updatedAt: 0,
      }
    )
    if (posts) {
      posts.map((post) =>
        post.photos ? (post.photos = [post.photos[0]]) : (post.photos = [])
      )
    }
    res.json({ data: posts })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getPost = async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findById(id)
    res.status(200).json({ data: post })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  const post = req.body
  const newPost = new Post({ ...post })

  try {
    const result = await newPost.save()
    const user = await User.findById(post.creator)
    // TODO NO EMAIL IN TESTING
    if (req.headers.host.indexOf("localhost") !== -1)
      return res.status(201).json(result)
    if (user && user.email) {
      let transporter = nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: 465,
        auth: {
          user: "contact@iber-conseils.com",
          pass: "Grissa1906",
        },
      })

      var mailOptions = {
        from: "contact@iber-conseils.com",
        to: user.email,
        subject: "Iber Conseils - Création de votre annonce",
        text: "Votre publication est en cours de vérification. Vous recevrez un mail lorsque votre annonce sera validée. Merci de votre confiance. IBER CONSEILS",
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log("Email sent: " + info.response)
        }
      })
    }

    res.status(201).json(result)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params
  const updatedPost = req.body
  try {
    await Post.findByIdAndUpdate(id, updatedPost, { new: true })
    res.status(201).json(updatedPost)
  } catch (error) {
    res.status(409).send({ message: error.message })
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params
  try {
    await Post.findByIdAndRemove(id)
    res.json({ message: "Post deleted successfully." })
  } catch (error) {
    res.status(501).send(error)
  }
}

export const likePost = async (req, res) => {
  const { id } = req.params

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" })
  }
  const post = await Post.findById(id)
  const index = post.likes.findIndex((id) => id === String(req.userId))

  if (index === -1) {
    post.likes.push(req.userId)
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId))
  }
  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true })
  const result = await Post.findById(updatedPost._id, {
    register: 0,
    undivided: 0,
    numTitle: 0,
    docType: 0,
    plans: 0,
    docs: 0,
    comments: 0,
    avis: 0,
    updatedAt: 0,
  })
  res.status(200).json(result)
}

export const commentPost = async (req, res) => {
  const { id } = req.params
  const { value } = req.body

  const post = await Post.findById(id)
  post.comments.push(value)
  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true })

  res.json(updatedPost)
}

export const publicWaiting = async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findById(id)
    req.body.status ? (post.status = req.body.status) : null
    req.body.rating ? (post.rating = req.body.rating) : null
    req.body.avis ? (post.avis = req.body.avis) : null
    await post.save()
    res.status(200).json(id)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const postsArchived = async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findById(id)
    post.status = "Archived"
    await post.save()
    res.status(200).json(id)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const postsUnArchived = async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findById(id)
    post.status = "Waiting"
    await post.save()
    res.status(200).json(id)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const topSwtich = async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findById(id, {
      register: 0,
      undivided: 0,
      numTitle: 0,
      adress: 0,
      area: 0,
      agricole: 0,
      nameOwner: 0,
      phoneOwner: 0,
      period: 0,
      price: 0,
      rooms: 0,
      batherooms: 0,
      kitchens: 0,
      pools: 0,
      balconies: 0,
      description: 0,
      docType: 0,
      monthly: 0,
      plans: 0,
      docs: 0,
      avis: 0,
      updatedAt: 0,
    }).populate({ path: "creator", select: "name" })
    if (post) {
      post.photos = [post.photos[0]]
    }
    post.top = req.body.val
    await post.save()
    res.status(200).json(post)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export default router
