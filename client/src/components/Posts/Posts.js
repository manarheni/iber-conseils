import React, { useCallback, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post/Post";
import { getPosts } from "../../actions/posts";

const Posts = (props) => {

  //problem is here ! in filter attribute
  const { filter } = props;
   //problem is here ! in filter attribute ! always null
  const dispatch = useDispatch();
  const { posts, PostsIsLoading } = useSelector((state) => state.posts);
  const [filtredPosts, setFiltredPosts] = useState([]);

  // const filterPosts = useCallback(() => {
  //   setFiltredPosts(posts);
  //   if (!filter.achat) {
  //     console.log("filter.achat" ,filter.achat)
  //     setFiltredPosts(filtredPosts.filter((p) => p.type !== "Achat"));
  //   }
  //   if (!filter.location) {
  //     setFiltredPosts(filtredPosts.filter((p) => p.type !== "Location"));
  //   }
  //   if (!filter.terrain) {
  //     setFiltredPosts(filtredPosts.filter((p) => p.category !== "Terrain"));
  //   }
  //   if (!filter.appartement) {
  //     setFiltredPosts(filtredPosts.filter((p) => p.category !== "Appartement"));
  //   }
  //   if (!filter.villa) {
  //     setFiltredPosts(filtredPosts.filter((p) => p.category !== "Villa"));
  //   }
  //   if (!filter.achatBureau) {
  //     setFiltredPosts(
  //       filtredPosts.filter((p) => p.category !== "Achat Bureau")
  //     );
  //   }
  //   if (!filter.achatFond) {
  //     setFiltredPosts(filtredPosts.filter((p) => p.category !== "Achat Fond"));
  //   }
  //   if (!filter.locationBureau) {
  //     setFiltredPosts(
  //       filtredPosts.filter((p) => p.category !== "Location Bureau")
  //     );
  //   }
  //   if (!filter.locationLocal) {
  //     setFiltredPosts(
  //       filtredPosts.filter((p) => p.category !== "Location Local")
  //     );
  //   }
  //   if (!filter.locationFond) {
  //     setFiltredPosts(
  //       filtredPosts.filter((p) => p.category !== "Location Fond")
  //     );
  //   }
  //   // eslint-disable-next-line
  // }, [filter, posts]);

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (posts.length > 0) {
  //     setFiltredPosts(posts);
  //   }
  // }, [posts]);

  // useEffect(() => {
  //   if (filter && posts) {
  //     filterPosts();
  //   }
  //   // eslint-disable-next-line
  // }, [filter, posts]);

  return PostsIsLoading ? (
    <div className="loading-container">
      {" "}
      <img src="/images/loading.gif" alt="loading" className="posts-loading" />
    </div>
  ) : (
    filter?.map((post) => (
      <Grid key={post._id} item xs={12} sm={6} md={4} lg={4}>
        <Post post={post} />
      </Grid>
    ))
  )
};

export default Posts;
