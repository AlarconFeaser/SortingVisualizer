function merge(arr, start, mid, end) 
{ 
    let start2 = mid + 1; 
  
    // If the direct merge is already sorted 
    if (arr[mid] <= arr[start2]) { 
        return; 
    } 
  
    // Two pointers to maintain start 
    // of both arrays to merge 
    while (start <= mid && start2 <= end) { 
  
        // If element 1 is in right place 
        if (arr[start] <= arr[start2]) { 
            start++; 
        } 
        else { 
            let value = arr[start2]; 
            let index = start2; 
  
            // Shift all the elements between element 1 
            // element 2, right by 1. 
            while (index != start) { 
                arr[index] = arr[index - 1]; 
                //swap
                index--; 
            } 
            arr[start] = value; 
            //swap

            // Update all the pointers 
            start++; 
            mid++; 
            start2++; 
        } 
    } 
} 
  
/* l is for left index and r is right index of the  
   sub-array of arr to be sorted */
function mergeSort(arr, l, r) 
{ 
    if (l < r) { 
  
        // Same as (l + r) / 2, but avoids overflow 
        // for large l and r 
        let m = l + (r - l) / 2; 
  
        // Sort first and second halves 
        mergeSort(arr, l, m); 
        mergeSort(arr, m + 1, r); 
  
        merge(arr, l, m, r); 
    } 
} 
  

export {mergeSort}