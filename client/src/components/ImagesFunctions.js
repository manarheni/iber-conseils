import Compress from "compress.js"

export const getBase64 = (file) => {
  return new Promise((resolve) => {
    let baseURL = ""
    // Make new FileReader
    let reader = new FileReader()

    // Convert the file to base64 text
    reader.readAsDataURL(file)

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result
      resolve(baseURL)
    }
  })
}

export const resizePhotos = async (files) => {
  const compress = new Compress();

  const resizedImage = await compress.compress(files, {
    size: 2, // the max size in MB, defaults to 2MB
    quality: 1, // the quality of the image, max is 1,
    maxWidth: 1000, // the max width of the output image, defaults to 1920px
    maxHeight: 800, // the max height of the output image, defaults to 1920px
    resize: true, // defaults to true, set false if you do not want to resize the image width and height
  })
  let resizedArray = []
  resizedImage.map((img) =>
    resizedArray.push({ base64: img.data, ext: img.ext })
  )
  return resizedArray
}


export const pdfToBase64 = (files) => {
  let pdfsArray = []
  files.forEach((file) => {
    getBase64(file).then((res) => pdfsArray.push(res))
  })

  return pdfsArray
}