import {generateArray, shuffleArray} from './util/util.js'
import sorts from './sortingAlgos/sortingAlgos.js'
const PADDING = 5;
const PARENT_DIV = document.querySelector(".parent");
let size = 21;
let WIDTH = (PARENT_DIV.clientWidth - PADDING * 2) / size;
let START = PARENT_DIV.offsetLeft + PADDING / 2;
let arr = generateArray(
              size, 
              Math.floor(PARENT_DIV.clientHeight * 0.98, PADDING)
          );
let divs = [];

const styleBar = (bar, height, left) => {
  bar.style.width = (WIDTH - PADDING) + "px";
  bar.style.left = left + "px";
  bar.style.height = height + 'px';
}

const createBar = (height, left) => {
  const bar = document.createElement("div");
  bar.classList = "bar regular";
  styleBar(bar, height, left);
  return bar;
} 

const createDivsInsideParent = (arr, num) => {
  for (let i = 0; i < num; i++) {
    const div = createBar(arr[i], START + i * WIDTH + PADDING)
    divs.push(div);
    PARENT_DIV.appendChild(div);
  }
};

createDivsInsideParent(arr, size);

const swapDivs = (d1, d2) => {
  let first = divs[d1].style.left;
  let second = divs[d2].style.left;
  divs[d1].style.left = second;
  divs[d1].style.zIndex = 1000;
  divs[d2].style.left = first;
  let animLen = 1000 * parseFloat(document.documentElement.style.getPropertyValue('--anim-length'))
  // console.log(animLen)
  divs[d1].animate({
    transform: ['scale(1)', 'scale(1.5)', 'scale(1)'],
    // offset: [ 0, .5, 1.0 ],
    easing: [ 'ease-in-out' ],
  }, {duration: animLen})
  divs[d2].animate({
    transform: ['scale(1)', 'scale(0.5)', 'scale(1)'],
    // offset: [ 0, .5, 1.0 ],
    easing: [ 'ease-in-out' ],
  }, {duration: animLen})
  divs[d1].style.backgroundColor = forward ? 'red' : 'blue';
  divs[d2].style.backgroundColor = forward ? 'blue' : 'red';
  let temp = divs[d1];
  divs[d1] = divs[d2];
  divs[d2] = temp;
}
let swaps = [];

let current = -1;
let running = false;
let firstAnim = true;
let forward = true;
let pauseable = true;
let currentSort = undefined;

PARENT_DIV.addEventListener("transitionend", (evt) => {
  if (evt.propertyName == 'left') {
    evt.target.style.zIndex = 1
    if (!firstAnim)
      running ? swap() : pause();
    firstAnim = !firstAnim;
    evt.target.style.backgroundColor = 'lightgreen'
  }
  evt.preventDefault();
})

const swap = () => {
  if (forward && current < swaps.length - 1){
    animateSwap(++current);
    currentOnScreen(current);
  } 
  else if (!forward && current >= 0){
    animateSwap(current--);
    currentOnScreen(current);
  }
  else{
    pause();
    if(currentSort != undefined) currentSort()
  }

} 

const animateSwap = num => swapDivs(swaps[num][0], swaps[num][1]);

const PLAY_BUTTON = document.querySelector('#playPauseIcon');
const BARS = document.querySelectorAll('.bar');

const pause = () => {
  console.log('paused', current, swaps.length)
  enableSelectForm();
  running = false;
  pauseable = true;
  forward = true;
  BARS.forEach(b => b.classList.replace('fast', 'regular'));
  PLAY_BUTTON.classList.replace('fa-pause', 'fa-play');
}

// Button click listeners: 

document.querySelector('#firstButton').addEventListener('click', () => {
  if (!running) {
    forward = false;
    running = true;
    disableSelectForm();
    BARS.forEach(b => b.classList.replace('regular', 'fast'))
    PLAY_BUTTON.classList.replace('fa-play', 'fa-pause')
    swap();
  }
})

document.querySelector('#prevButton').addEventListener('click', () => {
  if (!running && pauseable) {
      forward = false;
      pauseable = false;
      PLAY_BUTTON.classList.replace('fa-play', 'fa-pause')
      swap();
  }
})

