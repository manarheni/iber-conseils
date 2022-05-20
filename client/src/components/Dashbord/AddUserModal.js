import React, { useEffect, useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MessageBox from './MessageBox.js';
import { AddUser, EditUser } from '../../actions/users.js';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
      },
      formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
      },
      selectEmpty: {
      marginTop: theme.spacing(2),
      },
      inputUpload: {
          display: 'none',
      },
    },
  }));

export default function AddUserModal(props) {

    const { user } = props;
    const classes = useStyles();
    const dispatch = useDispatch()
    const [newUser, setNewUser] = useState({name: '', email: '', phone: '', password: '', role: 'client'});
    const [myfeedback, setMyfeedback] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if(user) {
            setNewUser({name: user.name, email: user.email, phone: user.phone, password: '', role: user.role})
        } else {
            clear();
        }
    }, [user])

    const clear = () => {
        setNewUser({name: '', email: '', phone: '', password: '', role: 'client'});
    }
    
    const submitEdit = (e) => {
        e.preventDefault();
        if (user) {
            dispatch(EditUser(user._id, newUser)).then(() => {
                setMyfeedback('User Updated successfully !');
                clear();
            }).catch((err) => {
                setErrors(err.message);
            });
        } else {
            if (!newUser.password || newUser.password === '' || newUser.password.length < 8 ) {
                setErrors('Password lenght less than 8 !');
                return;
            }
            dispatch(AddUser(newUser)).then(() => {
                setMyfeedback('User Added successfully !');
                clear();
            }).catch((err) => {
                setErrors(err.message);
            })
        }
    }

    if (props.showAddUser) {
        return (
            <div className="modal-container show">
                <div className="modal-box">
                    <div className="modal-content">
                        <div className="modal-header">
                                <h2>{user ? 'Edit ' : 'Add '} User</h2>
                                <button id="close-modal" onClick={props.onClose} >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                        </div>
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <div className="form-center">
                                    <form  className={classes.root} noValidate autoComplete="off">
                                        
                                        <TextField type="text" label="Name" variant="outlined" 
                                            onChange={e => setNewUser({...newUser, name: e.target.value})} 
                                            value={newUser.name} />

                                        <TextField type="email" label="Email" variant="outlined" 
                                            onChange={e => setNewUser({...newUser, email: e.target.value})} 
                                            value={newUser.email}  />
            
                                        <TextField type="password" label="Password" variant="outlined" 
                                            onChange={e => setNewUser({...newUser, password: e.target.value})} 
                                            value={newUser.password} />
            
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="roles-select">User Type</InputLabel>
                                            <Select
                                            native
                                            value={newUser.role}
                                            onChange={e => setNewUser({...newUser, role: e.target.value})}
                                            inputProps={{
                                                name: 'roles',
                                                id: 'roles-select',
                                            }}
                                            >
                                            <option value={'client'}>Client</option>
                                            <option value={'lawyer'}>Avocat</option>
                                            <option value={'company'}>Société</option>
                                            <option value={'admin'}>Admin</option>
                                            </Select>
                                        </FormControl>
                                    
                                    </form>
                                </div>
                            </Grid>           
                    </Grid>
                    <Grid container spacing={3} >
                        <Grid item xs={12}>
                            <div className="form-center">
                                <Button variant="contained"
                                            color="primary"
                                            className="mybtn"
                                            startIcon={<SaveIcon />}
                                            onClick={submitEdit}>
                                            {
                                                user ? 'Edit  ' : 'Add  '
                                            }
                                </Button>
                            </div>
                            {
                                myfeedback && myfeedback !== '' ? (
                                    <MessageBox>{myfeedback}</MessageBox>
                                ) : errors ? (
                                    <MessageBox variant='danger'>{errors}</MessageBox>
                                ) : ( '' )
                            }
                        </Grid>
                    </Grid>
                    </div>
                </div>
        </div>)
    } else {
        return null
    }
        
}
