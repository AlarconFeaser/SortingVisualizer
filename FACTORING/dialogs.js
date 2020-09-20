let dialogDiv = document.createElement("DIV");
let dialogSpan = document.createElement("SPAN");
dialogDiv.appendChild(dialogSpan);
dialogDiv.classList.add('dialogBox');
document.body.appendChild(dialogDiv);

// let timeout = setTimeout(()=>{
//     dialogDiv.style.display = "none"}, 5000)

export function dialogBox(text) {
    dialogDiv.style.display = "block";
    dialogSpan.innerHTML = text;
    dialogDiv.classList.add('dialogAnimation')
}

dialogDiv.addEventListener('transitionend', ()=>{
    dialogDiv.classList.remove('dialogAnimation')
    dialogDiv.style.display = 'none';
})