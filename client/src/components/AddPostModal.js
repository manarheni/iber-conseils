import React, { useEffect, useState } from "react"
import CancelIcon from "@material-ui/icons/Cancel"
import Switch from "@material-ui/core/Switch"
import BackupIcon from "@material-ui/icons/Backup"
import { CardMedia, Grow } from "@material-ui/core/"
import ReplayIcon from "@material-ui/icons/Replay"
import CachedIcon from "@material-ui/icons/Cached"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import ErrorIcon from "@material-ui/icons/Error"
import { createPost } from "../actions/posts"
import { useDispatch, useSelector } from "react-redux"
import WbSunnyIcon from "@material-ui/icons/WbSunny"
import Brightness2Icon from "@material-ui/icons/Brightness2"
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf"
import { getBase64, resizePhotos, pdfToBase64 } from "./ImagesFunctions"
import { API } from "../api"

export default function AddPostModal(props) {
  const { data, user } = props
  const { PostsIsLoading } = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const [dark, setDark] = useState(false)

  const [postData, setPostData] = useState({
    creator: user?._id,
    status: "Waiting",
    type: "Achat",
    category: "Terrain",
    title: "",
    activity: "",
    register: true,
    undivided: false,
    numTitle: "",
    location: "",
    adress: "",
    area: 0,
    agricole: false,
    nameOwner: "",
    phoneOwner: "",
    period: "",
    price: 0,
    rooms: 0,
    batherooms: 0,
    kitchens: 0,
    pools: 0,
    balconies: 0,
    description: "",
    docType: "",
    rating: 0,
    monthly: true,
    photos: [],
    plans: [],
    docs: [],
  })

  useEffect(() => {
    // TODO TESTING ONLY IN DEV
    if (API.defaults.baseURL.indexOf("localhost") !== -1)
      setPostData({
        creator: user?._id,
        status: "Waiting",
        type: "Achat",
        category: "Terrain",
        title: "This autocomplete is only available in development stage",
        activity: "Activity X",
        register: true,
        undivided: false,
        numTitle: "0000",
        location: "Gabes",
        adress: "Address for testing",
        area: 20,
        agricole: "Industriel",
        nameOwner: "Owner X",
        phoneOwner: "00112233",
        period: "",
        price: 100,
        rooms: 0,
        batherooms: 0,
        kitchens: 0,
        pools: 0,
        balconies: 0,
        description: "Description For testing",
        docType: "",
        rating: 0,
        monthly: true,
        photos: [],
        plans: [],
        docs: [],
      })
  }, [])

  const [feedback, setFeedback] = useState(null)
  const [feedbackUpload, setFeedbackUpload] = useState("")

  useEffect(() => {
    if (props.show) {
      document.getElementsByTagName("body")[0].classList.add("freez")
    } else {
      document.getElementsByTagName("body")[0].classList.remove("freez")
    }
  }, [props.show])

  const handleChangeImmatricule = (e) => {
    e.preventDefault()
    setPostData({ ...postData, register: !postData.register })
  }

  const handleChangeUndivided = (e) => {
    e.preventDefault()
    setPostData({ ...postData, undivided: !postData.undivided })
  }

  const handleChangeAgricole = (e) => {
    e.preventDefault()
    setPostData({ ...postData, agricole: !postData.agricole })
  }

  const handleSelectFiles = (e, type) => {
    e.preventDefault()
    switch (type) {
      case "photos":
        document.querySelector(".files-select.photos input").click()
        break
      case "plans":
        document.querySelector(".files-select.plans input").click()
        break
      case "docs":
        document.querySelector(".files-select.docs input").click()
        break
      default:
        break
    }
  }

  const uploadPhotos = (e) => {
    const files = [...e.target.files]
    if (postData.photos.length + files.length > 10) {
      return setFeedbackUpload("Limite de ficher atteinte (Photo).")
    }
    setFeedbackUpload("")

    let photosArray = []
    if (files) {
      resizePhotos(files)
        .then((res) => {
          res.map(
            (r, index) =>
              index < 10 &&
              photosArray.push(`data:image/${r.ext};base64,${r.base64}`)
          )
        })
        .then(() =>
          setPostData({
            ...postData,
            photos: [...postData.photos, ...photosArray],
          })
        )
    }
  }

  const uploadPlans = (e) => {
    const files = [...e.target.files]
    if (postData.plans.length + files.length > 5) {
      return setFeedbackUpload("Limite de ficher atteinte (Plan).")
    }
    setFeedbackUpload("")
    let plansArray = []
    let imagesFiles = []
    let pdfsFiles = []
    let pdfsFilesRes = []

    files?.map((file) => {
      if (file.type === "application/pdf") {
        pdfsFiles.push(file)
      } else {
        imagesFiles.push(file)
      }
    })

    if (imagesFiles.length > 0) {
      resizePhotos(imagesFiles)
        .then((res) => {
          res.map(
            (r, index) =>
              index < 5 &&
              plansArray.push(`data:image/${r.ext};base64,${r.base64}`)
          )
        })
        .then(() => setPostData({ ...postData, plans: plansArray }))
    }
    if (pdfsFiles.length > 0) {
      pdfsFilesRes = pdfToBase64(pdfsFiles)
    }

    plansArray = [...plansArray, ...pdfsFilesRes]

    setTimeout(() => {
      setPostData({
        ...postData,
        plans: [...postData.plans, ...plansArray, ...pdfsFilesRes],
      })
    }, 1000)
  }
  const uploadDocs = (e) => {
    const files = [...e.target.files]
    if (postData.docs.length + files.length > 5) {
      return setFeedbackUpload("Limite de ficher atteinte (Document).")
    }
    setFeedbackUpload("")

    let docsArray = []
    let imagesFiles = []
    let pdfsFiles = []
    let pdfsFilesRes = []

    files?.map((file) => {
      if (file.type === "application/pdf") {
        pdfsFiles.push(file)
      } else {
        imagesFiles.push(file)
      }
    })

    if (imagesFiles.length > 0) {
      resizePhotos(imagesFiles).then((res) => {
        res.map(
          (r, index) =>
            index < 10 &&
            docsArray.push(`data:image/${r.ext};base64,${r.base64}`)
        )
      })
    }

    if (pdfsFiles.length > 0) {
      pdfsFilesRes = pdfToBase64(pdfsFiles)
    }

    docsArray = [...docsArray, ...pdfsFilesRes]

    setTimeout(() => {
      setPostData({
        ...postData,
        docs: [...postData.docs, ...docsArray, ...pdfsFilesRes],
      })
    }, 1000)
  }

  const clear = () => {
    setPostData({
      creator: user?._id,
      status: "Waiting",
      type: "Achat",
      category: "Terrain",
      title: "",
      activity: "",
      register: true,
      undivided: false,
      numTitle: "",
      location: "",
      adress: "",
      area: 0,
      agricole: false,
      nameOwner: "",
      phoneOwner: "",
      period: "",
      price: 0,
      rooms: 0,
      batherooms: 0,
      kitchens: 0,
      pools: 0,
      balconies: 0,
      description: "",
      docType: "",
      rating: 0,
      monthly: true,
      photos: [],
      plans: [],
      docs: [],
    })
  }

  const publishPost = (e) => {
    // If Unregistered then don't send numTitle
    if (!postData.register) delete postData.numTitle
    e.preventDefault()
    if (postData) {
      setPostData({ ...postData, creator: user._id })
      if (!postData.type) {
        setFeedback(
          "Veuillez sélectionner le type de publication (Achat/Location) !"
        )
        return
      }
      if (!postData.category) {
        setFeedback(
          "Veuillez sélectionner le category de publication (Terrain/Appartement...) !"
        )
        return
      }
      if (
        !postData.title ||
        postData.title === "" ||
        postData.title.length < 5
      ) {
        setFeedback("Veuillez entrer le nom de publication !")
        return
      }
      if (
        postData.category === "Terrain" ||
        postData.category === "Appartement" ||
        postData.category === "Villa" ||
        postData.category === "Achat Fond"
      ) {
        if (!postData.register && postData.docType === "") {
          setFeedback("Veuillez sélectionner le type de documents")
          return
        }
        if (!postData.register && !postData.docs) {
          setFeedback("Veuillez sélectionner vos documents")
          return
        }
        if (postData.register)
          if (
            !postData.numTitle ||
            postData.numTitle === "" ||
            postData.numTitle.length < 3
          ) {
            setFeedback("Veuillez entrer un numéro de document valide!")
            return
          }
      }
      if (
        !postData.description ||
        postData.description === "" ||
        postData.description.length < 5
      ) {
        setFeedback("Veuillez entrer le description de publication !")
        return
      }
      if (
        !postData.nameOwner ||
        postData.nameOwner === "" ||
        postData.nameOwner.length < 3
      ) {
        setFeedback("Veuillez entrer le nom de propriétaire !")
        return
      }
      if (
        !postData.phoneOwner ||
        postData.phoneOwner === "" ||
        postData.phoneOwner.length < 3
      ) {
        setFeedback("Veuillez entrer le numéro de téléphone de propriétaire !")
        return
      }

      if (!postData.price || postData.price === "" || postData.price <= 0) {
        setFeedback("Veuillez entrer le prix de votre article !")
        return
      }
      /* if (!postData.photos) {
                setFeedback('Veuillez sélectionner au moin 1 photo de la publication  !');
                return;
            } */
      dispatch(createPost(postData)).then(() => {
        setFeedback("Votre Publication est passé à la phase de vérification.")
        document.getElementsByClassName("addpost-feedback")[0].style.color =
          "#080"
        clear()
      })
    }
  }

  if (props.show) {
    return (
      <Grow in>
        <div
          className={dark ? "addmodal-container dark" : "addmodal-container"}
        >
          <div className="theme-actions">
            <Brightness2Icon className="moon" onClick={() => setDark(true)} />
            <WbSunnyIcon className="sun" onClick={() => setDark(false)} />
          </div>
          <div className="addmodal-content">
            <CancelIcon className="close-btn" onClick={props.close} />
            <CachedIcon className="reload-btn" onClick={clear} />
            <div className="app-container">
              <div className="step1 flex">
                <div className="col-35 flex">
                  <div className="col-2 type-items">
                    <div
                      className={
                        postData.type === "Achat"
                          ? "app-item active"
                          : "app-item"
                      }
                      onClick={(e) =>
                        setPostData({
                          ...postData,
                          type: "Achat",
                          category: null,
                        })
                      }
                    >
                      <img src="/images/app/sign.png" alt="Item" />
                      <h4>Vente</h4>
                    </div>
                    <div
                      className={
                        postData.type === "Location"
                          ? "app-item active"
                          : "app-item"
                      }
                      onClick={(e) =>
                        setPostData({
                          ...postData,
                          type: "Location",
                          category: null,
                        })
                      }
                    >
                      <img src="/images/app/rent.png" alt="Item" />
                      <h4>Location</h4>
                    </div>
                  </div>
                  <div className="col-2">
                    {postData.type === "Achat" ? (
                      <div className="category-items">
                        <div
                          className={
                            postData.category === "Terrain"
                              ? "app-item active"
                              : "app-item"
                          }
                          onClick={(e) =>
                            setPostData({ ...postData, category: "Terrain" })
                          }
                        >
                          <img src="/images/app/terrain.png" alt="Item" />
                          <h4>Terrain</h4>
                        </div>
                        <div
                          className={
                            postData.category === "Appartement"
                              ? "app-item active"
                              : "app-item"
                          }
                          onClick={(e) =>
                            setPostData({
                              ...postData,
                              category: "Appartement",
                            })
                          }
                        >
                          <img src="/images/app/appartement.png" alt="Item" />
                          <h4>Appartement</h4>
                        </div>
                        <div
                          className={
                            postData.category === "Villa"
                              ? "app-item active"
                              : "app-item"
                          }
                          onClick={(e) =>
                            setPostData({ ...postData, category: "Villa" })
                          }
                        >
                          <img src="/images/app/maison.png" alt="Item" />
                          <h4>Maison, Villa</h4>
                        </div>
                        <div
                          className={
                            postData.category === "Achat Bureau"
                              ? "app-item active"
                              : "app-item"
                          }
                          onClick={(e) =>
                            setPostData({
                              ...postData,
                              category: "Achat Bureau",
                            })
                          }
                        >
                          <img src="/images/app/bureau.png" alt="Item" />
                          <h4>Bureau</h4>
                        </div>
                        <div
                          className={
                            postData.category === "Achat Fond"
                              ? "app-item active"
                              : "app-item"
                          }
                          onClick={(e) =>
                            setPostData({ ...postData, category: "Achat Fond" })
                          }
                        >
                          <img src="/images/app/fond.png" alt="Item" />
                          <h4>Fonds de commerce</h4>
                        </div>
                      </div>
                    ) : postData.type === "Location" ? (
                      <div className="category-items">
                        <div
                          className={
                            postData.category === "Terrain"
                              ? "app-item active"
                              : "app-item"
                          }
                          onClick={(e) =>
                            setPostData({ ...postData, category: "Terrain" })
                          }
                        >
                          <img src="/images/app/terrain.png" alt="Item" />
                          <h4>Terrain</h4>
                        </div>
                        <div
                          className={
                            postData.category === "Location Bureau"
                              ? "app-item active"
                              : "app-item"
                          }
                          onClick={(e) =>
                            setPostData({
                              ...postData,
                              category: "Location Bureau",
                            })
                          }
                        >
                          <img src="/images/app/bureau.png" alt="Item" />
                          <h4>Bureau</h4>
                        </div>
                        <div
                          className={
                            postData.category === "Location Local"
                              ? "app-item active"
                              : "app-item"
                          }
                          onClick={(e) =>
                            setPostData({
                              ...postData,
                              category: "Location Local",
                            })
                          }
                        >
                          <img src="/images/app/local.png" alt="Item" />
                          <h4>Local commercial</h4>
                        </div>
                        <div
                          className={
                            postData.category === "Location Fond"
                              ? "app-item active"
                              : "app-item"
                          }
                          onClick={(e) =>
                            setPostData({
                              ...postData,
                              category: "Location Fond",
                            })
                          }
                        >
                          <img src="/images/app/fond.png" alt="Item" />
                          <h4>Fonds de commerce</h4>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-65 form">
                  <div className="terrain-form flex">
                    <div className="col-2">
                      {postData.category && (
                        <>
                          <div className="terrain-form">
                            <div className="elem flex start">
                              <label>
                                Nom de publication{" "}
                                <strong className="required">*</strong>
                              </label>
                              <input
                                type="text"
                                value={postData?.title}
                                onChange={(e) =>
                                  setPostData({
                                    ...postData,
                                    title: e.target.value,
                                  })
                                }
                              />
                              {!postData?.title ||
                              postData?.title === "" ? null : postData?.title
                                  .length < 5 ? (
                                <span className="error-input">
                                  <ErrorIcon />
                                </span>
                              ) : (
                                <span className="valid-input">
                                  <CheckCircleIcon />
                                </span>
                              )}
                            </div>
                            {postData.category === "Achat Fond" ||
                            postData.category === "Location Fond" ? (
                              <div className="elem flex start">
                                <label>
                                  Activitées{" "}
                                  <strong className="required">*</strong>
                                </label>
                                <input
                                  type="text"
                                  value={postData.activity}
                                  onChange={(e) =>
                                    setPostData({
                                      ...postData,
                                      activity: e.target.value,
                                    })
                                  }
                                />
                                {!postData?.activity ||
                                postData?.activity === "" ? null : postData
                                    ?.activity.length < 3 ? (
                                  <span className="error-input">
                                    <ErrorIcon />
                                  </span>
                                ) : (
                                  <span className="valid-input">
                                    <CheckCircleIcon />
                                  </span>
                                )}
                              </div>
                            ) : null}
                            {postData.category !== "Location Bureau" &&
                            postData.category !== "Location Local" &&
                            postData.category !== "Location Fond" ? (
                              <>
                                {/*<div className={postData.category === 'Appartement' || postData.category === 'Villa' || postData.category === 'Terrain' || postData.category === 'Achat Bureau' ? "elems flex" : ""}>
                                                                            postData.category === 'Appartement' || postData.category === 'Villa' || postData.category === 'Terrain' || postData.category === 'Achat Bureau' ? (
                                                                                <div className="elem flex start">
                                                                                    <label>Propriété dans l'indivision</label>
                                                                                    <Switch color="primary" size="medium" checked={postData.undivided} onClick={e => handleChangeUndivided(e)} name="checkIn" />
                                                                                </div>
                                                                            ) : null
                                                                        
                                                                    </div>*/}
                                <div className="elem flex start">
                                  <label>
                                    {postData.category === "Achat Fond" ||
                                    postData.category === "Location Fond"
                                      ? "Inscrit au RNE"
                                      : "Immatriculé"}{" "}
                                    {postData.category !== "Achat Fond" &&
                                    postData.category !== "Location Fond" ? (
                                      <span data="مسجل في إدارة الملكية العقارية">
                                        ?
                                      </span>
                                    ) : null}
                                  </label>
                                  <Switch
                                    color="primary"
                                    size="medium"
                                    checked={postData.register}
                                    onClick={(e) => {
                                      e.preventDefault()
                                      setPostData({
                                        ...postData,
                                        register: !postData.register,
                                      })
                                    }}
                                    name="checkIm"
                                  />
                                </div>
                                {postData.register ? (
                                  <div className="elem flex start">
                                    <label>
                                      {postData.category === "Achat Fond" ||
                                      postData.category === "Location Fond"
                                        ? "Identifiant unique"
                                        : "Numéro de immatriculation"}{" "}
                                      <strong className="required">*</strong>{" "}
                                      <span data="Ces informations sont confidentielles.Ils ne seront pas affichées.">
                                        ?
                                      </span>{" "}
                                    </label>
                                    <input
                                      type="number"
                                      value={postData.numTitle}
                                      onChange={(e) =>
                                        setPostData({
                                          ...postData,
                                          numTitle: e.target.value,
                                        })
                                      }
                                    />
                                    {!postData?.numTitle ||
                                    postData?.numTitle === "" ? null : postData
                                        ?.numTitle.length < 3 ? (
                                      <span className="error-input">
                                        <ErrorIcon />
                                      </span>
                                    ) : (
                                      <span className="valid-input">
                                        <CheckCircleIcon />
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <div className="elem flex start">
                                    <label>
                                      Type doc valable{" "}
                                      <strong className="required">*</strong>
                                    </label>
                                    <select
                                      id="type"
                                      value={postData.docType}
                                      onChange={(e) =>
                                        setPostData({
                                          ...postData,
                                          docType: e.target.value,
                                        })
                                      }
                                    >
                                      <option value="">Type de document</option>
                                      <option value="Contrat d'achat par héritage ( بموجب الارث)">
                                        {" "}
                                        Contrat d'achat par héritage ( بموجب
                                        الارث){" "}
                                      </option>
                                      <option value="Contrat de donation (بموجب عقد هبة)">
                                        {" "}
                                        Contrat de donation (بموجب عقد هبة){" "}
                                      </option>
                                      <option value="Autres">Autres</option>
                                    </select>
                                    {!postData?.docType ||
                                    postData?.docType === "" ? null : (
                                      <span className="valid-input">
                                        <CheckCircleIcon />
                                      </span>
                                    )}
                                  </div>
                                )}
                              </>
                            ) : null}
                            <div className="elem flex start">
                              <label>
                                Emplacement{" "}
                                <strong className="required">*</strong>
                              </label>
                              <select
                                id="type"
                                value={postData.location}
                                onChange={(e) =>
                                  setPostData({
                                    ...postData,
                                    location: e.target.value,
                                  })
                                }
                              >
                                <option value="">
                                  Sélectionner l'emplacement
                                </option>
                                {data.cities.map((city) => (
                                  <option key={city} value={city}>
                                    {city}
                                  </option>
                                ))}
                              </select>
                              {!postData?.location ||
                              postData?.location === "" ? null : (
                                <span className="valid-input">
                                  <CheckCircleIcon />
                                </span>
                              )}
                            </div>
                            <div className="elem flex start">
                              <label>
                                Adresse<strong className="required">*</strong>
                              </label>
                              <input
                                type="text"
                                value={postData.adress}
                                onChange={(e) =>
                                  setPostData({
                                    ...postData,
                                    adress: e.target.value,
                                  })
                                }
                              />
                              {!postData?.adress ||
                              postData?.adress === "" ? null : postData?.adress
                                  .length < 5 ? (
                                <span className="error-input">
                                  <ErrorIcon />
                                </span>
                              ) : (
                                <span className="valid-input">
                                  <CheckCircleIcon />
                                </span>
                              )}
                            </div>
                            <div className="elem flex start">
                              <label>Superficie</label>
                              <input
                                type="number"
                                value={postData.area}
                                onChange={(e) =>
                                  setPostData({
                                    ...postData,
                                    area: e.target.value,
                                  })
                                }
                              />
                              <h6 className="superficy-unity">M²</h6>
                            </div>
                            {postData.category === "Terrain" ? (
                              <div className="elem flex start">
                                <label>Type de terrain</label>
                                <select
                                  id="type"
                                  value={postData.agricole}
                                  onChange={(e) =>
                                    setPostData({
                                      ...postData,
                                      agricole: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Type de terrain</option>
                                  <option value="Agricole">Agricole</option>
                                  <option value="Industriel">Industriel</option>
                                  <option value="Milieu Urbain">
                                    Mileu Urbain
                                  </option>
                                </select>
                              </div>
                            ) : null}
                            <div className="elem flex start">
                              <label>
                                {postData.undivided
                                  ? "Propriétaires"
                                  : "Propriétaire"}{" "}
                                <strong className="required">*</strong>
                              </label>
                              <input
                                type="text"
                                value={postData.nameOwner}
                                onChange={(e) =>
                                  setPostData({
                                    ...postData,
                                    nameOwner: e.target.value,
                                  })
                                }
                              />
                              {!postData?.nameOwner ||
                              postData?.nameOwner === "" ? null : postData
                                  ?.nameOwner.length < 3 ? (
                                <span className="error-input">
                                  <ErrorIcon />
                                </span>
                              ) : (
                                <span className="valid-input">
                                  <CheckCircleIcon />
                                </span>
                              )}
                            </div>
                            <div className="elem flex start">
                              <label>
                                Téléphone{" "}
                                <strong className="required">*</strong>
                              </label>
                              <input
                                type="tel"
                                value={postData.phoneOwner}
                                onChange={(e) =>
                                  setPostData({
                                    ...postData,
                                    phoneOwner: e.target.value,
                                  })
                                }
                              />
                              {!postData?.phoneOwner ||
                              postData?.phoneOwner === "" ? null : postData
                                  ?.phoneOwner.length < 7 ? (
                                <span className="error-input">
                                  <ErrorIcon />
                                </span>
                              ) : (
                                <span className="valid-input">
                                  <CheckCircleIcon />
                                </span>
                              )}
                            </div>
                            <div className="elem flex start">
                              <label>
                                Prix<strong className="required">*</strong>
                              </label>
                              <input
                                type="number"
                                value={postData.price}
                                onChange={(e) =>
                                  setPostData({
                                    ...postData,
                                    price: e.target.value,
                                  })
                                }
                              />
                              <h6 className="price-unity">TND</h6>
                              {!postData?.price ||
                              postData?.price === "" ? null : postData?.price <=
                                0 ? (
                                <span className="error-input">
                                  <ErrorIcon />
                                </span>
                              ) : (
                                <span className="valid-input">
                                  <CheckCircleIcon />
                                </span>
                              )}
                            </div>
                            <div className="elem flex start space-wrap">
                              <label>
                                {postData.category !== "Achat Fond" &&
                                postData.category !== "Location Fond"
                                  ? "Description"
                                  : "Les éléments de fond de commerce"}{" "}
                                <strong className="required">*</strong>
                              </label>
                              <textarea
                                value={postData.description}
                                onChange={(e) =>
                                  setPostData({
                                    ...postData,
                                    description: e.target.value,
                                  })
                                }
                                rows="3"
                              ></textarea>
                              {!postData?.description ||
                              postData?.description === "" ? null : postData
                                  ?.description.length < 5 ? (
                                <span className="error-input">
                                  <ErrorIcon />
                                </span>
                              ) : (
                                <span className="valid-input">
                                  <CheckCircleIcon />
                                </span>
                              )}
                            </div>
                          </div>
                          {postData.category !== "Terrain" &&
                          postData.category !== "Location Local" ? (
                            <>
                              <div className="description">
                                <div className="description-details flex between">
                                  <div className="elem flex start">
                                    <label>
                                      {postData.category === "Appartement" ||
                                      postData.category === "Villa"
                                        ? "Chambres"
                                        : "Salles"}
                                    </label>
                                    <input
                                      type="number"
                                      value={postData.rooms}
                                      onChange={(e) =>
                                        setPostData({
                                          ...postData,
                                          rooms: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="elem flex start">
                                    <label>
                                      {postData.category === "Appartement" ||
                                      postData.category === "Villa"
                                        ? "Salles de bain"
                                        : "WC"}
                                    </label>
                                    <input
                                      type="number"
                                      value={postData.batherooms}
                                      onChange={(e) =>
                                        setPostData({
                                          ...postData,
                                          batherooms: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                {postData.category === "Appartement" ||
                                postData.category === "Villa" ? (
                                  <div className="description-details flex between">
                                    <div className="elem flex start">
                                      <label>Cuisines</label>
                                      <input
                                        type="number"
                                        value={postData.kitchens}
                                        onChange={(e) =>
                                          setPostData({
                                            ...postData,
                                            kitchens: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    {postData.category === "Appartement" ? (
                                      <div className="elem flex start">
                                        <label>Etage</label>
                                        <input
                                          type="number"
                                          value={postData.balconies}
                                          onChange={(e) =>
                                            setPostData({
                                              ...postData,
                                              balconies: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                    ) : (
                                      <div className="elem flex start">
                                        <label>Pscines</label>
                                        <input
                                          type="number"
                                          value={postData.pools}
                                          onChange={(e) =>
                                            setPostData({
                                              ...postData,
                                              pools: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                    )}
                                  </div>
                                ) : null}
                              </div>
                            </>
                          ) : null}
                        </>
                      )}
                    </div>
                    <div className="col-2">
                      {postData.category && (
                        <>
                          {
                            // Documents
                            // postData.category !== "Location Bureau" &&
                            // postData.category !== "Location Local" &&
                            // postData.category !== "Location Fond" ? (
                           true ? (
                              <>
                                <label className="nb">
                                  Sélectionner vos documents (Max: 5){" "}
                                  {postData.register ? null : (
                                    <strong className="required">*</strong>
                                  )}
                                  <span data="Ces informations sont confidentielles. Ils ne seront pas affichées.">
                                    ?
                                  </span>
                                </label>
                                <div className="files-actions flex start">
                                  <button
                                    className="images-select"
                                    onClick={(e) =>
                                      handleSelectFiles(e, "docs")
                                    }
                                  >
                                    <BackupIcon />
                                  </button>
                                  <ReplayIcon
                                    className="clear"
                                    onClick={() =>
                                      setPostData({
                                        ...postData,
                                        docs: [],
                                        rating: postData.docs
                                          ? postData.rating - 1
                                          : postData.rating + 1,
                                      })
                                    }
                                  />
                                  <div className="files-select docs">
                                    <input
                                      type="file"
                                      multiple={true}
                                      onChange={(e) => uploadDocs(e)}
                                      accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                                    />
                                  </div>
                                </div>
                                <div className="post-images flex start wrap">
                                  {postData.docs?.map((file, index) => (
                                    <div
                                      key={index}
                                      className="selected-file-container"
                                    >
                                      {index < 5 ? (
                                        <CardMedia
                                          className="selected-file"
                                          image={
                                            file.includes("pdf")
                                              ? "/images/pdfIcon.png"
                                              : file
                                          }
                                          title={`photo${index}`}
                                        />
                                      ) : null}
                                    </div>
                                  ))}
                                </div>
                                {feedbackUpload ===
                                "Limite de ficher atteinte (Document)." ? (
                                  <p className="addpost-feedback">
                                    {feedbackUpload}
                                  </p>
                                ) : null}
                              </>
                            ) : null
                          }

                          {/* Plans */}

                          <label className="nb">
                            Sélectionner les plans
                            {postData.category === "Terrain"
                              ? " de terrain"
                              : postData.category === "Appartement"
                              ? " de l'appartement"
                              : postData.category === "Villa"
                              ? " de villa/maison"
                              : postData.category === "Achat Bureau"
                              ? " bureau"
                              : postData.category === "Achat Fond"
                              ? " fond"
                              : postData.category === "Location Fond"
                              ? " fond"
                              : postData.category === "Location Local"
                              ? " local commercial"
                              : postData.category === "Location Bureau"
                              ? " bureau"
                              : ""}
                            &nbsp;(Max: 5)
                          </label>
                          <div className="files-actions flex start">
                            <button
                              className="images-select"
                              onClick={(e) => handleSelectFiles(e, "plans")}
                            >
                              <BackupIcon />
                            </button>
                            <ReplayIcon
                              className="clear"
                              onClick={() =>
                                setPostData({
                                  ...postData,
                                  plans: [],
                                  rating: postData.plans
                                    ? postData.rating - 0.5
                                    : postData.rating + 0.5,
                                })
                              }
                            />
                            <div className="files-select plans">
                              <input
                                type="file"
                                multiple={true}
                                onChange={(e) => uploadPlans(e)}
                                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                              />
                            </div>
                          </div>
                          <div className="post-images flex start wrap">
                            {postData.plans?.map((file, index) => (
                              <div
                                key={index}
                                className="selected-file-container"
                              >
                                {index < 5 ? (
                                  <CardMedia
                                    className="selected-file"
                                    image={file}
                                    title={`photo${index}`}
                                  />
                                ) : null}
                              </div>
                            ))}
                            {feedbackUpload ===
                            "Limite de ficher atteinte (Plan)." ? (
                              <p className="addpost-feedback">
                                {feedbackUpload}
                              </p>
                            ) : null}
                          </div>

                          {/* Photos */}

                          <label className="nb">
                            Sélectionner des photos
                            {postData.category === "Terrain"
                              ? " de terrain"
                              : postData.category === "Appartement"
                              ? " de l'appartement"
                              : postData.category === "Villa"
                              ? " de villa/maison"
                              : postData.category === "Achat Bureau"
                              ? " bureau"
                              : postData.category === "Achat Fond"
                              ? " fond"
                              : postData.category === "Location Fond"
                              ? " fond"
                              : postData.category === "Location Local"
                              ? " local commercial"
                              : postData.category === "Location Bureau"
                              ? " bureau"
                              : ""}
                            &nbsp;(Max: 10)
                          </label>
                          <div className="files-actions flex start">
                            <button
                              className="images-select"
                              onClick={(e) => handleSelectFiles(e, "photos")}
                            >
                              <BackupIcon />
                            </button>
                            <ReplayIcon
                              className="clear"
                              onClick={() =>
                                setPostData({ ...postData, photos: [] })
                              }
                            />
                            <div className="files-select photos">
                              <input
                                type="file"
                                multiple={true}
                                onChange={(e) => uploadPhotos(e)}
                                accept="image/jpeg,image/gif,image/png,image/x-eps"
                              />
                            </div>
                          </div>
                          <div className="post-images photos flex start wrap">
                            {postData.photos?.map((file, index) => (
                              <div
                                key={index}
                                className="selected-file-container"
                              >
                                {index < 10 ? (
                                  <CardMedia
                                    className="selected-file"
                                    image={file}
                                    title={`photo${index}`}
                                  />
                                ) : null}
                              </div>
                            ))}
                            {feedbackUpload ===
                            "Limite de ficher atteinte (Photo)." ? (
                              <p className="addpost-feedback">
                                {feedbackUpload}
                              </p>
                            ) : null}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="next-btn flex">
              {feedback ? <p className="addpost-feedback">{feedback}</p> : null}
              {PostsIsLoading ? (
                <div className="flex">
                  <span
                    style={{
                      marginRight: "10px",
                      color: "#666",
                      minWidth: "280px",
                      fontSize: "0.9rem",
                    }}
                  >
                    Téléchargement des images ...
                  </span>
                  <img
                    src="/images/loading-buffering.gif"
                    alt="loading"
                    className="g-img"
                  />
                </div>
              ) : null}

              <button
                title="Vos données sont sécurisées"
                onClick={(e) => publishPost(e)}
              >
                Publier
              </button>
            </div>
          </div>
        </div>
      </Grow>
    )
  } else {
    return null
  }
}
