import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '25px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: '5px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      justifyContent: 'center',
    },
  },
  logout: {
    marginLeft: '20px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: '10px',
    marginRight: '15px',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: "35px",
    height: "35px",
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
    },
  },
  signin: {
    background: 'linear-gradient(rgb(131, 102, 62) 0%, rgb(176, 150, 106) 100%) rgb(174, 148, 104)',
    borderRadius: '20px',
    padding: '5px 20px',
    color: '#fff',
    marginLeft: '10px',
  },
  iconFilter:{
    color:'#5161bf', 
    marginRight: '10px',
  },
  iconFavorite:{
    color:'#d77171', 
    marginRight: '10px',
  },
  iconAccount:{
    color:'#856297', 
    marginRight: '10px',
  },
  iconExit:{
    color:'rgb(131, 102, 62)', 
    marginRight: '10px',
  },
  submenu:{
    color: "#222"
  }

}));
