const swapArray = (x, y, arr) => [arr[x], arr[y]] = [arr[y], arr[x]];

const shuffleArray = (arr) => {
    let swaps = [];
    const len = arr.length;
    for (let i = 0; i < len; ++i) {
      const pos = Math.ceil(Math.random() * (len - i - 1)) + i
      swapArray(i, pos, arr);
      if(i != pos) swaps.push([i, pos])
    }
    return {arr, swaps};
  }

  const generateArray = (size, max_num, pad = 5) => {
    let arr = [];
    const min_size = max_num / 25;
    const chunk = (max_num - pad * 2) / size;
    for (let i = 0; i < size; ++i) 
      arr[i] = i * chunk + min_size;
    // return shuffleArray(arr);
      return arr
  };


export {swapArray, shuffleArray, generateArray}