import React, { useEffect, useState } from "react"
import {
  Fade,
  Grid,
  Paper,
  Typography,
  Divider,
  Button,
  Avatar,
  Link,
} from "@material-ui/core/"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getPost, likePost } from "../../actions/posts"
import CommentSection from "./CommentSection"
import useStyles from "./styles"
import Carousel from "react-elastic-carousel"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import SettingsOverscanIcon from "@material-ui/icons/SettingsOverscan"
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn"
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd"
import HotelIcon from "@material-ui/icons/Hotel"
import PoolIcon from "@material-ui/icons/Pool"
import BathtubIcon from "@material-ui/icons/Bathtub"
import ApartmentIcon from "@material-ui/icons/Apartment"
import Rating from "@material-ui/lab/Rating"
import ChatModule from "../ChatModule"
import CachedIcon from "@material-ui/icons/Cached"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import FavoriteIcon from "@material-ui/icons/Favorite"
import KitchenIcon from "@material-ui/icons/Kitchen"
import AddReservationModal from "./AddReservationModal"

const Post = () => {
  const { post, OnePostIsLoading } = useSelector((state) => state.posts)
  console.log(post)
  const user = JSON.parse(localStorage.getItem("profile"))
  const userId = user?.result?.googleId || user?.result?._id
  const dispatch = useDispatch()
  const classes = useStyles()
  const { id } = useParams()
  const [reloadChat, setReloadChat] = useState(false)
  const hasLikedPost = post?.likes?.find((like) => like === userId)
  const [showAddOrder, setShowAddOrder] = useState(false)
  // const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrder] = useState(null)

  // const [orderData, setOrderData] = useState({
  //   offer: '',
  // })

  useEffect(() => {
    dispatch(getPost(id))
  }, [dispatch, id])

  const handleCloseOrderModal = () => {
    setShowAddOrder(false)
  }

  const [likes, setLikes] = useState(post?.likes)

  // const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id);

  const handleLike = async (e) => {
    e.stopPropagation()
    dispatch(likePost(post?._id))
    if (hasLikedPost) {
      setLikes(post?.likes.filter((id) => id !== userId))
    } else {
      setLikes([...post?.likes, userId])
    }
  }

  const handleOpenAddOrder = () => {
    // setSelectedOrder(null);
    setShowAddOrder(true)
  }

  useEffect(() => {
    console.log(post)
  }, [post])

  const Likes = () => {
    if (likes?.length > 0) {
      return likes.find((like) => like === userId) ? (
        <div className="like-container">
          {likes?.length > 2
            ? `You and ${likes?.length - 1} others`
            : `${likes?.length} like${likes?.length > 1 ? "s" : ""}`}
          &nbsp;
          <FavoriteIcon className="like-svg" fontSize="small" />
        </div>
      ) : (
        <div className="like-container">
          {likes?.length} {likes?.length === 1 ? "Like" : "Likes"}&nbsp;
          <FavoriteBorderIcon className="like-svg" />
        </div>
      )
    }
    return (
      <div className="like-container">
        {likes?.length} {likes?.length === 1 ? "Like" : "Likes"}&nbsp;
        <FavoriteBorderIcon className="like-svg" />
      </div>
    )
  }

  if (OnePostIsLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <img
          className="loading-post"
          src="/images/loading.gif"
          alt="Loading..."
        />
      </Paper>
    )
  }

  if (!post) return null
  return (
    <Fade in>
      <Paper className="post-details-page" elevation={6}>
        <div className={classes.card}>
          <div className={classes.imageSection}>
            <img
              className={classes.media}
              src={
                post.photos && post.photos[0]
                  ? post.photos[0]
                  : "https://photos.lci.fr/images/613/344/immobilier-entreprise-contrat-pret-action-logement-6860d2-0@1x.jpeg"
              }
              alt={post.title}
            />
            <div className="post-overlay">
              <div className="flex between">
                <Typography variant="h3" component="h2">
                  {post.title}
                </Typography>
                <Button
                  className="like-button"
                  disabled={!user?.result}
                  onClick={(e) => handleLike(e)}
                >
                  <Likes />
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.section + " mycontainer"}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="stretch"
              spacing={10}
              className="no-pad-b"
            >
              <Grid className="less-pad-mobile" item xs={12} sm={8} md={8}>
                <div className="avis-juridique">
                  <div className="avis-content">
                    <strong>L'avis juridique:</strong>
                    <blockquote>{post.avis}</blockquote>
                    <div className="card-rating">
                      <Rating
                        name="size-large"
                        value={post.rating}
                        precision={0.5}
                        size="large"
                        readOnly={true}
                      />
                    </div>
                  </div>
                </div>

                <div className="card-post">
                  <div className="flex start">
                    <div className="card-elem flex start mr4">
                      <AssignmentTurnedInIcon />
                      <span>
                        {post.register
                          ? "Propriété enregistré"
                          : "Propriété non enregistré"}
                      </span>
                    </div>
                    <div className="card-elem flex start">
                      <AssignmentIndIcon />
                      <span>
                        {post.undivided
                          ? "Propriété individuel"
                          : "Propriété dans l'indivision"}
                      </span>
                    </div>
                  </div>
                  <div className="card-elem flex start">
                    <LocationOnIcon />
                    {post.location}&nbsp;:&nbsp;&nbsp;{post.adress}
                  </div>
                  <div className="flex start wrap">
                    {post.area > 0 ? (
                      <div className="card-elem flex start mr4">
                        <SettingsOverscanIcon />
                        <span>
                          <strong>{post.area}</strong> M<sup>2</sup>
                        </span>
                      </div>
                    ) : null}
                    {post.rooms > 0 ? (
                      <div className="card-elem flex start mr4">
                        <HotelIcon />
                        <span>
                          <strong>{post.rooms}</strong>
                        </span>
                      </div>
                    ) : null}
                    {post.kitchens > 0 ? (
                      <div className="card-elem flex start mr4">
                        <KitchenIcon />
                        <span>
                          <strong>{post.kitchens}</strong>
                        </span>
                      </div>
                    ) : null}
                    {post.batherooms > 0 ? (
                      <div className="card-elem flex start mr4">
                        <BathtubIcon />
                        <span>
                          <strong>{post.batherooms}</strong>
                        </span>
                      </div>
                    ) : null}
                    {post.balconies > 0 ? (
                      <div className="card-elem flex start mr4">
                        <ApartmentIcon />
                        <span>
                          <strong>{post.balconies}</strong>
                        </span>
                      </div>
                    ) : null}
                    {post.pools > 0 ? (
                      <div className="card-elem flex start mr4">
                        <PoolIcon />
                        <span>
                          <strong>{post.pools}</strong>
                        </span>
                      </div>
                    ) : null}
                  </div>
                  {post.description ? (
                    <div className="postPage-description">
                      <p>{post.description}</p>
                    </div>
                  ) : null}
                  {post.price > 0 ? (
                    <div className="post-price">
                      {post.price} <sup>DT</sup>
                    </div>
                  ) : null}
                  {post.phoneOwner ? (
                    <div className="post-phone">
                      <span>{post.phoneOwner} </span>
                      <a href={"tel:+216" + post.phoneOwner}>
                        <img src="/images/phone.png" alt="Phone" />
                      </a>
                    </div>
                  ) : null}
                </div>
                {post.photos ? (
                  <Carousel showArrows={window.innerWidth < 500 ? false : true}>
                    {post.photos.map((photo, index) => (
                      <img
                        key={index}
                        className="post-slider-img"
                        src={
                          photo ||
                          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                        }
                        alt="Post"
                      />
                    ))}
                  </Carousel>
                ) : null}
              </Grid>

              <Divider style={{ margin: "20px 0" }} />

              <Grid item xs={12} sm={4} md={4}>
                <div className="offres">
                  {/* <div className="banks-offres">
                          <p>Les banques vous offre pour cette propriété</p>
                          <div className={ orderData.offre === "ATTIJARI" ? "bank flex start active" : "bank flex start"}
                             onClick={ () => setOrderData({ ...orderData, offre: 'ATTIJARI'})} >
                            <img src="/images/banques/attijari.png" alt="bank" />
                            <p>ATTIJARI vous offre ...</p>
                        </div>
                        <div className={ orderData.offre === "BIAT" ? "bank flex start active" : "bank flex start"} 
                             onClick={ () => setOrderData({ ...orderData, offre: 'BIAT'})}>
                            <img src="/images/banques/biat.png" alt="bank" />
                            <p>BIAT vous offre ...</p>
                        </div>
                        <div className={ orderData.offre === "STB" ? "bank flex start active" : "bank flex start"}
                             onClick={ () => setOrderData({ ...orderData, offre: 'STB'})}>
                            <img src="/images/banques/stb.png" alt="bank" />
                            <p>STB vous offre ...</p>
                        </div>
                        
                        <div className={ orderData.offre === "BH" ? "bank flex start active" : "bank flex start"}
                             onClick={ () => setOrderData({ ...orderData, offre: 'BH'})}>
                            <img src="/images/banques/bh.png" alt="bank" />
                            <p>STB vous offre ...</p>
                        </div>
                    </div>
                    */}
                  <div className="chatModule-container">
                    <Paper className={classes.paper}>
                      <div className="banner-empty">Les offres des banques</div>
                    </Paper>
                  </div>
                  <p>Sélectionner une offre et commander une intervention</p>
                  <button onClick={() => handleOpenAddOrder()}>
                    Réserver
                    {/* <AddOrderModal/> */}
                  </button>
                </div>
                {user?.result._id === post.creator ? (
                  <div className="chatModule-container">
                    <Paper className={classes.paper}>
                      <div className="paper-header">
                        <div className="paper-title">Chat avec l'admin</div>
                        <div className="reload-chat">
                          <CachedIcon onClick={(e) => setReloadChat(true)} />
                        </div>
                      </div>
                      <div className="paper-content chat">
                        <ChatModule
                          post={post}
                          reloadChat={reloadChat}
                          reloaded={(e) => setReloadChat(false)}
                        />
                      </div>
                    </Paper>
                  </div>
                ) : (
                  <div className="chatModule-container">
                    <Paper className={classes.paper}>
                      <div className="banner-empty">Bannière de publicité</div>
                    </Paper>
                  </div>
                )}
                {post.plans ? (
                  <div className="post-desc-container">
                    <h4>Plan</h4>
                    <img
                      className="plan-img"
                      src={
                        post.plans[0] ||
                        "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                      }
                      alt="Plan"
                    />
                  </div>
                ) : null}
                {/* // TODO */}
                {downloadPdf()}
              </Grid>

              {/* <CommentSection post={post} /> */}
              <Divider style={{ margin: "20px 0 0" }} />
              {/* {!!recommendedPosts.length && (
                <div className={classes.section}>
                  <Typography gutterBottom variant="h5">Vous êtes peut être intéressé par :</Typography>
                  <Divider />
                  <div className={classes.recommendedPosts}>
                    {recommendedPosts.map(({ title, location, likes, photos, _id }) => (
                      <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                        <Typography gutterBottom variant="h6">{title}</Typography>
                        <Typography gutterBottom variant="subtitle2">à {location}</Typography>
                        <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                        <img src={photos[0]} width="200px" />
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
            </Grid>
          </div>
        </div>
        <AddReservationModal
          onClose={(e) => handleCloseOrderModal(e)}
          showAddOrder={showAddOrder}
          order={selectedOrder}
          post={post}
        />
      </Paper>
    </Fade>
  )

  function downloadPdf() {
    let pdfFiles = []
    console.log(post.docs)
    post.docs.map((file, key) => {
      if (file.split(";")[0].split("/")[1] === "pdf") pdfFiles.push(file)
    })

    if (!pdfFiles.length) return <p>Aucun ficher Pdf à télécharger</p>
    console.log(pdfFiles)

    return (
      <div style={{ display: "flex", textAlign: "center", gap: "1rem" }}>
        {pdfFiles.map((pdfFile, key) => (
          <div>
            <Avatar
              key={key}
              style={{ width: "100px", height: "100px" }}
              variant="square"
              src="/images/pdfIcon.png"
            >
              N
            </Avatar>
            <Link href={pdfFile} download={`Pdf${key + 1}.pdf`}>
              {" "}
              {`PDF ${key + 1}`}
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

export default Post
