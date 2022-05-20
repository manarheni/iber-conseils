import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  authContainer: {
    backgroundImage: "url(/images/auth-bg.jpg)",
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    width: "100vw",
    minHeight: "100vh",
    padding: '80px 0 40px',
  },
  authPaper: {
    textAlign: 'center',
    padding: "25px",
    width: "90%",
    maxWidth: "400px",
    margin: '0 auto',
    background: "rgba(255, 255, 255, 0.85)",
    borderRadius: "20px",

  },
  avatar: {
    display: 'block',
    margin: "0 auto 20px",
    width: '100px',

  },
  form: {
    display: "block",
    width: '100%', // Fix IE 11 issue.
    marginTop: "20px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
  hasAccount: {
    color: "#444",
    background: 'none',
    border: 'none',
    boxShadow: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 165,
  },
}));
