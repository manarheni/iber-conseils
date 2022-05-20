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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import { DeleteUser, ListUsers } from '../../actions/users.js';
import AddUserModal from './AddUserModal.js';
import { Avatar } from '@material-ui/core';

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

export default function PublicPosts(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { users, UsersIsLoading } = useSelector((state) => state.users);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAddUser, setShowAddUser] = useState(false);

    const selectEditUser = (user) => {
        setSelectedUser(user);
        setShowAddUser(true);
    }

    const handleCloseAddUser = () => {
        reloadData();
        setShowAddUser(false);
    }

    const handleOpenAddUser = () => {
        setSelectedUser(null);
        setShowAddUser(true);
    }

    const showDeleteConfirmation = (user) => {
        setSelectedUser(user);
        setShowConfirmation(true);
      }
  
    const handleDeleteUser = () => {
        dispatch(DeleteUser(selectedUser._id)).then(() => {
            setShowConfirmation(false);
        })
    }

    const reloadData = () => {
        dispatch(ListUsers());
    }

    useEffect(() => {
        dispatch(ListUsers());
    }, [dispatch]);

    if (UsersIsLoading) return (<div className="flex" style={{height: '100%'}}><img src="/images/admin-loading.gif" alt="Loading" className="admin-loading" /></div>)
    if (!users && !UsersIsLoading) return <span className="no-post">Aucun user trouvé</span>

   return (
    <Grid container className={classes.container} >
        <Grid item xs={12} className={classes.container}>
            <Paper className={classes.paper}>
                <div className="paper-content">
                    <TableContainer component={Paper} className={classes.container}>
                        <div className="paper-header home-section">
                            <h3 className="mytitle">Utilisateurs </h3>
                            <div className="button-container">
                                <button onClick={() => handleOpenAddUser()}><AddCircleIcon /></button>
                            </div>
                        </div>
                        <Table className={classes.table} aria-label="simple table">
                        <TableHead className="custom-thead">
                            <TableRow>
                                <TableCell>Avatar</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="table-body">
                            {users?.map((user) => (
                                <TableRow key={user?._id} 
                                    className={selectedUser?._id === user?._id ? 'mytablerow active' : 'mytablerow'} 
                                    onClick={() => setSelectedUser(user)}>
                                    <TableCell> <Avatar src={user?.avatar} alt="avatar" /> </TableCell>
                                    <TableCell>{user?.name}</TableCell>
                                    <TableCell>{user?.email}</TableCell>
                                    <TableCell>{user?.role}</TableCell>
                                    <TableCell className='table-actions'>
                                        <EditIcon className='edit-icon' onClick={() => selectEditUser(user)} />
                                        <DeleteForeverIcon className='delete-icon' onClick={() => showDeleteConfirmation(user)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                        <ConfirmModal
                            show={showConfirmation} 
                            qst="Are you sure to delete user ?"
                            title="Delete User"
                            onConfirm={e => handleDeleteUser(e)} 
                            onClose={() => {setShowConfirmation(false)}}>
                        </ConfirmModal>
                    </TableContainer>
                </div>
                <AddUserModal onClose={e => handleCloseAddUser(e)} showAddUser={showAddUser} user={selectedUser} />
            </Paper>
        </Grid>
    </Grid>
        
    );
}