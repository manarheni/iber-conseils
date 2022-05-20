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
import { addOrder, editOrder } from '../../actions/orders.js';

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

export default function AddOrderModal(props) {

    const { order, post } = props;
    const classes = useStyles();
    const dispatch = useDispatch()
    const [newOrder, setNewOrder] = useState({name: '', phone: '', offerBanque: '', postId: ''});
    const [myfeedback, setMyfeedback] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if(order) {
            setNewOrder({name: order.name, phone: order.phone, offerBanque: order.offerBanque, postId: order.postId })
        } else {
            clear();
        }
    }, [order])

    const clear = () => {
        setNewOrder({name: '', phone: '', offerBanque: '', postId: ''});
    }
    
    const submitAdd = (e) => {
        e.preventDefault();
        if (order) {
            dispatch(editOrder(order._id, newOrder)).then(() => {
                setMyfeedback('Order Updated successfully !');
                clear();
            }).catch((err) => {
                setErrors(err.message);
            });
        } else {
            dispatch(addOrder(newOrder)).then(() => {
                setMyfeedback('Order Added successfully !');
                clear();
            }).catch((err) => {
                setErrors(err.message);
            })
        }
    }

    if (props.showAddOrder) {
        return (
            <div className="modal-container show">
                <div className="modal-box">
                    <div className="modal-content">
                        <div className="modal-header">
                                <h2>{order ? 'Edit ' : 'Add '} order</h2>
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
                            </Grid>           
                    </Grid>
                    <Grid container spacing={3} >
                        <Grid item xs={12}>
                            <div className="form-center">
                                <Button variant="contained"
                                            color="primary"
                                            className="mybtn"
                                            startIcon={<SaveIcon />}
                                            onClick={submitAdd}>
                                            {
                                                order ? 'Edit  ' : 'Add  '
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
