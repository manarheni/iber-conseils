import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',

  },
  card: {
    display: 'block',
    width: '100%',
    position: 'relative',
  },
  section: {
    borderRadius: '20px',
    margin: 'auto',
    padding: '40px 0',
    flex: 1,
  },
  imageSection: {
    width: "100%",
    height: "350px",
    position: 'relative'
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    height: '100vh',
    background: '#FFF',
    color: '#8A6D45'
  },
  loadingCircle: {
    color: '#8A6D45',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '300px',
    overflowY: 'auto',
    marginRight: '30px',
    paddingLeft: '40px',
    width: '66.66%',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    background: 'linear-gradient(to right bottom,rgba(176, 150, 106, 0.8), rgba(226, 217, 200, 0.8) )',
    borderRadius: '20px',
    height: 350,
  },
  gridContainer: {
    paddingTop:'120px',
    paddingBottom:'100px',
    width: '90%',
    maxWidth: '1349px',
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      paddingTop:'20px',
      paddingBottom:'40px',
    },
  }
}));
