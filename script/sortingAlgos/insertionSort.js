// import {swapArray} from '../util/util.js'

function insertionSort(arr){
    let swaps  = [];
    let len = arr.length; 
  
    for(let i = 1; i < len; ++i){
        let key = arr[i];
        let j = i - 1;
        while(j  >= 0 && arr[j] > key){
                arr[j + 1] = arr[j]; //bubble?
                // swaps.push([j+1, j])
                swaps.push([j, j + 1]);
                j--;
        }
        if((j + 1) != i){
            // console.log(key, arr[i]);
            arr[j + 1] = key;
            // swaps.push([j + 1, i])
        }

    }
    

    return swaps;
}

export {insertionSort}