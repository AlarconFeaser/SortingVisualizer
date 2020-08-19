import * as util from "../utils/util.js";
import * as canvas from "../utils/canvas.js";
import * as modal from "../utils/modal.js";


let canvas_width = canvas.context.canvas.width;
let canvas_height = canvas.context.canvas.height;
let arr, canvasArr;

let originY = canvas_height - canvas_height*.2;
let heightScale = canvas_height * 0.1;


let width, spacing, margin;

const activeButtons = () => {
  let finalIteration = canvasArr.length - 1;
  let i = finalIteration;
  let font_size = Number(canvas_height*.05);
  canvas.context.font = `${font_size}px serif`;
  canvas.context.fillText(`Current Step : ${i} Total Steps : ${finalIteration}`, 10,  canvas_height - 50);

  const buttons = document.querySelectorAll(".control-canvas");
  buttons.forEach((b) => {
    b.disabled = false;
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
    canvas.context.font = `${font_size}px serif`;
    canvas.context.fillText(`Current Step : ${i} Total Steps : ${finalIteration}`, 10,  canvas_height - 50);
      
    });
  });
};

const drawArray = (arr,) => {
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
const drawOnCanvas = (arr3d, speed, callback) => {
  let index = 0;
  const currentInterval = setInterval(() => {
    if(index == arr3d.length) {
      clearInterval(currentInterval);
      callback();
    }else{
      drawArray(arr3d[index++]);
    }
  }, speed);
};

const Main  = (size = 10, ms = 60) => {
  //TOP SPEED
  let speed = 1000 / ms;
  arr = util.generateArray(size, 20);
  canvasArr = [];
  
  bubbleSort(arr);

  width = canvas_width / arr.length;
  spacing = canvas_height / arr.length * 0.1;
  margin = spacing / 2;

  drawOnCanvas(canvasArr, speed, activeButtons);
  
};

Main();

///SETTING AND MODAL STUFF

const settingB = document.querySelector('#setting-button');
const closeB = document.querySelector('#close-button');
const modalForm = document.querySelector('#modal-form');

closeB.addEventListener('click', () => {
    modal.closeModal();
});

settingB.addEventListener('click', () => {
  console.log("setting");
  modal.openModal();
});

modalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    var formData = new FormData(modalForm);
    const speed_input = formData.get('speed-input');
    const size_input = formData.get('size-input');
    
    Main(size_input, speed_input);
    modal.closeModal();

})


const disableButton = () =>{
  const buttons = document.querySelectorAll(".control-canvas");
  buttons.forEach(b => {
    b.disabled = true; 
  })
}

//RESTART STUFF
const restartB = document.querySelector('#restart-button');
restartB.addEventListener('click', () => {
    disableButton();
    let speed = 1000 / arr.length/2;
    drawOnCanvas(canvasArr, speed, activeButtons);
})



