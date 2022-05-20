import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Fade from '@material-ui/core/Fade';
import { Grid, Typography } from '@material-ui/core';
import Post from '../Posts/Post/Post';
import { getMyPosts } from '../../actions/posts';
import useStyles from './styles';

const UserPosts = () => {
  const dispatch =  useDispatch();
  const { posts, PostsIsLoading } = useSelector((state) => state.posts);
  const userId = JSON.parse(localStorage.getItem('profile'))?.result?._id
  const classes = useStyles();

  useEffect(() => {
    if (userId) {
      dispatch(getMyPosts(userId));
    }
  }, [dispatch, userId]);

  const userPosts = posts?.filter(post => post.creator === userId)

  return (
    <Fade in>
      <div className={classes.myContainer}>
        <div className={classes.card}>
          <div className={classes.imageSection}>
            <img className={classes.media} src={ '/images/intro-background.jpg' } alt="BG" />
            <div className="post-overlay">
              <div className="flex between">
                <Typography variant="h3" component="h2">Mes publications </Typography>
              </div>
            </div>
          </div>
       </div>
        <Grid container alignItems="stretch" spacing={3} className={classes.gridContainer}>
          { PostsIsLoading ? <div className="loading-container"> <img src="/images/loading.gif" alt="loading" className="posts-loading" /></div> : ( null ) }
          { userPosts?.map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={4}>
                  <Post post={post} />
                </Grid>
          ))}
          {!posts.length && !PostsIsLoading && 'No posts'}
          </Grid>
      </div>
    </Fade>
  );
};

export default UserPosts;
