import React, { useState, useEffect } from "react"
import decode from "jwt-decode"
import { Avatar, Button } from "@material-ui/core"
import { Link, useHistory, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import MenuIcon from "@material-ui/icons/Menu"
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined"
import * as actionType from "../../constants/actionTypes"
import useStyles from "./styles"
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined"
import PostAddIcon from "@material-ui/icons/PostAdd"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import SettingsIcon from "@material-ui/icons/Settings"
import AddPostModal from "../AddPostModal"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import FavoriteIcon from "@material-ui/icons/Favorite"
import { listOrders } from "../../actions/orders.js"
import BookmarkIcon from "@material-ui/icons/Bookmark"
import { API } from "../../api"

export default function Header(props) {
  const { data } = props
  const [showMenu, setShowMenu] = useState(false)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const classes = useStyles()
  const [newPost, setNewPost] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const logout = () => {
    dispatch({ type: actionType.LOGOUT })
    history.push("/auth")
    setUser(null)
    window.location.reload()
  }

  useEffect(() => {
    const token = user?.token
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken?.exp * 1000 < new Date().getTime()) logout()
    }
    setUser(JSON.parse(localStorage.getItem("profile")))
    // eslint-disable-next-line
  }, [location])

  const handleMenu = (e) => {
    e.preventDefault()
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    dispatch(listOrders())
  }, [dispatch])

  return (
    <header id="header">
      <div className="mycontainer flex between">
        <div className="logo">
          <Link to="/">
            <img src="/images/logo.png" alt="Logo" />
            <h1 className={classes.heading1 + " desc-data"}>
              {data.projectName}
            </h1>
          </Link>
           {/* // TODO Dev Only  */}
           {API.defaults.baseURL.indexOf("localhost") !== -1 && (
              <>
                <div style={{ color: "#333" , marginLeft : "5px"}}>
                  API URL : {API.defaults.baseURL.toString()}{" "}
                  <span style={{ color: "red" }}>
                    # CE MESSAGE EST UNIQUEMENT VISIBLE EN PHASE DE DÉVELOPPEMENT
                  </span>
                </div>
              </>
            )}
        </div>
        <div className="flex">
          {user?.result ? (
            <div className={classes.profile}>
              <div style={{ paddingRight: "10px" }}>
                <Button
                  variant="contained"
                  className="header-btn flex"
                  onClick={(e) => setNewPost(true)}
                >
                  <PostAddIcon />
                  <span className="desc-data">{data.newPost}</span>
                </Button>
              </div>
              {/* <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar> */}
              {/* <Typography className={classes.userName} variant="h6"><span className="desc-data">{user?.result.name}</span></Typography> */}
              {/* <Button variant="contained" className="header-btn" onClick={logout}><ExitToAppIcon /><span className="desc-data">{data.logout}</span></Button> */}
              <Avatar
                onClick={handleMenu}
                className={classes.purple}
                alt={user?.result.name}
                src={user?.result.avatar}
              >
                {user?.result.name.charAt(0)}
              </Avatar>
              <Menu
                id="menu-appbar"
                className="menu"
                style={{
                  position: "absolute",
                  top: "70px",
                  right: "10%",
                  padding: "20px",
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <AccountCircleIcon className={classes.iconAccount} />{" "}
                  <Link to="/profile" className={classes.submenu}>
                    {" "}
                    Profile{" "}
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <BookmarkIcon className={classes.iconFilter} />{" "}
                  <Link to="/myPosts" className={classes.submenu}>
                    {" "}
                    Mes publications{" "}
                  </Link>{" "}
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <FavoriteIcon className={classes.iconFavorite} />{" "}
                  <Link to="/myFavorites" className={classes.submenu}>
                    {" "}
                    Publications favori{" "}
                  </Link>{" "}
                </MenuItem>
                <MenuItem className={classes.submenu} onClick={logout}>
                  <ExitToAppIcon className={classes.iconExit} />
                  {data.logout}
                </MenuItem>
              </Menu>
              <ExitToAppIcon
                style={{ marginLeft: "10px", width: "2.5rem" }}
                className={classes.iconExit}
                onClick={logout}
              />
              {user?.result?.role === "admin" ? (
                <Link to="/admin" className="flex">
                  <SettingsIcon className="setting-icon" />
                </Link>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div>
              <Button
                component={Link}
                to="/auth"
                variant="contained"
                className="header-btn"
              >
                <PermIdentityOutlinedIcon />
                {data.signin}
              </Button>
              <Button
                component={Link}
                to="/auth"
                variant="contained"
                className="header-btn flex"
              >
                <PostAddIcon />
                <span className="desc-data">{data.newPost}</span>
              </Button>
            </div>
          )}
          <MenuIcon
            className="menuicon"
            onClick={() => setShowMenu(!showMenu)}
          />
          {/* <div className="flex">
                        <img src={`/images/langs/${props.selectedLang}.png`} alt='Lang' className='selected-lang' />
                        <ExpandMoreIcon id="arrow" onClick={props.onShowListLang} className={showListLangs ? 'rotate' : '' } />
                        <div id="langs" className={ showListLangs ? "langs-list show" : "langs-list" }>
                            <ul>
                                <li className="lang" onClick={() => props.onSelectLang('en')} >
                                    <img src='/images/langs/en.png' alt='Lang' />&nbsp;English
                                </li>
                                <li className="lang" onClick={() => props.onSelectLang('fr')}>
                                    <img src='/images/langs/fr.png' alt='Lang' />&nbsp;Français
                                </li>
                                <li className="lang" onClick={() => props.onSelectLang('ar')}>
                                    <img src='/images/langs/ar.png' alt='Lang' />&nbsp;عربي
                                </li>
                            </ul>
                        </div>
                    </div> */}
        </div>
      </div>
      <nav className={showMenu ? "showme" : ""}>
        <ul>
          <li>
            <Link to="/" onClick={() => setShowMenu(false)}>
              {data.homePage}
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setShowMenu(false)}>
              {data.aboutPage}
            </Link>
          </li>
          <li>
            <Link to="/portfolio" onClick={() => setShowMenu(false)}>
              {data.portfolioPage}
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setShowMenu(false)}>
              {data.contactPage}
            </Link>
          </li>
          {/* <li className="menuLangs flex" onClick={() => setShowMenu(false)} >
                        <img src="/images/langs/en.png" alt="Lang" onClick={() => props.onSelectLang('en')} />
                        <img src="/images/langs/fr.png" alt="Lang" onClick={() => props.onSelectLang('fr')} />
                        <img src="/images/langs/ar.png" alt="Lang" onClick={() => props.onSelectLang('ar')} />
                    </li> */}
          <HighlightOffOutlinedIcon onClick={() => setShowMenu(false)} />
          <img src="/images/logo.png" alt="Logo" />
        </ul>
      </nav>
      <AddPostModal
        data={data}
        user={user?.result}
        show={newPost}
        close={(e) => setNewPost(false)}
      />
    </header>
  )
}
