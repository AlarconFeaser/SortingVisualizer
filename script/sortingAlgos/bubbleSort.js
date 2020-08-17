import * as util from "../utils/util.js";
import * as Canvas from "../utils/canvas.js";
import * as modal from "../utils/modal.js";


let arr = util.generateArray(25, 50);
let originY = Canvas.height - 20;
let width = Canvas.width / arr.length;
let spacing = width * 0.1;
let heightScale = Canvas.height * 0.1;
let margin = spacing / 2;
let canvasArr = [];

const activeButtons = () => {
  let finalIteration = canvasArr.length - 1;
  let i = finalIteration;

  const buttons = document.querySelectorAll(".control");
  buttons.forEach((b) => {
    b.addEventListener("click", () => {
      if (b.id == "prevButton") {
        if (i - 1 > 0) {
          // console.log(finalIteration)
          // Canvas.paintCanvas("black");
          // console.log(canvasArr[0]);
          let temp = --i;
          drawArray(canvasArr[temp]);
          console.log(temp);
        }
      } else if (b.id == "nextButton") {
        if (i <= finalIteration) {
          // Canvas.paintCanvas("black");
          drawArray(canvasArr[++i]);
        }
      } else if (b.id == "finalButton") {
        i = finalIteration;
        // Canvas.paintCanvas("black");
        drawArray(canvasArr[i]);
      }
    });
  });
};

const drawArray = (arr) => {
  //Repaint canvas everytime
  Canvas.paintCanvas("black");
  arr.forEach((element, index) => {
    let posX = index * width + margin;
    let rectHeight = heightScale + element * 10;
    Canvas.ctx.fillStyle = "white";
    Canvas.ctx.fillRect(
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
