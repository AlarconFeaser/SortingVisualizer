import {swapArray} from '../util/util.js'

function selectionSort(arr){
    let swaps  = [];

    let len = arr.length; 
  
    // One by one move boundary of unsorted subarray 
    for (let i = 0; i < len-1; ++i) 
    { 
        // Find the minimum element in unsorted array 
        let minIndex = i; 
        for (let j = i+1; j < len; ++j) 
            if (arr[j] < arr[minIndex]) 
                minIndex = j; 

        // Swap the found minimum element with the first 
        // element 
        swapArray(i, minIndex, arr)
        swaps.push([i, minIndex]);
    } 

    return swaps;
}

export {selectionSort}