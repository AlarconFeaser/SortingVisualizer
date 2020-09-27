import {swapArray} from '../util/util.js'

const bubbleSort = (arr) => {
  console.log("In bubble sort");
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

  export {bubbleSort}