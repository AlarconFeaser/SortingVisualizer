import * as util from "../utils/util.js";

export const bubbleSort = (arr, callback) => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 1; j < arr.length - i; j++) {
        if (arr[j - 1] > arr[j]) {
          util.swap(j - 1, j, arr);
          callback(arr);
        }
      }
    }
  };

