const canvas = document.querySelector(".myCanvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const paintCanvas = (color) => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const renderImage = function(blob){
  
  var img = new Image();

  img.onload = function(){
    ctx.drawImage(img, 0, 0)
  }

  img.src = URL.createObjectURL(blob);
};


export {
  canvas, ctx, paintCanvas, width, height, renderImage
}