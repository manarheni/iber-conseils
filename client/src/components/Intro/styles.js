import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  intro: {
    width: '100vw',
    height: '100vh',
    backgroundImage: "url('/images/intro-background.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      height: 'auto',
    },
  },
  overlay: {
      width: '100%',
      height: '100%',
      background: "rgba(0, 0, 0, 0.7)",
      position: 'absolute',
      top: '0',
      left: '0',
      paddingTop: '150px',
      [theme.breakpoints.down('xs')]: {
        position: 'static',
        top: 'initial',
        left: 'initial',
        paddingTop: '100px',
        paddingBottom: '40px',
      },
  },
  heading1: {
      color: "#fff",
      fontSize: '4rem',
      textAlign: 'center',
  },
  heading2: {
    color: "#B6A281",
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '20px',
},
introDesc: {
  width: '90%',
  maxWidth: '1349px',
  margin: '0 auto 40px',
  '& p': {
    color: '#FFF',
    fontSize: '1.2rem',
  }
},
filterTitle: {
  fontSize: '1.4rem',
  color: '#CCC',
  marginBottom: '20px',
  [theme.breakpoints.down('xs')]: {
    paddingLeft: '5%',
  },
},
formGroup: {
  justifyContent: 'center',
}
}));
