const context = document.querySelector(".myCanvas").getContext("2d");
// const context = canvas.getContext("2d");

const render = () => {
  context.canvas.width = document.documentElement.clientWidth*.8;
  context.canvas.height = document.documentElement.clientHeight*.7;
  paintCanvas();
}

window.addEventListener("resize", () => {
  render();
})

const paintCanvas = (color) => {
  context.fillStyle = color;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
};

const renderImage = function(blob){  
  var img = new Image();
  img.onload = function(){
    ctx.drawImage(img, 0, 0)
  }
  img.src = URL.createObjectURL(blob);
};

render();

export {
 context, paintCanvas, renderImage
}