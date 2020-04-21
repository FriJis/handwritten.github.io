window.getImage = (canvas) => {
    var imageData = canvas.toDataURL();
    var image = new Image(1920, 1080);
    image.src = imageData;
    return image;
}
 
window.saveImage = (image) => {
    var link = document.createElement("a");
 
    link.setAttribute("href", image.src);
    link.setAttribute("download", "canvasImage");
    link.click();
}