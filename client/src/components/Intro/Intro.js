import React, { useEffect, useState } from "react"
import useStyles from "./styles"

import SearchIcon from "@material-ui/icons/Search"
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  withStyles,
} from "@material-ui/core"

const GreenCheckbox = withStyles({
  root: {
    color: "#AC9266",
    "&$checked": {
      color: "#AC9266",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />)

const Intro = (props) => {

  const classes = useStyles()
  const { data, filterData, setFilterData } = props

  

  

  const handleChange = (event) => {
    setFilterData({ ...filterData, [event.target.name]: event.target.checked })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    props.setFilter(filterData)
  }

  {
    /* //! ------------- Return ----------------- */
  }
  return (
    <div className={classes.intro}>
      <div className={classes.overlay}>
        {introductionText()}
        <div className="mycontainer" style={{ paddingTop: "40px" }}>
          <h3 className={classes.filterTitle}>Filtrer vos biens:</h3>
          <div className="filter-container">
            {buyOrSellButtons()}
            {Filters()}
          </div>
        </div>
      </div>
    </div>
  )

  function Filters() {
    return (
      <>
        <div className="checkbox-container">
          <FormGroup row className={classes.formGroup}>
            {/* <span className="filter-label">Achat : </span> */}
            <FormControlLabel
              className="checkbox-label"
              control={
                <GreenCheckbox
                  checked={filterData.terrain}
                  onChange={handleChange}
                  name="terrain"
                />
              }
              label="Terrains"
              disabled={!filterData.achat && !filterData.location}
            />
            <FormControlLabel
              className="checkbox-label"
              control={
                <GreenCheckbox
                  checked={filterData.appartement}
                  onChange={handleChange}
                  name="appartement"
                />
              }
              label="Appartements"
              disabled={!filterData.achat}
            />
            <FormControlLabel
              className="checkbox-label"
              control={
                <GreenCheckbox
                  checked={filterData.villa}
                  onChange={handleChange}
                  name="villa"
                />
              }
              label="Villas et maisons"
              disabled={!filterData.achat}
            />
            <FormControlLabel
              className="checkbox-label"
              control={
                <GreenCheckbox
                  checked={filterData.achatBureau}
                  onChange={handleChange}
                  name="achatBureau"
                />
              }
              label="Bureaux"
              disabled={!filterData.achat}
            />
            <FormControlLabel
              className="checkbox-label"
              control={
                <GreenCheckbox
                  checked={filterData.achatFond}
                  onChange={handleChange}
                  name="achatFond"
                />
              }
              label="Fonds de commerce"
              disabled={!filterData.achat}
            />
          </FormGroup>
          <FormGroup row className={classes.formGroup}>
            {/* <span className="filter-label">Location : </span> */}
            {/* <FormControlLabel
              className="checkbox-label"
              control={
                <GreenCheckbox
                  checked={filterData.locationBureau}
                  onChange={handleChange}
                  name="terrain"
                />
              }
              label="Terrains"
              disabled={!filterData.location}
            /> */}
            <FormControlLabel
              className="checkbox-label"
              control={
                <GreenCheckbox
                  checked={filterData.locationBureau}
                  onChange={handleChange}
                  name="locationBureau"
                />
              }
              label="Bureaux"
              disabled={!filterData.location}
            />
            <FormControlLabel
              className="checkbox-label"
              control={
                <GreenCheckbox
                  checked={filterData.locationLocal}
                  onChange={handleChange}
                  name="locationLocal"
                />
              }
              label="Locaux commerciaux"
              disabled={!filterData.location}
            />
            <FormControlLabel
              className="checkbox-label"
              control={
                <GreenCheckbox
                  checked={filterData.locationFond}
                  onChange={handleChange}
                  name="locationFond"
                />
              }
              label="Fonds de commerce"
              disabled={!filterData.location}
            />
          </FormGroup>
        </div>
        <form className={data.lang === "ar" ? "reverse" : ""}>
          <input
            id="keywords"
            type="text"
            placeholder="Titre"
            value={filterData.title}
            onChange={(e) =>
              setFilterData({ ...filterData, title: e.target.value })
            }
          />
          <input
            id="keywords"
            type="text"
            placeholder="Adresse"
            value={filterData.adress}
            onChange={(e) =>
              setFilterData({ ...filterData, adress: e.target.value })
            }
          />
          <select
            id="type"
            value={filterData.city}
            onChange={(e) =>
              setFilterData({ ...filterData, city: e.target.value })
            }
          >
            <option value="">{data.location}</option>
            {data.cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <button type="submit" onClick={handleSearch}>
            <SearchIcon /> {data.searchBtn}
          </button>
        </form>
      </>
    )
  }

  function buyOrSellButtons() {
    return (
      <div className="filter-row">
        <div
          className={filterData.achat ? "filter-item1 active" : "filter-item1"}
          onClick={(e) =>
            setFilterData({ ...filterData, achat: !filterData.achat })
          }
        >
          <img src="/images/app/sign.png" alt="Item" />
          <h4>Achat</h4>
        </div>
        <div
          className={
            filterData.location ? "filter-item1 active" : "filter-item1"
          }
          onClick={(e) =>
            setFilterData({
              ...filterData,
              location: !filterData.location,
            })
          }
        >
          <img src="/images/app/rent.png" alt="Item" />
          <h4>Location</h4>
        </div>
      </div>
    )
  }

  function introductionText() {
    return (
      <div className={classes.introDesc}>
        <p>
          On a besoin de plus en plus de voir les choses d'un angle différent.
        </p>
        <p>
          IBER vous offre l'opportunité de bien référer et soutenir votre "bien"
          avec un avis juridique et une expertise dans la vente et l'achat des
          biens immobiliers.
        </p>
        <p>
          IBER, se présente comme votre conseiller de confiance dans le monde
          immobilier.
        </p>
        <p>
          Consultez un expert qui vous aidera à bien valoriser vos biens,mais
          aussi vous aider à procéder à des achats en toute sécurité et aisance
          relationnelle avec des partenaires financiers.
        </p>
      </div>
    )
  }
}

export default Intro
