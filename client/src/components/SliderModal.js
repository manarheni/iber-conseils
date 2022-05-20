import React from "react"
import { Grow } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import Carousel from "react-elastic-carousel"

export default function SliderModal(props) {
  const {files } = props
  if (!files) return null
  console.log(files)
  return (
    <Grow in>
      <div className="image-modal-container">
        <div className="image-modal">
          <CloseIcon onClick={props.closeImage} />
          <Carousel>
            {files?.map((file, index) => {
              let fileType = file.split(";")[0].split("/")[1]
              console.log(fileType)

              switch (fileType) {
                case "pdf":
                  return (
                    <iframe key={index} src={file} width="100%" height="500px"></iframe>
                  )

                default:
                  return <img key={index} src={file} alt="selected" />
              }
            })}
          </Carousel>
        </div>
      </div>
    </Grow>
  )
}
