import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmModal from './ConfirmModal.js';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import { deleteOrder, listOrders } from '../../actions/orders.js';
import AddOrderModal from './AddOrderModal.js';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles({
  container: {
    background: 'none',
    boxShadow: 'none',
  },
  table: {
    minWidth: '100%',
  },
  paper: {
      boxShadow: 'none',
      background: 'none',
  }
});

export default function Order(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { orders, OrdersIsLoading } = useSelector((state) => state.orders);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showAddOrder, setShowAddOrder] = useState(false);
    const { post } = useSelector((state) => state.posts);
    const selectEditOrder = (order) => {
        setSelectedOrder(order);
        setShowAddOrder(true);
    }

    const handleCloseAddOrder = () => {
        reloadData();
        setShowAddOrder(false);
    }

    const handleOpenAddOrder = () => {
        setSelectedOrder(null);
        setShowAddOrder(true);
    }

    const showDeleteConfirmation = (order) => {
        setSelectedOrder(order);
        setShowConfirmation(true);
      }
  
    const handleDeleteOrder = () => {
        dispatch(deleteOrder(selectedOrder._id)).then(() => {
            setShowConfirmation(false);
        })
    }

    const reloadData = () => {
        dispatch(listOrders());
    }

    useEffect(() => {
        dispatch(listOrders());
    }, [dispatch]);

    if (OrdersIsLoading) return (<div className="flex" style={{height: '100%'}}><img src="/images/admin-loading.gif" alt="Loading" className="admin-loading" /></div>)
    if (!orders && !OrdersIsLoading) return <span className="no-post">Aucun réservation trouvé</span>

   return (
    <Grid container className={classes.container} >
        <Grid item xs={12} className={classes.container}>
            <Paper className={classes.paper}>
                <div className="paper-content">
                    <TableContainer component={Paper} className={classes.container}>
                        <div className="paper-header home-section">
                            <h3 className="mytitle">Réservation </h3>
                            {/* <div className="button-container">
                                <button onClick={() => handleOpenAddOrder()}><AddCircleIcon /></button>
                            </div> */}
                        </div>
                        <Table className={classes.table} aria-label="simple table">
                        <TableHead className="custom-thead">
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Offre banque</TableCell>
                                <TableCell>Post</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="table-body">
                            {orders?.map((order) => (
                                <TableRow key={order?._id} 
                                    className={selectedOrder?._id === order?._id ? 'mytablerow active' : 'mytablerow'} 
                                    onClick={() => setSelectedOrder(order)}>
                                    <TableCell>{order?.name}</TableCell>
                                    <TableCell>{order?.phone}</TableCell>
                                    <TableCell>{order?.offerBanque}</TableCell>
                                    <TableCell>{order?.postId?.title}</TableCell>
                                    <TableCell className='table-actions'>
                                        <EditIcon className='edit-icon' onClick={() => selectEditOrder(order)} />
                                        <DeleteForeverIcon className='delete-icon' onClick={() => showDeleteConfirmation(order)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                        <ConfirmModal
                            show={showConfirmation} 
                            qst="Are you sure to delete order ?"
                            title="Delete Order"
                            onConfirm={e => handleDeleteOrder(e)} 
                            onClose={() => {setShowConfirmation(false)}}>
                        </ConfirmModal>
                    </TableContainer>
                </div>
                <AddOrderModal onClose={e => handleCloseAddOrder(e)} showAddOrder={showAddOrder} order={selectedOrder} post={post}/>
            </Paper>
        </Grid>
    </Grid>
        
    );
}