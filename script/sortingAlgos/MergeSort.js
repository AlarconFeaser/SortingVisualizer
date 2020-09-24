import {swapArray} from '../util/util.js'

// function merge(arr, start, mid, end)
// {
//     let start2 = mid + 1;

//     // If the direct merge is already sorted
//     if (arr[mid] <= arr[start2]) {
//         return;
//     }

//     // Two pointers to maintain start
//     // of both arrays to merge
//     while (start <= mid && start2 <= end) {

//         // If element 1 is in right place
//         if (arr[start] <= arr[start2]) {
//             start++;
//         }
//         else {
//             let value = arr[start2];
//             let index = start2;

//             // Shift all the elements between element 1
//             // element 2, right by 1.
//             while (index != start) {
//                 arr[index] = arr[index - 1];
//                 //swap
//                 index--;
//             }
//             arr[start] = value;
//             //swap

//             // Update all the pointers
//             start++;
//             mid++;
//             start2++;
//         }
//     }
// }



// /* l is for left index and r is right index of the
//    sub-array of arr to be sorted */
// function mergeSort(arr, l, r)
// {
//     if (l < r) {

//         // Same as (l + r) / 2, but avoids overflow
//         // for large l and r
//         let m = l + (r - l) / 2;

//         // Sort first and second halves
//         mergeSort(arr, l, m);
//         mergeSort(arr, m + 1, r);

//         merge(arr, l, m, r);
//     }
// }



  /*
MERGE SORT IN-PLACE

group size starts at 1

compare two adjacent groups at a time
create pointer to start of each group
compare values at pointers, swap accordingly
keep going until both groups are sorted
move to next two groups, repeat for entire array

then double group size and repeat

  */


 function mergeSort(arr) {
	let groupSize = 1;
	const len = arr.length;

	 while(groupSize <= len >> 1) {  // stop condition
		let pos = 0;
		let i = pos;
		let j = pos + groupSize;
		const m = groupSize;
		const n = Math.min(groupSize, len - j);
		while (i < pos + m && j < pos + groupSize + n) 
		{
			if (arr[i] > arr[j])
			{
				swapArray(i, j, arr);

			}

		}
		 for(let i = pos + groupSize; i < pos ; i += groupSize) {  // loop through pairs of groups
		   for(let j = pos + i - groupSize; j < groupSize; ++j) {  // merge groups
			   if(arr[j] > arr[j + 1])  {
				   swapArray(j, j+1, arr);
			   }
		   }
		 }
		 groupSize = groupSize << 1;
	 }
}

export {mergeSort}
