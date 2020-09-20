// document.querySelector('#setting-button').addEventListener('click', () => {
//   // pause();
//   // modal.openModal();
// });

// let currentDiv = document.createElement("DIV");
// let totalDiv = document.createElement("DIV");
// let divArr = [currentDiv, totalDiv]
// divArr.forEach( d => {
//     d.style.left = 0;
//     d.style.top = 0;
//     d.style.backgroundColor = "white";
//     d.style.position = "absolute";
//     d.style.WIDTH = "100px";
//     d.style.height = "auto";
//     d.style.color = "green";
//     d.style.zIndex = 1;
//     document.body.appendChild(d);
// })

// totalDiv.style.left  = '100px';
// totalDiv.innerHTML = swaps.length;
// currentDiv.innerHTML = current;

// console.log(divArr);

// //DW about this 
// let div = document.createElement("DIV");
// document.body.appendChild(div);
// div.style.position = "absolute";
// div.style.left = 0;
// div.style.top = 0;
// div.style.backgroundColor = "white";
// div.style.width = "auto";
// div.style.height = "auto";
// div.style.color = "black";
// div.style.pointerEvents = "none";
// div.style.display = "none";
// div.style.padding = '10px'
// div.style.borderRadius = '1rem'

// let bar = document.querySelectorAll(".bar");
// bar.forEach(b => {
//   b.addEventListener("mouseover", (evt) => {
//     console.log(evt.target.style.height)
    // div.style.display = "block";
    // div.style.left = evt.clientX + 20 + "px";
    // div.style.top = evt.clientY + "px";
    // div.innerHTML = parseInt(evt.target.style.height, 10);
//   });
// })

//Dialogs
// let dialogDiv = document.createElement("DIV");
// let closeButton = document.createElement("BUTTON");
// let dialogSpan = document.createElement("SPAN");
// closeButton.innerHTML = "OK"
// closeButton.style.position = 'relative';
// closeButton.addEventListener('click', () => {
//   dialogBox();
// })
// dialogDiv.appendChild(dialogSpan);
// dialogDiv.appendChild(closeButton);
// dialogDiv.classList.add('dialogBox');
// document.body.appendChild(dialogDiv);

// function dialogBox(text = undefined) {
//   if (text === undefined)
//     dialogDiv.style.display = "none";
//   else {
//     dialogDiv.style.display = "block";
//     dialogSpan.innerHTML = text;
//   }
// }