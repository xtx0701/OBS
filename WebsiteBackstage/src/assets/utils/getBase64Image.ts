const getBase64Image = (img: any) => {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const imageContext: any = canvas.getContext('2d')
    imageContext.drawImage(img, 0, 0, img.width, img.height)
    let ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
    if (ext === 'jpg') ext = 'jpeg'
    const dataURL = canvas.toDataURL('image/' + ext)
    return dataURL
}

export default getBase64Image