const generateArray = (size, max_num) => {
  let arr = [];
  let min_size = max_num / 20;
  for (let i = 0; i < size; ++i) 
    arr[i] = Math.ceil(Math.random() * (max_num - min_size) + min_size);
  return arr;
};

const PARENT_DIV = document.querySelector(".parent");
let size = 50;
let arr = generateArray(size, Math.floor(PARENT_DIV.clientHeight * 0.98));
let originalArray = [...arr];
let divs = [];
const PADDING = 5;
let WIDTH = (PARENT_DIV.clientWidth - PADDING * 2) / size;
let START = PARENT_DIV.offsetLeft + PADDING / 2;

const createBar = (height, left) => {
  const bar = document.createElement("div");
  bar.classList = "bar regular";
  bar.style.width = (WIDTH - PADDING) + "px";
  bar.style.left = left + "px";
  bar.style.height = height + 'px';
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

const swapArray = (x, y, arr) => {
  let temp = arr[y];
  arr[y] = arr[x];
  arr[x] = temp;
};

const bubbleSort = (arr) => {
  let swaps = []
  for (let i = 0; i < arr.length - 1; i++)
    for (let j = 1; j < arr.length - i; j++) {
      if (arr[j - 1] > arr[j]) {
        swapArray(j - 1, j, arr);
        swaps.push([j - 1, j]);
      }
    }
  return swaps;
};

const swapDivs = (d1, d2) => {
  let first = divs[d1].style.left;
  let second = divs[d2].style.left;
  divs[d1].style.left = second;
  divs[d2].style.left = first;
  divs[d1].style.backgroundColor = forward ? 'red' : 'blue';
  divs[d2].style.backgroundColor = forward ? 'blue' : 'red';
  let temp = divs[d1];
  divs[d1] = divs[d2];
  divs[d2] = temp;
}

let swaps = bubbleSort(arr);

let current = -1;
let running = false;
let firstAnim = true;
let forward = true;
let pauseable = true;

PARENT_DIV.addEventListener("transitionend", (evt) => {
  if (evt.propertyName == 'left') {
    if (!firstAnim)
      running ? swap() : pause();
    firstAnim = !firstAnim;
    evt.target.style.backgroundColor = 'lightgreen'
  }
  evt.preventDefault();
})

const swap = () => {
  if (forward && current < swaps.length - 1)
    animateSwap(++current);
  else if (!forward && current >= 0)
    animateSwap(current--);
  else
    pause();
} 

const animateSwap = num => swapDivs(swaps[num][0], swaps[num][1]);

const PLAY_BUTTON = document.querySelector('#playPauseIcon');
const BARS = document.querySelectorAll('.bar');

const pause = () => {
  console.log('paused', current, swaps.length)
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
    }
    else {  // play
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
    forward = true;
    running = true;
    BARS.forEach(b => b.classList.replace('regular', 'fast'))
    PLAY_BUTTON.classList.replace('fa-play', 'fa-pause')
    swap();
  }
})

window.addEventListener('resize', ()=>{
// pause();
WIDTH = (PARENT_DIV.clientWidth - PADDING * 2) / size;
START = PARENT_DIV.offsetLeft + PADDING / 2;
console.log("resize", WIDTH, START);
// current = -1;
// running = false;
// firstAnim = true;
// forward = true;
// pauseable = true;
// PARENT_DIV.innerHTML = "";
// createDivsInsideParent(originalArray, size);
// console.log(divs);
//Solution 1
//We could restart everything to the beginning with the new width and start
//No problem with this, tho Idk how to exactly do it, pause locks everything else
//Solution 2
//we could resize as the animation runs which will have major problems
//1. transition end will detect wathever size the array is times 2 animations.
//2. won't look as nice.
//Solution 3 HIBRID SOLUTION
//we could pause and resize everything, PROBLEMS :
// once again this will trigger some transitionEnd for left.
})

let minSpeed = .00001;
let speed = .5;
function calculateDuration(evt) {
  evt.preventDefault();
  speed += evt.deltaY * -0.001;
  speed = Math.min(Math.max(minSpeed, speed), 2);
  return (speed + "s");
}

let ss = document.styleSheets[1].cssRules[4];
function changeTranstionDuration(evt){
  console.log(calculateDuration(evt));
  ss.style.animationDuration = calculateDuration(evt);
  ss.style.MozTransitionDuration = calculateDuration(evt);
}

document.body.onwheel = changeTranstionDuration;
