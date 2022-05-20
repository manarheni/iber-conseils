import Post from "../../models/post.js"

export const filterPosts = async (req, res) => {
  const filter = { status: "Public" }
  const size = 9

  const {
    achat,
    location,
    terrain,
    appartement,
    villa,
    achatBureau,
    achatFond,
    locationBureau,
    locationLocal,
    locationFond,
    title,
    adress,
    city,
    selectedPage
  } = req.body

  setFilter()


  try {
    const posts = await Post.find(filter, {
      photos: 0,
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
      .skip(selectedPage * size)
    .limit(size)
    // if (posts) {
    //     posts.map(post => post.photos ? post.photos = [post.photos[0]] : post.photos = [])
    // }

    const count = await Post.countDocuments(filter)

    res
      .header("X-Pagination-Count", Math.ceil(count / size))
      .header("X-Pagination-Total", count)
      .header("X-Pagination-Page", selectedPage)
      .json({ data: posts })
  } catch (error) {
    res.status(404).json({ message: error.message })
    res.send(req.body)
  }

  function setFilter() {
    if (!terrain && !appartement && !villa && !achatBureau && !achatFond)
      return res.json({ data: [] })

    city && (filter.location = city)
    
    let type = []
    achat && type.push("Achat")
    location && type.push("Location")
    filter.type = { $in: type }

    let categories = []
    terrain && categories.push("Terrain")
    appartement && categories.push("Appartement")
    villa && categories.push("Villa")
    achatBureau && categories.push("Achat Bureau")
    achatFond && categories.push("Achat Fond")
    // locationBureau && categories.push("Location Bureau")
    // locationLocal && categories.push("Location Local")
    // locationFond && categories.push("Location Fond")
    if (categories.length) {
      filter.category = { $in: categories }
    }

    title ? (filter.title = { $regex: `.*${title}.*`, $options: "i" }) : ""
    adress ? (filter.adress = { $regex: `.*${adress}.*`, $options: "i" }) : ""
  }
}
