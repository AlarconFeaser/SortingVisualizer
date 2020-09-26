const swapArray = (x, y, arr) => [arr[x], arr[y]] = [arr[y], arr[x]];

const shuffleArray = (arr) => {
    let swaps = [];
    const len = arr.length;
    for (let i = 0; i < len; ++i) {
      const pos = Math.ceil(Math.random() * (len - i - 1)) + i
      if(i != pos){
        swapArray(i, pos, arr);
        swaps.push([i, pos])
      }
    }
    return {arr, swaps};
  }

  const generateArray = (size, max_height, padding = 5) => {
    let arr = [];
    max_height -= (padding << 1)
    max_height -= max_height % size
    const min_size = max_height / size;
    const chunk = max_height / size;
    for (let i = 0; i < size; ++i) 
      arr[i] = i * chunk + min_size;
    return shuffleArray(arr).arr;
      // return arr
  };


export {swapArray, shuffleArray, generateArray}