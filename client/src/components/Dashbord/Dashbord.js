import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './listitems';
import { Link, Route, Switch } from 'react-router-dom';
import HomeAdmin from './HomeAdmin';
import Users from './Users';
import Posts from './Posts';
import { Collapse } from '@material-ui/core';
import PublicPosts from './PublicPosts';
import MyProfile from './MyProfile';
import { useDispatch, useSelector } from 'react-redux';
import { GetProfile } from '../../actions/users';
import Order from './Orders';
import ArchivedPost from './ArchivedPost';

function Copyright() {
  return (
    <Typography variant="body2" className="copyright" align="center">
      {'Copyright © Iber'}
      {' '}
      {new Date().getFullYear()}
      {' By '}
      <a href="https://anytime4anywhere.fr/" target="_blank" rel="noreferrer noopener">
        Anytime & Anywhere 
      </a>
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    position: 'fixed',
    width: '100vw',
    height:'100vh',
    top: '0',
    left: '0',
    zIndex: '999',
    background: '#1b1c30',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    background: 'none',
    boxShadow: 'none',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#1d2539",
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: "#FFF",
    background: "none",
    boxShadow: 'none',
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    background: '#1d2539',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    position: 'relative',
    height: '100%',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    background: '#1b1c30',
    color: '#FFF'
  },
  paper: {
    padding: "10px",
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    boxShadow: 'rgb(255 255 255 / 10%) 5px 5px 10px 1px',
    background: '#26273b',
  },
  fixedHeight: {
    height: 400,
  },
}));

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('profile'))?.result;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.users)

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    dispatch(GetProfile(user._id))
  }, [dispatch, user._id])

 // if (users?.find(u => u?._id !== user?.result._id)?.role !== 'admin') return 'No Permission'

  return (
    <Collapse in>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>
            <div className="flex">
              <Link style={{ color: '#83663e', marginRight: '15px', fontSize: '1rem' }} to="/" >
                Iber Conseils
              </Link>
              <Link to="/admin/profile">
                <img src={profile.avatar || "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"} alt="Avatar" className="admin-logo" />
              </Link>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton className="drawer-btn" onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List className="color-white">{mainListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
                <Route path="/admin" exact={true} ><HomeAdmin classes={classes} fixedHeightPaper={fixedHeightPaper} /></Route>
                <Route path="/admin/publicPosts" exact={true} ><PublicPosts classes={classes} fixedHeightPaper={fixedHeightPaper} /></Route>
                <Route path="/admin/posts" exact={true} ><Posts /></Route>
                <Route path="/admin/users" exact={true} ><Users /></Route>
                <Route path="/admin/profile" exact={true} ><MyProfile profile={profile} /></Route>
                <Route path="/admin/orders" exact={true} ><Order /></Route>
                <Route path="/admin/archivedPosts" exact={true} ><ArchivedPost /></Route>
            </Switch>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </Collapse>
  );
}