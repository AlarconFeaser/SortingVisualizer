import * as util from "../utils/util.js";
import * as canvas from "../utils/canvas.js";
import * as modal from "../utils/modal.js";


    let arr = util.generateArray(300, 45);
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

     //insertion sort
    let i = 1;
    const currentInterval = setInterval(() => {
        if (i == arr.length){
            clearInterval(currentInterval);
            modal.openModal();
            console.log(arr);
          } 

        let key_index = i;
        let key = arr[i];
        let j = i - 1;
        drawArray(arr);
        while(arr[j] > key && j >= 0){
            arr[j + 1] = arr[j];
            canvas.paintCanvas("black");
            drawArray(arr, key_index);
            j = j - 1;

        }

        key_index = j + 1;

        arr[j + 1 ] = key;
        canvas.paintCanvas("black");
        drawArray(arr, key_index);
        i++;
    }, 1000/15);






