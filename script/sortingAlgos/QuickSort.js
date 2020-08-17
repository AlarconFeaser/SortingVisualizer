import * as util from "../utils/util.js";
import * as canvas from "../utils/canvas.js";
import * as modal from "../utils/modal.js";


    let arr = util.generateArray(50, 50);
    let originY = canvas.height - 20;
    let width = canvas.width/arr.length;
    let spacing = width * 0.1;
    let heightScale = canvas.height * 0.1;
    let margin = spacing / 2;

    const drawArray = (arr) => {
        arr.forEach((element, index) => {
          let posX = index * width + margin;
          let rectHeight = heightScale + element * 10;
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

    const currentInterval = setInterval(() => {


    }, 1000/60);






