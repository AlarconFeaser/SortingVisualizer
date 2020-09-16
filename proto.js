const generateArray = (size, max_num) => {
  let arr = [];
  for (let i = 0; i < size; ++i) arr[i] = Math.floor(Math.random() * max_num);
  return arr;
};

const parent_div = document.querySelector(".parent");
const size = 12;
let arr = generateArray(size, Math.floor(parent_div.clientHeight));
let divs = [];
const padding = 10;
const width = (parent_div.clientWidth - padding * 2) / size;

const createDivsInsideParent = (num) => {
  const start = parent_div.offsetLeft;
  const width = (parent_div.clientWidth - padding * 2) / size;
  const bottom = document.body.scrollHeight - parent_div.scrollHeight; //offsetTop should be the same as margin top and bottom
  for (let i = 0; i < num; i++) {
    const div = document.createElement("div");
    div.classList.add("bar");
    div.classList.add("regular");

    div.id = 'bar' + (i + 1);
    // let height = Math.round(parentHeight * (arr[i]*.1));
    let height = arr[i];
    div.style.position = "absolute";
    div.style.width = width - padding / 2 + "px";
    div.style.left = start + i * width + padding + "px";
    div.style.height = height + "px";
    // div.style.top = (bottom + height )+  'px';
    div.style.bottom = bottom + "px";
    divs.push(div);
    parent_div.appendChild(div);
  }
};

//KEEP IN MIND, NEEDS TO CHANGE THE INDECES
function swapDivs(d1, d2) {
    // console.log('swapping', d1, d2)
    let first = divs[d1].style.left;
    let second = divs[d2].style.left;
    divs[d1].style.left = second;
    divs[d2].style.left = first;
    divs[d1].style.backgroundColor = 'red';
    divs[d2].style.backgroundColor = 'blue';
    let temp = divs[d1]; 
    divs[d1] = divs[d2];
    divs[d2] = temp;
}

createDivsInsideParent(size);



const swap = (x, y, arr) => {
  let temp = arr[y];
  arr[y] = arr[x];
  arr[x] = temp;
};

const bubbleSort = (arr) => {
let swaps = []
  for (let i = 0; i < arr.length - 1; i++)
    for (let j = 1; j < arr.length - i; j++) {
      if (arr[j - 1] > arr[j]) {
        swap(j - 1, j, arr);
        swaps.push([j - 1, j]);
      }
    }
    return swaps;
};

let swaps = bubbleSort(arr);


function animateSwap(num){
    let currentSwap = swaps[num];
    swapDivs(currentSwap[0], currentSwap[1]);
}

let animating = true;

let current = 0;
let running = false;

let firstAnim = true;
let forward = true;
parent_div.addEventListener("transitionend", (evt) => {
  console.log(evt.propertyName )
  if (evt.propertyName == 'left' && running ){
      console.log(running);
    console.log("transitionend", firstAnim, evt.target.id);
    if(!firstAnim && current < swaps.length 
        // && current - 1 > 0
        ) {
    //   animateSwap(forward ? current++ : current--);
    animateSwap(current++)
    }
    //What's this?
    firstAnim = !firstAnim;
    evt.preventDefault();
  }
})


const play = () => {
    if(!running) {
        if(current < swaps.length) {
            console.log("playing");
            // animateSwap(forward ? current++ : current--);
            animateSwap(current++)
            togglePlayPause();
            running = !running;
        }
    }
  }
  
  const pause = () => {
    //  TODO:  prevent user from unpausing until transitions complete
    if (running ) {
      console.log('pausing')
      togglePlayPause();
      running = !running;
    }
  }
  
  function togglePlayPause(){
    const btn = document.querySelector('#playPauseIcon');
    (!running) ? btn.classList.replace('fa-play', 'fa-pause') : btn.classList.replace('fa-pause', 'fa-play')
  }


let bars = document.querySelectorAll('.bar');
document.querySelector('#firstButton').addEventListener('click', () => {
    forward = false;
    bars.forEach( b => {
        b.classList.replace('regular', 'reversing')
        console.log("here once");
    })
  })
  
  document.querySelector('#prevButton').addEventListener('click', () => {
    if(current - 1 > 0) 
        animateSwap(--current);
    pause();
  })
  
  document.querySelector('#nextButton').addEventListener('click', () => {
    if(current < swaps.length) 
        animateSwap(current++);
    pause();
  })
  
  document.querySelector('#finalButton').addEventListener('click', () => {
    bars.forEach( b => {
        b.classList.replace('regular', 'reversing')
        console.log("here once");
    }
    )
  })
  
  document.querySelector('#setting-button').addEventListener('click', () => {
    // pause();
    // modal.openModal();
  });
  
  document.querySelector('#playButton').addEventListener('click', () => {
    (!running) ? play() : pause();
  })


//DW about this 
let div = document.createElement("DIV");
document.body.appendChild(div);
div.style.position = "absolute";
div.style.left = 0;
div.style.top = 0;
div.style.backgroundColor = "white";
div.style.width = "auto";
div.style.height = "auto";
div.style.color = "black";
div.style.pointerEvents = "none";
div.style.display = "none";
div.style.padding = '10px'
div.style.borderRadius = '1rem'

let bar = document.querySelectorAll(".bar");
bar.forEach(b=> {
    b.addEventListener("mouseover", (evt) => {
      div.style.display = "block";
      div.style.left = evt.clientX + 20 + "px";
      div.style.top = evt.clientY + "px";
      div.innerHTML = parseInt(evt.target.style.height, 10);
    });
})
