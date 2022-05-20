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
import Grid from '@material-ui/core/Grid';
import { getPublicPosts, postsArchived, publicWaiting, topSwitch } from '../../actions/posts.js';
import moment from 'moment';
import { CardMedia } from '@material-ui/core/';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import BlockIcon from '@material-ui/icons/Block';
import ArchiveIcon from '@material-ui/icons/Archive';

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
    const { posts, PostsIsLoading } = useSelector((state) => state.posts);
    const [unPublicConfirmation, setUnPublicConfirmation] = useState(false);
    const [showArchiveConfirmation, setShowArchiveConfirmation] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const formData = {
        status: "Waiting",
    };

    // UNPUBLIC POST

    const showUnPublicConfirmation = (post) => {
        setSelectedPost(post)
        setUnPublicConfirmation(true);
    }

    const unPublic = () => {
        dispatch(publicWaiting(selectedPost._id , formData));
        setUnPublicConfirmation(false);
    }

    // ARCHIVE POST

    const handleArchiveConfirmation = (post) => {
        setSelectedPost(post)
        setShowArchiveConfirmation(true)
    }

    const handleArchivePost = () => {
        dispatch(postsArchived(selectedPost._id));
        setShowArchiveConfirmation(false);
    }

    // TOP / UNTOP

    const topPost = (id) => {
        dispatch(topSwitch(id, {val: true}))
    }

    const noTopPost = (id) => {
        dispatch(topSwitch(id, {val: false}))
    }

    useEffect(() => {
        dispatch(getPublicPosts());
    }, [dispatch]);

    if (PostsIsLoading) return (<div className="flex" style={{height: '100%'}}><img src="/images/admin-loading.gif" alt="Loading" className="admin-loading" /></div>)
    if (!posts && !PostsIsLoading) return <span className="no-post">Aucune publication trouvé</span>

   return (
    <Grid container className={classes.container} >
        <Grid item xs={12} className={classes.container}>
            <Paper className={classes.paper}>
                <div className="paper-content">
                    <TableContainer component={Paper} className={classes.container}>
                        <div className="paper-header home-section">
                            <h3 className="mytitle">Publications Public </h3>
                        </div>
                        <Table className={classes.table} aria-label="simple table">
                        <TableHead className="custom-thead">
                            <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Creator</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="table-body">
                            {posts?.map((post) => (
                            <TableRow key={post?._id} 
                                className={selectedPost?._id === post._id ? 'mytablerow active' : 'mytablerow'} 
                                onClick={() => setSelectedPost(post)}>
                                <TableCell>{moment(post?.createdAt).format('DD/MM/YY')}</TableCell>
                                <TableCell><CardMedia className="admin-media" image={post?.photos[0] || 'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png'} title={post.title} /></TableCell>
                                <TableCell>{post?.title} </TableCell>
                                <TableCell>{post?.creator?.name}</TableCell>
                                <TableCell><span className="post-status">{post?.status}</span></TableCell>
                                <TableCell className='table-actions'>
                                    {
                                        post.top ? (
                                            <StarIcon className="top-btn" onClick={() => noTopPost(post._id)} />
                                        ) : (
                                            <StarBorderIcon className="top-btn" onClick={() => topPost(post._id)} />
                                        )
                                    } 
                                    <BlockIcon className='public-icon' onClick={() => showUnPublicConfirmation(post)} />
                                    <ArchiveIcon style={{color:"#cfd8dc"}} onClick={() => handleArchiveConfirmation(post)} />
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                        <ConfirmModal
                            show={unPublicConfirmation} 
                            qst="Are you sure to unpublic post ?"
                            title="Unpublic Post"
                            onConfirm={e => unPublic(e)} 
                            onClose={() => {setUnPublicConfirmation(false)}}>
                        </ConfirmModal>
                         <ConfirmModal
                            show={showArchiveConfirmation} 
                            qst="Vous ête sure d'archiver cette publication ?"
                            title="Archive Post"
                            onConfirm={e => handleArchivePost(e)} 
                            onClose={() => {setShowArchiveConfirmation(false)}}>
                        </ConfirmModal>
                    </TableContainer>
                </div>
            </Paper>
        </Grid>
    </Grid>
        
    );
}
