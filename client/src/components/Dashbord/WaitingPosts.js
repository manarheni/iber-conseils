import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { useDispatch, useSelector } from "react-redux"
import ConfirmModal from "./ConfirmModal.js"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import Grid from "@material-ui/core/Grid"
import { deletePost, getWaitingPosts } from "../../actions/posts.js"
import moment from "moment"
import { CardMedia } from "@material-ui/core/"
import { Pagination } from "@material-ui/lab"

const useStyles = makeStyles({
  container: {
    background: "none",
    boxShadow: "none",
  },
  table: {
    minWidth: "100%",
  },
  paper: {
    boxShadow: "none",
    background: "none",
  },
})

export default function WaitingPosts(props) {
  const { selectedPost } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const { posts, PostsIsLoading } = useSelector((state) => state.posts)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // pagination
  const [totalPages, setTotalPages] = useState(0)
  const [selectedPage, setSelectedPage] = useState(0)

  const showDeleteConfirmation = (post) => {
    props.onSelect(post)
    setShowConfirmation(true)
  }

  const handleDeletePost = () => {
    dispatch(deletePost(selectedPost._id))
    setShowConfirmation(false)
  }

  useEffect(() => {
    dispatch(getWaitingPosts(selectedPage)).then((headers) =>
      setTotalPages(parseInt(headers["x-pagination-count"]))
    )
  }, [selectedPage])

  if (PostsIsLoading)
    return (
      <div className="flex" style={{ height: "100%" }}>
        <img
          src="/images/admin-loading.gif"
          alt="Loading"
          className="admin-loading"
        />
      </div>
    )
  if (!posts && !PostsIsLoading)
    return <span className="no-post">Aucune publication trouvé</span>

  {
    /* //! ------------- Return ----------------- */
  }
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.container}>
        <Paper className={classes.paper}>
          <div className="paper-content">
            <TableContainer component={Paper} className={classes.container}>
              {aboveTable()}
              <Table className={classes.table} aria-label="simple table">
                {tableHeader()}
                {tableBody()}
              </Table>
              <ConfirmModal
                show={showConfirmation}
                qst="Are you sure to delete post ?"
                title="Delete Post"
                onConfirm={(e) => handleDeletePost(e)}
                onClose={() => {
                  setShowConfirmation(false)
                }}
              ></ConfirmModal>
              {pagination()}
            </TableContainer>
          </div>
        </Paper>
      </Grid>
    </Grid>
  )

  function pagination() {
    return <Pagination
      style={{
        // backgroundColor: '#fff',
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        padding: "30px",
      }}
      color="primary" 
      page={selectedPage + 1}
      count={totalPages}
      onChange={(e, page) => setSelectedPage(page - 1)} />
  }

  function tableBody() {
    return (
      <TableBody className="table-body">
        {posts.length &&
          posts?.map((post) => (
            <TableRow
              key={post?._id}
              className={
                selectedPost?._id === post._id
                  ? "mytablerow active"
                  : "mytablerow"
              }
              onClick={() => props.onSelect(post)}
            >
              <TableCell>
                {moment(post?.createdAt).format("DD/MM/YY")}
              </TableCell>
              <TableCell>
                <CardMedia
                  className="admin-media"
                  image={
                    post?.photos?.[0] ||
                    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                  }
                  title={post.title}
                />
              </TableCell>
              <TableCell>{post?.title}</TableCell>
              <TableCell>{post?.creator?.name}</TableCell>
              <TableCell>
                <span className="post-status">{post?.status}</span>
              </TableCell>
              <TableCell className="table-actions">
                <DeleteForeverIcon
                  className="delete-icon"
                  onClick={() => showDeleteConfirmation(post)}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    )
  }

  function aboveTable() {
    return (
      <div className="paper-header home-section">
        <h3 className="mytitle">Publications en attente </h3>
        <div className="button-container">
          {/* <button onClick={() => handleOpenAddPost()}><AddCircleIcon /></button> */}
        </div>
      </div>
    )
  }

  function tableHeader() {
    return (
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
    )
  }
}
