import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { useHistory } from 'react-router-dom';
import { resetPassword } from '../../actions/auth';
import useStyles from './styles';
import Input from './Input';
import Alert from '@material-ui/lab/Alert';
import { useLocation } from 'react-router-dom';

const initialState = { password: '', confirmPassword: '', token: '' };

const Reset = () => {
  const location = useLocation();
  const token = location.search?.split('en=')[1];
  const { error } = useSelector(state => state.auth)
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if (token) {
            setForm({ ...form, token: token });
        }
    }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password === form.confirmPassword) {
         dispatch(resetPassword(form, history));
    } else {
        setFeedback('Passwords do not match');
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  console.log(token);

  return (
    <div className={classes.authContainer}>
      <div className="overlay">
        <div className={classes.authPaper} elevation={6} >
          <img className={classes.avatar} src="/images/logo.png" alt="Logo" />
          <Typography component="h1" variant="h5">Réinitialisation de mot de passe</Typography>
          <form className={classes.form} onSubmit={handleSubmit} >
            <Grid container spacing={2} className="eye-btn">
              <Input name="password" label="Nouvelle Mot de passe" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              <Input name="confirmPassword" label="Répéter le mot de passe" handleChange={handleChange} type="password" />
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Modifier
            </Button>
            <p className="auth-feedback">{feedback}</p>
          </form>
        </div>
      </div>
      <Snackbar open={error} autoHideDuration={4000}>
        <Alert severity="danger">
         Une erreur est survenue.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Reset;