document.querySelector('#playButton').addEventListener('click', () => {
  if (pauseable) {
    if (running) {  // pause
        BARS.forEach(b => b.classList.replace('fast', 'regular'))
        PLAY_BUTTON.classList.replace('fa-pause', 'fa-play')
        running = false;
        enableSelectForm();
    }
    else {  // play
      disableSelectForm();
      running = true;
      forward = true;
      BARS.forEach(b => b.classList.replace('fast', 'regular'))
      PLAY_BUTTON.classList.replace('fa-play', 'fa-pause')
      swap();
    }
  }
})

document.querySelector('#nextButton').addEventListener('click', () => {
  if (!running && pauseable) {
    pauseable = false;
    forward = true;
    PLAY_BUTTON.classList.replace('fa-play', 'fa-pause')
    swap();
  }
})

document.querySelector('#finalButton').addEventListener('click', () => {
  if (!running) {
    disableSelectForm();
    forward = true;
    running = true;
    BARS.forEach(b => b.classList.replace('regular', 'fast'))
    PLAY_BUTTON.classList.replace('fa-play', 'fa-pause')
    swap();
  }
})

function shuffle(){
  if (!running) {
    forward = true;
    running = true;
    disableSelectForm();
    BARS.forEach(b => b.classList.replace('regular', 'fast'));
    PLAY_BUTTON.classList.replace('fa-play', 'fa-pause');
    swaps = shuffleArray(arr).swaps;
    current = -1;
    pauseable = false;
    swap();
  }
}

document.querySelector('#shuffleButton').addEventListener('click', shuffle);

window.addEventListener('resize', () => {
    WIDTH = (PARENT_DIV.clientWidth - PADDING * 2) / size;
    START = PARENT_DIV.offsetLeft + PADDING / 2;
    console.log("resize", WIDTH, START);
})

function generateSpeeds(a, b, num) {
  let speeds = []
  for (let i = 1; i <= num; ++i)
    speeds.push((i ** b) / a);
  return speeds;
}

const speeds = generateSpeeds(1000, 2, 50);
let speed = speeds.length >> 1;
document.documentElement.style.setProperty('--anim-length', speeds[speed] + 's')
console.log(speeds[speed])

function getDuration(evt) {
  if (evt.deltaY > 0 && speed < speeds.length - 1)
    speed++;
  else if (evt.deltaY < 0 && speed > 0)
    speed--;
  return (speeds[speed] + "s");
}

function changeTranstionDuration(evt) {
  const duration = getDuration(evt);
  document.documentElement.style.setProperty('--anim-length', duration)
  evt.preventDefault();
}

function selectAlgorithm(n){
  switch(n){
    case 0:
      return() => {
        console.log("Sorting using Bubble");
        swaps = sorts.bubbleSort(arr);
        reset();
        totalOnScreen(swaps.length);
      }
    case 1:
      return() => {
        console.log("Sorting using Merge");
        // swaps = bubbleSort(arr);
        // forward = true;
        // running = true;
        // current = -1;
        // swap();
        // currentSort = undefined;
      }
    case 2:
      return() => {
        console.log("Sorting using QuickSort....");
        // swapsQuickSort(arr, swaps);
        // console.log(swaps)
        // forward = true;
        // running = true;
        // current = -1;
        // swap();
        // currentSort = undefined;
      }
    case 3:
      return() => {
        console.log("Sorting using Selection......");
        swaps = sorts.selectionSort(arr);
        totalOnScreen(swaps.length);
        reset();
      }
    case 4:
      return() => {
        console.log("Sorting using Insertion..");
        swaps = sorts.insertionSort(arr);
        totalOnScreen(swaps.length);
        reset();
      }
    default:
      break;
  }


}

const reset = () => {
  forward = true;
  current = -1;
  currentSort = undefined;
}

const changeAlgorithm = (evt) => {
  let selection = Number(evt.target.value);
  if(selection >= 0){
    shuffle();
    currentSort = selectAlgorithm(selection);
  }
  }


  

const selectForm = document.querySelector('.selectForm');
selectForm.onchange = changeAlgorithm;
selectForm.value = -1;
function disableSelectForm(){selectForm.disabled = true}
function enableSelectForm(){selectForm.disabled = false}


const currentElement = document.querySelector('.currentStep .currentValue')
function currentOnScreen(n){
  currentElement.innerHTML = "";
  currentElement.appendChild(document.createTextNode((n + 1)));
}

const totalElement = document.querySelector('.totalSteps .totalValue')
function totalOnScreen(n){
  totalElement.innerHTML = "";
  totalElement.appendChild(document.createTextNode(n));
}



document.body.addEventListener('wheel', changeTranstionDuration, {passive: false})