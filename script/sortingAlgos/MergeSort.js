export default { mergeSort : (arr) => {
    /*
        Performs a custom binary search on sorted ranges A=[i,m] 
        and B=[j,n].  Returns the number of elements to swap from
        the end of A with the beginning of B.
        Assumes: 
            i < m < j < n
            m through i and n through j are sorted
    */
    function binarySearchForPivot(i, m, j, n) {
        if (arr[m] <= arr[j]) // no swaps needed
            return 0;
        // console.log(`${i}, ${m}, ${j}, ${n}`, arr.slice(i, m + 1), arr.slice(j, n + 1))
        let high = Math.min(m - i + 1, n - j + 1); // number of elements
        let low = 0;
        let pivot = (high - low + 1) >> 1;
        while(high > low + pivot) {
            if (arr[m - pivot - low + 1] > arr[j + pivot + low - 1]) {  // check inside of pivot
                low += pivot;
                if (j + low > n || m - low < i // out of range
                    || arr[m - low] <= arr[j + low]) // check outside of pivot
                    return low;
            }
            else
                high = low + pivot
            pivot = (high - low + 1) >> 1;
        }
        return low + pivot;
    }

    function inPlaceMerge(i, m, j, n) {
        const numSwaps = binarySearchForPivot(i, m, j, n);
        if (numSwaps == 0)
            return;
        for (let x = 1; x <= numSwaps; ++x) // swap numSwaps elements along center pivot
            [arr[m - numSwaps + x], arr[j + x - 1]] = [arr[j + x - 1], arr[m - numSwaps + x]]
        if (m - i > 1) // sort left subarrays
            inPlaceMerge(i, m - numSwaps, m - numSwaps + 1, m)
        else if (m - i == 1 && arr[m] < arr[i])
            [arr[i], arr[m]] = [arr[m], arr[i]]
        if (n - j > 1) // sort right subarrays
            inPlaceMerge(j, j + numSwaps - 1, j + numSwaps, n)
        else if (n - j == 1 && arr[n] < arr[j])
            [arr[j], arr[n]] = [arr[n], arr[j]]
    }

    for (let i = 0; i < arr.length; i += 2) // pairwise sort of array
        if (arr[i] > arr[i + 1])
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
    let groupSize = 2;
    while ((groupSize << 1) < arr.length) { // merge groups in pairs
        const remainder = arr.length % (groupSize << 1);
        const len = arr.length - remainder;
        for (let i = 0; i < len; i += groupSize << 1)
            inPlaceMerge(i, i + groupSize - 1, i + groupSize, i + (groupSize << 1) - 1)
        if (remainder > groupSize)
            inPlaceMerge(len, len + groupSize - 1, len + groupSize, len + remainder - 1)
        groupSize <<= 1;
    } 
    inPlaceMerge(0, groupSize - 1, groupSize, arr.length - 1)
}}