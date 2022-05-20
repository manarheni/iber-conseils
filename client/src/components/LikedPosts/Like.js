import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../Posts/Post/Post';
import { getLikedPosts } from '../../actions/posts';

const Like = () => {
  const userId = JSON.parse(localStorage.getItem('profile'))?.result?._id
  const dispatch =  useDispatch();
  const { posts, PostsIsLoading } = useSelector((state) => state.posts);
  let likedPosts = [];

  useEffect(() => {
    dispatch(getLikedPosts(userId));
  }, [dispatch, userId]);

  likedPosts = posts?.filter(post => post?.likes?.find(id => id === userId))

  return (
    
    PostsIsLoading ? <div className="loading-container"> <img src="/images/loading.gif" alt="loading" className="posts-loading" /> {/* <CircularProgress className="loading" /> */}</div> 
    : ( likedPosts?.map((post) => (
      <Grid key={post?._id} item xs={12} sm={6} md={4} lg={4}>
        <Post post={post} />
        {!posts?.length && !PostsIsLoading && 'No posts'}
      </Grid>
    ))
    )
  );
};

export default Like;
