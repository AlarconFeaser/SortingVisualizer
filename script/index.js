import { generateArray, shuffleArray } from "./util/util.js";
import sorts from "./sortingAlgos/sortingAlgos.js";
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
  bar.style.width = WIDTH - PADDING + "px";
  bar.style.left = left + "px";
  bar.style.height = height + "px";
};

const createBar = (height, left) => {
  const bar = document.createElement("div");
  bar.classList = "bar regular";
  styleBar(bar, height, left);
  return bar;
};

const createDivsInsideParent = (arr, num) => {
  for (let i = 0; i < num; i++) {
    const div = createBar(arr[i], START + i * WIDTH + PADDING);
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
  let animLen =
    1000 *
    parseFloat(
      document.documentElement.style.getPropertyValue("--anim-length")
    );
  // console.log(animLen)
  divs[d1].animate(
    {
      transform: ["scale(1)", "scale(1.5)", "scale(1)"],
      // offset: [ 0, .5, 1.0 ],
      easing: ["ease-in-out"],
    },
    { duration: animLen }
  );
  divs[d2].animate(
    {
      transform: ["scale(1)", "scale(0.5)", "scale(1)"],
      // offset: [ 0, .5, 1.0 ],
      easing: ["ease-in-out"],
    },
    { duration: animLen }
  );
  divs[d1].style.backgroundColor = forward ? "red" : "blue";
  divs[d2].style.backgroundColor = forward ? "blue" : "red";
  let temp = divs[d1];
  divs[d1] = divs[d2];
  divs[d2] = temp;
};
let swaps = [];

let current = -1;
let running = false;
let firstAnim = true;
let forward = true;
let pauseable = true;
let currentSort = undefined;
let shuffling = false;

PARENT_DIV.addEventListener("transitionend", (evt) => {
  if (evt.propertyName == "left") {
    console.log(running)
    evt.target.style.zIndex = 1;
    if (!firstAnim) running ? swap() : pause();
    firstAnim = !firstAnim;
    evt.target.style.backgroundColor = "lightgreen";
  }
  evt.preventDefault();
});

const swap = () => {
  if (forward && current < swaps.length - 1) {
    animateSwap(++current);
    if(!shuffling) currentOnScreen(current);
  } else if (!forward && current >= 0) {
    animateSwap(current--);
    if(!shuffling) currentOnScreen(current);
  } else {
    pause();
    // if (currentSort != undefined) currentSort();

    if (shuffling) {  // perform current sort
      console.log('here')
      shuffling = false;
      //do more here to reset after shuffle finishes, lock stuff
      swaps = currentSort(arr);
      current = -1;
      totalOnScreen(swaps.length - 1)
      // swaps = [];
      // reset();
    }
  }
};

const animateSwap = (num) => swapDivs(swaps[num][0], swaps[num][1]);

const PLAY_BUTTON = document.querySelector("#playPauseIcon");
const BARS = document.querySelectorAll(".bar");

const pause = () => {
  console.log("paused", current, swaps.length);
  enableSelectForm();
  running = false;
  pauseable = true;
  forward = true;
  BARS.forEach((b) => b.classList.replace("fast", "regular"));
  PLAY_BUTTON.classList.replace("fa-pause", "fa-play");
};

// Button click listeners:

document.querySelector("#firstButton").addEventListener("click", () => {
  if (!running) {
    forward = false;
    running = true;
    BARS.forEach((b) => b.classList.replace("regular", "fast"));
    PLAY_BUTTON.classList.replace("fa-play", "fa-pause");
    disableSelectForm();
    swap();
  }
});

document.querySelector("#prevButton").addEventListener("click", () => {
  if (!running && pauseable) {
    forward = false;
    pauseable = false;
    PLAY_BUTTON.classList.replace("fa-play", "fa-pause");
    swap();
  }
});

document.querySelector("#playButton").addEventListener("click", () => {
  if (pauseable) {
    if (running) {
      // pause
      BARS.forEach((b) => b.classList.replace("fast", "regular"));
      PLAY_BUTTON.classList.replace("fa-pause", "fa-play");
      running = false;
      enableSelectForm();
    } else {
      // play
      running = true;
      forward = true;
      BARS.forEach((b) => b.classList.replace("fast", "regular"));
      PLAY_BUTTON.classList.replace("fa-play", "fa-pause");
      disableSelectForm();
      swap();
    }
  }
});

document.querySelector("#nextButton").addEventListener("click", () => {
  if (!running && pauseable) {
    pauseable = false;
    forward = true;
    PLAY_BUTTON.classList.replace("fa-play", "fa-pause");
    swap();
  }
});

document.querySelector("#finalButton").addEventListener("click", () => {
  if (!running) {
    forward = true;
    running = true;
    BARS.forEach((b) => b.classList.replace("regular", "fast"));
    PLAY_BUTTON.classList.replace("fa-play", "fa-pause");
    disableSelectForm();
    swap();
  }
});

function shuffle() {
  // if (!running) {
  shuffling = true;
  forward = true;
  running = true;
  pauseable = false;
  BARS.forEach((b) => b.classList.replace("regular", "fast"));
  PLAY_BUTTON.classList.replace("fa-play", "fa-pause");
  swaps = shuffleArray(arr);
  current = -1;
  disableSelectForm();
  swap();
  // }
}

document.querySelector("#shuffleButton").addEventListener("click", () => {
  if (!running) {
    shuffle();
    // selectForm.value = -1;
  }
});

window.addEventListener("resize", () => {
  WIDTH = (PARENT_DIV.clientWidth - PADDING * 2) / size;
  START = PARENT_DIV.offsetLeft + PADDING / 2;
  console.log("resize", WIDTH, START);
});

function generateSpeeds(a, b, num) {
  let speeds = [];
  for (let i = 1; i <= num; ++i) speeds.push(i ** b / a);
  return speeds;
}

const speeds = generateSpeeds(1000, 2, 50);
let speed = speeds.length >> 1;
document.documentElement.style.setProperty(
  "--anim-length",
  speeds[speed] + "s"
);
console.log(speeds[speed]);

function getDuration(evt) {
  if (evt.deltaY > 0 && speed < speeds.length - 1) speed++;
  else if (evt.deltaY < 0 && speed > 0) speed--;
  return speeds[speed] + "s";
}

function changeTranstionDuration(evt) {
  const duration = getDuration(evt);
  document.documentElement.style.setProperty("--anim-length", duration);
  speedOnScreen(duration);
  evt.preventDefault();
}

const changeAlgorithm = (evt) => {
  let selection = evt.target.value;
  console.log(selection);
  switch (selection) {
    case "bubble":
      currentSort = sorts.bubbleSort;
      break;
    case "merge":
      currentSort = sorts.mergeSort;
      break;
    case "select":
      currentSort = sorts.selectionSort;
      break;
    case "quick":
      currentSort = sorts.quickSort;
      break;
    case "insertion":
      currentSort = sorts.insertionSort;
      break;
  }
  shuffle();
};

const selectForm = document.querySelector(".selectForm");
selectForm.onchange = changeAlgorithm;
currentSort = sorts.bubbleSort;

function disableSelectForm() {
  selectForm.disabled = true;
}
function enableSelectForm() {
  selectForm.disabled = false;
}

const currentElement = document.querySelector(".currentStep .currentValue");
function currentOnScreen(n) {
    currentElement.innerHTML = "";
    currentElement.appendChild(document.createTextNode(n + 1));
}

const totalElement = document.querySelector(".totalSteps .totalValue");
function totalOnScreen(n) {
  totalElement.innerHTML = "";
  totalElement.appendChild(document.createTextNode(n + 1));
}

const speedElement = document.querySelector(".speed .speedValue");
function speedOnScreen(n) {
  // if(!shuffling){
  speedElement.innerHTML = "";
  speedElement.appendChild(document.createTextNode(n));
  // }
}


selectForm.value = 'bubble';
window.onload = shuffle;

  // $(shuffle);

document.body.addEventListener("wheel", changeTranstionDuration, {
  passive: false,
});
