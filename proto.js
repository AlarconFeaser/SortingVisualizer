const generateArray = (size, max_num) => {
  let arr = [];
  let min_size = max_num / 20;
  for (let i = 0; i < size; ++i) 
    arr[i] = Math.ceil(Math.random() * (max_num - min_size) + min_size);
  return arr;
};

const PARENT_DIV = document.querySelector(".parent");
let size = 100;
let arr = generateArray(size, Math.floor(PARENT_DIV.clientHeight * 0.98));
let divs = [];
const PADDING = 5;
const WIDTH = (PARENT_DIV.clientWidth - PADDING * 2) / size;
const START = PARENT_DIV.offsetLeft + PADDING / 2;
const BOTTOM = PARENT_DIV.style.offsetBottom - PADDING

const createBar = (height, left) => {
  const bar = document.createElement("div");
  bar.classList = "bar regular";
  bar.style.width = (WIDTH - PADDING) + "px";
  bar.style.left = left + "px";
  bar.style.height = height + 'px';
  bar.style.bottom = BOTTOM + "px";
  return bar;
} 

const createDivsInsideParent = (num) => {
  for (let i = 0; i < num; i++) {
    const div = createBar(arr[i], START + i * WIDTH + PADDING)
    divs.push(div);
    PARENT_DIV.appendChild(div);
  }
};

createDivsInsideParent(size);

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

// document.querySelector('#setting-button').addEventListener('click', () => {
//   // pause();
//   // modal.openModal();
// });

// let currentDiv = document.createElement("DIV");
// let totalDiv = document.createElement("DIV");
// let divArr = [currentDiv, totalDiv]
// divArr.forEach( d => {
//     d.style.left = 0;
//     d.style.top = 0;
//     d.style.backgroundColor = "white";
//     d.style.position = "absolute";
//     d.style.WIDTH = "100px";
//     d.style.height = "auto";
//     d.style.color = "green";
//     d.style.zIndex = 1;
//     document.body.appendChild(d);
// })

// totalDiv.style.left  = '100px';
// totalDiv.innerHTML = swaps.length;
// currentDiv.innerHTML = current;

// console.log(divArr);

// //DW about this 
// let div = document.createElement("DIV");
// document.body.appendChild(div);
// div.style.position = "absolute";
// div.style.left = 0;
// div.style.top = 0;
// div.style.backgroundColor = "white";
// div.style.width = "auto";
// div.style.height = "auto";
// div.style.color = "black";
// div.style.pointerEvents = "none";
// div.style.display = "none";
// div.style.padding = '10px'
// div.style.borderRadius = '1rem'

// let bar = document.querySelectorAll(".bar");
// bar.forEach(b => {
//   b.addEventListener("mouseover", (evt) => {
//     console.log(evt.target.style.height)
    // div.style.display = "block";
    // div.style.left = evt.clientX + 20 + "px";
    // div.style.top = evt.clientY + "px";
    // div.innerHTML = parseInt(evt.target.style.height, 10);
//   });
// })

//Dialogs
// let dialogDiv = document.createElement("DIV");
// let closeButton = document.createElement("BUTTON");
// let dialogSpan = document.createElement("SPAN");
// closeButton.innerHTML = "OK"
// closeButton.style.position = 'relative';
// closeButton.addEventListener('click', () => {
//   dialogBox();
// })
// dialogDiv.appendChild(dialogSpan);
// dialogDiv.appendChild(closeButton);
// dialogDiv.classList.add('dialogBox');
// document.body.appendChild(dialogDiv);

// function dialogBox(text = undefined) {
//   if (text === undefined)
//     dialogDiv.style.display = "none";
//   else {
//     dialogDiv.style.display = "block";
//     dialogSpan.innerHTML = text;
//   }
// }