import * as util from "../utils/util.js";
import * as canvas from "../utils/canvas.js";
import * as modal from "../utils/modal.js";


    let arr = util.generateArray(300, 50);
    let originY = canvas.height - 20;
    let width = canvas.width/arr.length;
    let spacing = width * 0.1;
    let heightScale = canvas.height * 0.1;
    let margin = spacing / 2;

    
    const drawArray = (arr, min) => {
        arr.forEach((element, index) => {
          let posX = index * width + margin;
          let rectHeight = heightScale + element * 10;
          min == index ? 
          canvas.ctx.fillStyle = "red" : 
          canvas.ctx.fillStyle = "white";
          
          canvas.ctx.fillRect(
            posX,
            originY -rectHeight ,
            width - spacing,
            rectHeight
          );
        });
      };


    //SELECTION SORT.
    let i = 0;
    let size = arr.length;
    
    const currentInterval = setInterval(() => {
      if (i  == size - 1){
        clearInterval(currentInterval);
        modal.openModal();
        console.log(arr);
      } 

      let min_index = i;
      let j = i + 1;

      if(j < size)
          if(arr[j] < arr[min_index])
              min_index = j
    
      for (let j = i + 1; j < size ; j++) 
        if(arr[j] < arr[min_index])
          min_index = j
      
      util.swap(min_index, i , arr);
      //Draws canvas
      canvas.paintCanvas("black");
      //Draw  array
      drawArray(arr, min_index);

      i++;
    }, 1000/60);






