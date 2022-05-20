import React, { useState } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import { Button, FormControl, Grid, Grow, TextField } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { addOrder } from '../../actions/orders';
import { useDispatch } from 'react-redux';
import MessageBox from '../Dashbord/MessageBox.js';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


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

export default function AddReservationModal(props) {

 
    const { showAddOrder, post } = props;
    const [newOrder, setNewOrder] = useState({name: '', phone: '', offerBanque: '', postId: post?._id});
    const classes = useStyles();
    const dispatch = useDispatch();
    const [myfeedback, setMyfeedback] = useState(null);
    const [errors, setErrors] = useState(null);

    const submitAdd = (e) => {
        e.preventDefault();
            dispatch(addOrder(newOrder)).then(() => {
                setMyfeedback('Order Added successfully !');
                clear();
            }).catch((err) => {
                setErrors(err.message);
            })
            console.log(newOrder)
    }

    const clear = () => {
        setNewOrder({name: '', phone: '', offerBanque: '', postId: ''});
    }

    if (!showAddOrder) return null

    return (
        <Grow in>
            <div className='addmodal-container'>
                <div className='addmodal-content reservation'>
                    <CancelIcon className="close-btn" onClick={props.onClose} />
                    <div className="modal-header">
                        <h2> Réserver</h2>
                    </div>
                    <div className="form-center">
                            <form className={classes.root} noValidate autoComplete="off">

                                <h4>{post?.title}</h4>

                                <TextField type="text" label="Name" variant="outlined" 
                                    onChange={e => setNewOrder({...newOrder, name: e.target.value})} 
                                    value={newOrder.name} />

                                <TextField type="text" label="phone" variant="outlined" 
                                    onChange={e => setNewOrder({...newOrder, phone: e.target.value})} 
                                    value={newOrder.phone}  />

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="offerBanque-select">Offer Banque</InputLabel>
                                        <Select
                                        native
                                        
                                        value={newOrder.offerBanque}
                                        onChange={e => setNewOrder({...newOrder, offerBanque: e.target.value})}
                                        inputProps={{
                                            name: 'offerBanque',
                                            id: 'offerBanque-select',
                                        }}
                                        >
                                            <option value={'Selectionner une offre'}>Selectionner une offre</option>
                                            <option value={'ATTIJARI'}>ATTIJARI</option>
                                            <option value={'BIAT'}>BIAT</option>
                                            <option value={'STB'}>STB</option>
                                            <option value={'BH'}>BH</option>
                                        </Select>
                                </FormControl>    

                            </form>
                                </div>
                                <Grid container spacing={3} >
                                    <Grid item xs={12}>
                                        <div className="form-center">
                                            <Button variant="contained"
                                                color="primary"
                                                className="mybtn"
                                                startIcon={<SaveIcon />}
                                                onClick={submitAdd}>
                                                    Réserver
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
        </Grow>
    )
}
