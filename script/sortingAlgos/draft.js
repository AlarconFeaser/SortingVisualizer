const activeButtons = () => {
    if (currentStep < 0)
      currentStep = finalIteration;
    document.querySelectorAll(".control-canvas, .control")
    .forEach((b) => {
      b.addEventListener("click", () => {
        if(b.id =="firstButton"){
          currentStep = 0;
          drawArray(canvasArr[currentStep]);
        }
        else if (b.id == "prevButton") {
          if (currentStep - 1 > 0) {
            drawArray(canvasArr[--currentStep]);
          }
        } else if (b.id == "nextButton") {
          if (currentStep <= finalIteration - 1) {
            drawArray(canvasArr[++currentStep]);
          }
        } else if (b.id == "finalButton") {
          currentStep = finalIteration;
          drawArray(canvasArr[currentStep]);
        }
      });
    });
  };