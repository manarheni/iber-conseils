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
import { CircularProgress } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { ListUsers } from '../../actions/users.js';
import { deletePost, getPosts, publicWaiting, topSwitch } from '../../actions/posts.js';
import AddPostModal from '../AddPostModal.js';
import moment from 'moment';
import PublicIcon from '@material-ui/icons/Public';
import BlockIcon from '@material-ui/icons/Block';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
  paper: {
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
    borderRadius: '20px',
    minHeight: '75vh',
  }
});

export default function Posts() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { posts, PostsIsLoading } = useSelector((state) => state.posts);
    const { users, UsersIsLoading } = useSelector((state) => state.users);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showAddPost, setShowAddPost] = useState(false);
    const [unPublicConfirmation, setUnPublicConfirmation] = useState(false);

    const data = {
        cities: [
            'Ariana',
            'Beja',
            'Ben Arous',
            'Bizert',
            'Gabes',
            'Nabeul',
            'Jendouba',
            'Kairouan',
            'Kasserine',
            'Kebili',
            'Kef',
            'Mahdia',
            'Manouba',
            'Medenine',
            'Monastir',
            'Gafsa',
            'Sfax',
            'Sidi Bouzid',
            'Siliana',
            'Sousse',
            'Tataouine',
            'Tozeur',
            'Tunis',
            'Zaghouan',
        ]
    }

    const selectEditPost = (post) => {
        setSelectedPost(post);
        setShowAddPost(true);
    }

    const handleCloseAddPost = () => {
        reloadData();
        setShowAddPost(false);
    }

    const handleOpenAddPost = () => {
        setSelectedPost(null);
        setShowAddPost(true);
    }

    const showDeleteConfirmation = (post) => {
        setSelectedPost(post);
        setShowConfirmation(true);
      }
  
    const handleDeletePost = () => {
        dispatch(deletePost(selectedPost._id)).then(() => {
            setShowConfirmation(false);
        })
    }

    // Public / Unpublic

    const showUnPublicConfirmation = (post) => {
        setSelectedPost(post);
        setUnPublicConfirmation(true);
    }

    const unPublic = () => {
        dispatch(publicWaiting({id: selectedPost._id , val: 'Waiting'}));
        setUnPublicConfirmation(false);
    }

    const publicPost = (id) => {
        dispatch(publicWaiting({id: id, val: 'Public'}));
    }

    const topPost = (id) => {
        dispatch(topSwitch({id, val: true}))
    }

    const noTopPost = (id) => {
        dispatch(topSwitch({id, val: false}))
    }

    const reloadData = () => {
        dispatch(getPosts());
        dispatch(ListUsers());
    }

    useEffect(() => {
        dispatch(getPosts());
        dispatch(ListUsers());
    }, [dispatch]);

   return (
    <Grid container >
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                    <div className="paper-content">
                    <TableContainer component={Paper}>
                    <div className="paper-header">
                        <h3 className="mytitle">List Posts</h3>
                        <div className="button-container">
                            <button onClick={() => handleOpenAddPost()}><AddCircleIcon /></button>
                        </div>
                    </div>
                    { PostsIsLoading || UsersIsLoading ? <span className="loading"><CircularProgress /></span> : null }
                    <Table className={classes.table} aria-label="simple table">
                    <TableHead className="custom-thead">
                        <TableRow>
                        <TableCell>Top</TableCell>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts?.map((post,index) => (
                        <TableRow key={index} className={post.status !== 'Public' ? 'client-row freezed' : 'client-row'} >
                            <TableCell> 
                            {
                                post.top ? (
                                    <StarIcon className="top-btn" onClick={() => noTopPost(post._id)} />
                                ) : (
                                    <StarBorderIcon className="top-btn" onClick={() => topPost(post._id)} />
                                )
                            } 
                            </TableCell>
                            <TableCell> <Avatar src={post?.photos[0]} alt="avatar" /> </TableCell>
                            <TableCell>{post?.title}</TableCell>
                            <TableCell>{post?.location}</TableCell>
                            <TableCell>{moment(post?.date).format('dddd DD/MM/yyyy')}</TableCell>
                            {/* <TableCell><span className='likes-cell'><FavoriteIcon />{post?.likes.lenght}</span></TableCell> */}
                            <TableCell><span className={post?.status === 'Waiting' ? 'status waiting' : post?.status === 'Public' ? 'status public' : 'status archived' }>{post?.status}</span></TableCell>
                            <TableCell className='table-actions'>
                            {
                                post?.status === 'Waiting' ? (
                                    <PublicIcon title='Publish' className='public-icon' onClick={() => publicPost(post._id)} />
                                    ) : post?.status === 'Publish' ? (
                                        <PublicIcon title='Publish' className='public-icon' onClick={() => publicPost(post._id)} />
                                    
                                    ) : post?.status === 'Public' ? (
                                    <BlockIcon title='Unpublish' className='unpublic-icon' onClick={() => showUnPublicConfirmation(post)} />
                                ) : null
                            }
                                <EditIcon className='edit-icon' onClick={() => selectEditPost(post)} />
                                <DeleteForeverIcon className='delete-icon' onClick={() => showDeleteConfirmation(post)} />
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                    <ConfirmModal
                        show={showConfirmation} 
                        qst="Are you sure to delete post ?"
                        title="Delete Post"
                        onConfirm={e => handleDeletePost(e)} 
                        onClose={() => {setShowConfirmation(false)}}>
                    </ConfirmModal>
                    <ConfirmModal
                        show={unPublicConfirmation} 
                        qst="Are you sure to unpublic post ?"
                        title="Unpublic Post"
                        onConfirm={e => unPublic(e)} 
                        onClose={() => {setUnPublicConfirmation(false)}}>
                    </ConfirmModal>
                </TableContainer>
                    </div>
                    <AddPostModal onClose={e => handleCloseAddPost(e)} show={showAddPost} post={selectedPost} users={users} data={data} />
            </Paper>
        </Grid>
    </Grid>
        
    );
}
