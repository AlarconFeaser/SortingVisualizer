import {swapArray} from '../util/util.js'

function quickSort(arr, low, high, swaps) {
  if (low < high) {
    let pi = partition(arr, low, high, swaps);
    quickSort(arr, low, pi - 1, swaps);
    quickSort(arr, pi + 1, high, swaps);
  }
}

function partition(arr, low, high, swaps) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) 
  {
    if (arr[j] < pivot) 
    {
      i++;
      if(i != j){
        swapArray(i, j, arr);
        swaps.push([i, j])
      }
    }
  }
  let temp = i + 1;
  if(temp != high){
    swapArray(i + 1, high, arr);
    swaps.push([i + 1, high]);
  }
    return (i + 1)
}

function swapsQuickSort(arr, swaps){
    quickSort(arr, 0, arr.length - 1, swaps )
}

export{swapsQuickSort}