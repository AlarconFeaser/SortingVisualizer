import * as util from "../utils/util.js";
import * as canvas from "../utils/canvas.js";
import * as modal from "../utils/modal.js";


let canvas_width = canvas.context.canvas.width;
let canvas_height = canvas.context.canvas.height;

let arr = util.generateArray(25, 20);
let originY = canvas_height - canvas_height*.2;
let width = canvas_width / arr.length;
let spacing = canvas_height / arr.length * 0.1;
let heightScale = canvas_height * 0.1;
let margin = spacing / 2;
let canvasArr = [];

const activeButtons = () => {
  let finalIteration = canvasArr.length - 1;
  let i = finalIteration;

  canvas.context.font = '48px serif';
  canvas.context.fillText(`Current Step : ${i} Total Steps : ${finalIteration}`, 10,  canvas_height - 50);

  const buttons = document.querySelectorAll(".control");
  buttons.forEach((b) => {
    b.addEventListener("click", () => {
      if (b.id == "prevButton") {
        if (i - 1 > 0) {
          drawArray(canvasArr[--i]);
        }
      } else if (b.id == "nextButton") {
        if (i <= finalIteration - 1) {
          drawArray(canvasArr[++i]);
        }
      } else if (b.id == "finalButton") {
        i = finalIteration;
        drawArray(canvasArr[i]);
      }

    let font_size = Number(canvas_height*.05);
    console.log(font_size);
    canvas.context.font = `${font_size}px serif`;
    canvas.context.fillText(`Current Step : ${i} Total Steps : ${finalIteration}`, 10,  canvas_height - canvas_height*.05);
      
    });
  });
};

const drawArray = (arr) => {
  canvas.paintCanvas("black");
  arr.forEach((element, index) => {
    let posX = index * width + margin;
    let rectHeight = heightScale + element * 10;
    canvas.context.fillStyle = "white";
    canvas.context.fillRect(
      posX,
      originY - rectHeight,
      width - spacing,
      rectHeight
    );
  });
};

const bubbleSort = arr => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 1; j < arr.length - i; j++) {
      if (arr[j - 1] > arr[j]) {
        util.swap(j - 1, j, arr);
        //adds on to the canvas array
        canvasArr.push([...arr]);
      }
    }
  }
};

let x = 0;
const drawOnCanvas = (arr3d, speed) => {
  let index = 0;
  const currentInterval = setInterval(() => {
    if(index == arr3d.length) {
      clearInterval(currentInterval);
    }else{
      drawArray(arr3d[index++]);
    }
  }, speed);
};

const Main  = () => {
  //TOP SPEED
  let speed = 1000 / arr.length/2;
  bubbleSort(arr);
  drawOnCanvas(canvasArr, speed);
  activeButtons();
};

Main();
