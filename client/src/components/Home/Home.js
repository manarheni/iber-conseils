import React, { useEffect, useState } from "react"
import { Container, Grid } from "@material-ui/core"
import Fade from "@material-ui/core/Fade"
import Posts from "../Posts/Posts"
import useStyles from "./styles"
import Intro from "../Intro/Intro"
import { useDispatch, useSelector } from "react-redux"

import { Pagination } from "@material-ui/lab"
import { FilterPosts } from "./../../actions/posts"

const Home = (props) => {
  const { data } = props
  const { posts } = useSelector((state) => state.posts)
  const dispatch = useDispatch()

  const classes = useStyles()
  const [selectedPage, setSelectedPage] = useState(0)

  const [filterData, setFilterData] = useState({
    achat: true,
    location: true,
    terrain: true,
    appartement: true,
    villa: true,
    achatBureau: true,
    achatFond: true,
    locationBureau: true,
    locationLocal: true,
    locationFond: true,
    title: "",
    adress: "",
    city: "",
  })

  // pagination
  const [totalPages, setTotalPages] = useState(0)

  const fetchFilteredPosts = () => {
    const timer = setTimeout(() => {
      dispatch(FilterPosts({ ...filterData, selectedPage: selectedPage })).then(
        (headers) => setTotalPages(parseInt(headers["x-pagination-count"]))
      )
    }, 1000)
    return () => clearTimeout(timer)
  }

  useEffect(() => {
    setSelectedPage(0)
    fetchFilteredPosts()
  }, [filterData])

  useEffect(() => {
     fetchFilteredPosts()
  }, [selectedPage])
  return (
    <Fade in>
      <Container className={classes.myContainer} maxWidth="xl">
        <Intro
          data={data}
          setFilterData={setFilterData}
          filterData={filterData}
        />
        <div className="section-title">
          <h2>{data.exploreTitle}</h2>
          <p>{data.exploreParag}</p>
        </div>
        <div
          id="appPosts"
          className={
            data.lang === "ar" ? "title-container reverse" : "title-container"
          }
        >
          <h3>{data.sort}&nbsp;:</h3>
          <div className="actions">
            <select id="sort">
              <option value="date">{data.date}</option>
              <option value="rating">{data.rating}</option>
              <option value="price">{data.price}</option>
            </select>
          </div>
        </div>
        <Grid
          container
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Posts filter={posts} />
        </Grid>
        <Pagination
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "auto",
            padding: "30px",
          }}
      color="primary" 

          // page={filterData.selectedPage }
          count={totalPages}
          onChange={(e, page) => setSelectedPage(page - 1)}
        />
      </Container>
    </Fade>
  )
}

export default Home
