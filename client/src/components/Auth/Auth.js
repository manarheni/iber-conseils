import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
// import { GoogleLogin } from 'react-google-login';
import { signin, signup, forgotPassword } from "../../actions/auth";
// import { AUTH } from '../../constants/actionTypes';
import useStyles from "./styles";
import Input from "./Input";
import Alert from "@material-ui/lab/Alert";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  password: "",
  confirmPassword: "",
  googleRequest: false,
};

const SignUp = () => {
  const { error } = useSelector((state) => state.auth);
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const [feedback, setFeedback] = useState(false);
  const [role, setRole] = useState("");

  const selectHandleChange = (event) => {
    setRole(event.target.value);
  };

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (forgotPasswordMode) {
      dispatch(forgotPassword(form));
      setFeedback(true);
    } else {
      if (isSignup) {
        dispatch(signup(form, history));
      } else {
        dispatch(signin(form, history));
      }
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        history.push("/");
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
    // eslint-disable-next-line
  }, []);

  /* 
  
    const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    // console.log(result);
    // dispatch(signup({firstName: result.givenName, lastName: result.familyName, email: result.email, password: '00000000', confirmPassword: '00000000', googleRequest: true}, history));
   
    try {
      dispatch({ type: AUTH, data: { result, token } });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later'); 
  
  */

  // console.log(error)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes.authContainer}>
      <div>
        <div className={classes.authPaper} elevation={6}>
          <img className={classes.avatar} src="/images/logo.png" alt="Logo" />
          <Typography component="h1" variant="h5">
            {forgotPasswordMode
              ? "Récupération de mot de passe"
              : isSignup
              ? "S'enregistrer"
              : "S'identifier"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2} className="eye-btn">
              {!forgotPasswordMode && isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="Prénom"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Nom"
                    handleChange={handleChange}
                    half
                  />
                  <Input
                    name="phone"
                    label="Téléphone"
                    handleChange={handleChange}
                    half
                  />
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    half
                  >
                    <InputLabel id="role-id">Role *</InputLabel>
                    <Select
                      labelId="role-id"
                      id="role"
                      name="role"
                      value={role}
                      onChange={(e) => {
                        handleChange(e);
                        selectHandleChange(e);
                      }}
                      label="Role"
                    >
                      <option value={"client"}>Client</option>
                      <option value={"lawyer"}>Avocat</option>
                      <option value={"company"}>Société</option>
                    </Select>
                  </FormControl>
                </>
              )}
              <Input
                name="email"
                label="Addresse email"
                handleChange={handleChange}
                type="email"
              />
              {!forgotPasswordMode && (
                <Input
                  name="password"
                  label="Mot de passe"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />
              )}
              {!forgotPasswordMode && isSignup && (
                <Input
                  name="confirmPassword"
                  label="Répéter le mot de passe"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {forgotPasswordMode
                ? "Récupérer"
                : isSignup
                ? "S'enregistrer"
                : "S'identifier"}
            </Button>
            <p className="auth-feedback">{error}</p>
            {forgotPasswordMode && (
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setForgotPasswordMode(false);
                }}
              >
                Annuler
              </Button>
            )}
            {/* 667200709948-onuaujmb61t1fmqiduod15580f66u4c2.apps.googleusercontent.com */}
            {/* 564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com */}
            {/* <GoogleLogin
              clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            /> */}
            <p className="auth-feedback"></p>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {!isSignup && !forgotPasswordMode && (
                  <Button
                    onClick={() => setForgotPasswordMode(true)}
                    className={classes.hasAccount}
                  >
                    Mot de passe oublié ?
                  </Button>
                )}
                {!forgotPasswordMode && (
                  <Button onClick={switchMode} className={classes.hasAccount}>
                    {isSignup
                      ? "Vous avez déjà un compte? S'identifier"
                      : "Vous n'avez pas de compte ? S'inscrire"}
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      <Snackbar
        open={feedback}
        autoHideDuration={4000}
        onClose={() => setFeedback(false)}
      >
        <Alert onClose={() => setFeedback(false)} severity="success">
          Un email de récupération a été envoyé à votre adresse email!
        </Alert>
        {console.log(role)}
        {console.log(form)}
      </Snackbar>
    </div>
  );
};

export default SignUp;
