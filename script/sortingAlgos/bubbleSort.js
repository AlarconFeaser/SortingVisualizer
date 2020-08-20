import * as util from "../utils/util.js";
import * as canvas from "../utils/canvas.js";
import * as modal from "../utils/modal.js";
import * as algo from './b.js';  // this is where algorithm goes 

let canvas_width = canvas.context.canvas.width;
let canvas_height = canvas.context.canvas.height;
let arr = [];
let canvasArr = [];

let originY = canvas_height - canvas_height*.2;

let width, spacing, margin;
let currentStep = -1;

let running = true;
let finalIteration;
let currentInterval;

const addToArray = ( arr ) => canvasArr.push([...arr]);

const displayTextOnCanvas = () => {
  let font_size = '2.5em';
  canvas.context.font = `${font_size} serif`;
  canvas.context.fillText(`Current Step : ${currentStep} Total Steps : ${finalIteration + 1}` , 10,  canvas_height - 50);
};

const drawArray = (arr) => {
  canvas.paintCanvas("black");
  arr.forEach((element, index) => {
    let posX = index * width + margin;
    let rectHeight = (element + 1) * 3.33;
    canvas.context.fillStyle = "white";
    canvas.context.fillRect(
      posX,
      originY - rectHeight,
      width - spacing,
      rectHeight
    );
  });
  displayTextOnCanvas();
};

const drawOnCanvas = (generations, fps = 60) => {
  const speed = 1000 / fps;
  currentInterval = setInterval(() => {
    if(currentStep == generations.length) {
      pause();
      running = false;
      currentStep = 0;
    }
    else{
      drawArray(generations[currentStep++]);
    }
  }, speed);
};

const Main  = (size = 25, fps = 60) => {
  arr = util.generateArray(size, size * 10);
  canvasArr = [];

  algo.bubbleSort(arr, addToArray);
  finalIteration = canvasArr.length - 1;

  width = canvas_width / arr.length;
  spacing = canvas_height / arr.length * 0.1;
  margin = spacing >> 1;

  drawOnCanvas(canvasArr, fps);
};

Main();

const play = () => {
  if(!running) {
    drawOnCanvas(canvasArr);
    togglePlayPause();
    running = !running;
  }
}

const pause = () => {
  if (running) {
    console.log('pausing')
    clearInterval(currentInterval);
    togglePlayPause();
    running = !running;
  }
}

const togglePlayPause = () => {
  const btn = document.querySelector('#playPauseIcon');
  (!running) ? btn.classList.replace('fa-play', 'fa-pause') : btn.classList.replace('fa-pause', 'fa-play')
}

//Event Listeners

document.querySelector('#firstButton').addEventListener('click', () => {
  currentStep = 0;
  drawArray(canvasArr[currentStep]);
})

document.querySelector('#prevButton').addEventListener('click', () => {
  if (currentStep - 1 > 0)
    drawArray(canvasArr[--currentStep]);
  pause();
})

document.querySelector('#nextButton').addEventListener('click', () => {
  if (currentStep < finalIteration)
    drawArray(canvasArr[++currentStep]);
  pause();
})

document.querySelector('#finalButton').addEventListener('click', () => {
  currentStep = finalIteration;
  drawArray(canvasArr[currentStep]);
})

document.querySelector('#close-button').addEventListener('click', () => {
    modal.closeModal();
});

document.querySelector('#setting-button').addEventListener('click', () => {
  pause();
  modal.openModal();
});

document.querySelector('#playButton').addEventListener('click', () => {
  (!running) ? play() : pause();
})

document.querySelector('#modal-form').addEventListener('submit', (event) => {
    event.preventDefault();
    var formData = new FormData(modalForm);
    const speed_input = formData.get('speed-input');
    const size_input = formData.get('size-input');
    Main(size_input, speed_input);
    modal.closeModal();
})









