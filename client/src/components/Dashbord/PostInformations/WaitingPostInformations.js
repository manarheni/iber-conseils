import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, CardMedia } from "@material-ui/core/"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import SettingsOverscanIcon from "@material-ui/icons/SettingsOverscan"
import HotelIcon from "@material-ui/icons/Hotel"
import PoolIcon from "@material-ui/icons/Pool"
import BathtubIcon from "@material-ui/icons/Bathtub"
import ApartmentIcon from "@material-ui/icons/Apartment"
import KitchenIcon from "@material-ui/icons/Kitchen"
import PublicIcon from "@material-ui/icons/Public"
import Rating from "@material-ui/lab/Rating"
import { getPost, publicWaiting } from "../../../actions/posts"
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary"
import DescriptionIcon from "@material-ui/icons/Description"
import MapIcon from "@material-ui/icons/Map"
import SliderModal from "../../SliderModal"
import ShowDocumentsDialog from "./ShowDocumentsDialog"

export default function PostInfos(props) {
  const dispatch = useDispatch()
  const { post, OnePostIsLoading, PostsIsLoading } = useSelector(
    (state) => state.posts
  )
  const [error, setError] = useState(null)
  const [feedback] = useState(null)
  const [formData, setFormData] = useState({
    id: post?._id,
    status: "Public",
    rating: 0,
    avis: "",
  })

  const [openShowDocumentsDialog, setOpenShowDocumentsDialog] = useState(false)

  const [selectedSlider, setSelectedSlider] = useState(null)
  // const [pdfFilesDec, setPdfFilesDec] = useState(null)

  useEffect(() => {
    if (props.post) {
      const id = props.post?._id
      dispatch(getPost(id))
    }
  }, [dispatch, props.post])

  useEffect(() => {
    if (post) {
      setFormData({ ...formData, rating: post.rating, avis: post.avis })
    }
    // eslint-disable-next-line
  }, [post])

  //fonction de decodage PDF

  // const decPdfs = () => {
  //     const files = [post?.docs];
  //     let docsArray = [];
  //     let pdfsFiles = [];
  //     let pdfsFilesRes = [];

  //     files?.map(file => {
  //         if (file.type === 'application/pdf'){
  //             pdfsFiles.push(file)
  //         }
  //     })

  //     if (pdfsFiles.length > 0) {
  //         pdfsFilesRes.map((r,index) => docs.Array.push(`${r.ext},${r.base64}`))
  //     }

  //     docsArray = [ ...docsArray, ...pdfsFilesRes]

  //     setTimeout(() => {
  //         console.log("docsArray", [docsArray]);
  //         // setPostData({ ...postData, docs: [ ...docsArray, ...pdfsFilesRes]})
  //     }, 1000)
  // }

  const publicPost = () => {
    if (post) {
      if (formData.rating === 0) {
        setError("Précisez une évaluation !")
        return
      }
      if (formData.avis === "") {
        setError("Rédigez une avis juridique !")
        return
      }
      dispatch(publicWaiting(post?._id, formData)).then(() => {
        setError(null)
        props.clear()
      })
    }
  }

  if (!props.post || !post) {
    return <span className="no-post">Select a post</span>
  } else {
    if (OnePostIsLoading) {
      return (
        <div className="flex one-post-loading">
          <img
            src="/images/admin-loading.gif"
            alt="Loading"
            className="admin-loading"
          />
        </div>
      )
    } else {
      return (
        <div className="flex infos-container">
          <div className="col-65 post-infos">
            <div className="flex between">
              <h3>{post?.title}</h3>
              <span className="creator">{post?.creator?.name}</span>
            </div>
            <div className="flex between">
              <div className="post-location flex start">
                <LocationOnIcon />
                {post?.location}&nbsp;:&nbsp;&nbsp;{post?.adress}
              </div>
              <span className="price">
                {post?.price} <sup>DT</sup>
              </span>
            </div>
            <div className="flex start wrap">
              {post?.area && post?.area > 0 ? (
                <div className="card-elem flex start mr4">
                  <SettingsOverscanIcon />
                  <span>
                    <strong>{post?.area}</strong> M<sup>2</sup>
                  </span>
                </div>
              ) : null}
              {post?.rooms && post?.rooms > 0 ? (
                <div className="card-elem flex start mr4">
                  <HotelIcon />
                  <span>
                    <strong>{post?.rooms}</strong>
                  </span>
                </div>
              ) : null}
              {post?.kitchens && post?.kitchens > 0 ? (
                <div className="card-elem flex start mr4">
                  <KitchenIcon />
                  <span>
                    <strong>{post?.kitchens}</strong>
                  </span>
                </div>
              ) : null}
              {post?.batherooms && post?.batherooms > 0 ? (
                <div className="card-elem flex start mr4">
                  <BathtubIcon />
                  <span>
                    <strong>{post?.batherooms}</strong>
                  </span>
                </div>
              ) : null}
              {post?.balconies && post?.balconies > 0 ? (
                <div className="card-elem flex start mr4">
                  <ApartmentIcon />
                  <span>
                    <strong>{post?.balconies}</strong>
                  </span>
                </div>
              ) : null}
              {post?.pools && post?.pools > 0 ? (
                <div className="card-elem flex start mr4">
                  <PoolIcon />
                  <span>
                    <strong>{post?.pools}</strong>
                  </span>
                </div>
              ) : null}
            </div>
            {post?.description && post?.description !== "" ? (
              <div className="post-description">
                <p>{post?.description}</p>
              </div>
            ) : null}

            <div className="avis-container flex start">
              <div>
                <h3>Avis Juridique</h3>
                <Rating
                  name="post-rating"
                  value={formData.rating}
                  onChange={(e, newValue) => {
                    setError(null)
                    setFormData({ ...formData, rating: newValue })
                  }}
                />
              </div>
              <textarea
                value={formData.avis}
                onChange={(e) => {
                  setError(null)
                  setFormData({ ...formData, avis: e.target.value })
                }}
              ></textarea>
              <PublicIcon onClick={publicPost} />
              <span className="public-error">{error}</span>
              <span className="public-feedback">{feedback}</span>
              {PostsIsLoading ? (
                <img
                  src="/images/admin-loading.gif"
                  alt="Loading"
                  className="public-loading"
                />
              ) : null}
            </div>
          </div>
          <div className="col-35">
            <CardMedia
              className="post-media"
              image={
                post.photos && post?.photos[0]
                  ? post.photos[0]
                  : "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              title={post?.title}
            />
            <div className="post-links">
              <div
                className="post-link flex start"
                onClick={() => setSelectedSlider(post?.photos)}
              >
                <PhotoLibraryIcon />
                <span>Photos de publication</span>
              </div>
              <div
                className="post-link flex start"
                onClick={() => setSelectedSlider(post?.docs)}
              >
                {/* <div className="post-link flex start" onClick={() => decPdfs(post?.files)}>
                                {console.log("pdffilesdec" ,pdfFilesDec)} */}
                <DescriptionIcon />
                {checkIfPdf()}
              </div>
              <div
                className="post-link flex start"
                onClick={() => setSelectedSlider(post?.plans)}
              >
                <MapIcon />
                <span>Plans de publication</span>
              </div>
            </div>
          </div>
          <SliderModal
            files={selectedSlider}
            closeImage={() => setSelectedSlider(null)}
          />
          {/* <ShowDocumentsDialog
            setOpen={setOpenShowDocumentsDialog}
            open={openShowDocumentsDialog}
            documentsToDisplay={post?.docs}
          /> */}
        </div>
      )
    }
  }

  function checkIfPdf() {
    console.log(post)
    var countPdf = 0
    post?.docs?.map((pdfFile, key) => {
      if (pdfFile.split(";")[0].split("/")[1] === "pdf") countPdf += 1
    })

    return (
      <div
        className="post-link flex start"
        // onClick={(e) => {
        //   e.stopPropagation()
        //   setOpenShowDocumentsDialog(true)
        // }}
      >
        <span>{countPdf} Document(s) PDF</span>
        {/* {countPdf ? (
          <span>{countPdf} Documents PDF</span>
        ) : (
          <span>Aucun document</span>
        )} */}
      </div>
    )
  }

  function checkImages() {
    var countImages = 0
    post.docs.map((pdfFile, key) => {
      if (pdfFile.split(";")[0].split("/")[1] === "pdf") countImages += 1
    })

    return (
      <div
        className="post-link flex start"
        onClick={(e) => {
          e.stopPropagation()
          setOpenShowDocumentsDialog(true)
        }}
      >
        <span>{countImages} image(s) </span>
      </div>
    )
  }
}
