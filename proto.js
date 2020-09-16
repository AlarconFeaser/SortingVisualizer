const generateArray = (size, max_num) => {
    let arr = [];
    for(let i = 0; i < size; ++i)
        arr[i] = Math.floor(Math.random() * max_num);
    return arr
}

const parent_div = document.querySelector('.parent')
const size = 35
let arr = generateArray(size, Math.floor(parent_div.clientHeight))
let divs = [];

const createDivsInsideParent = num => { 
    const padding = 10;
    const width = (parent_div.clientWidth - (padding*2) ) / size;
    const start = parent_div.offsetLeft;
    const bottom = padding + parent_div.offsetTop; //offesetTop should be the same as margin top and bottom

    for(let i = 0; i < num ; i++){
        const div = document.createElement('div');
        div.classList.add('bar');
        // let height = Math.round(parentHeight * (arr[i]*.1));
        let height = arr[i];
        div.style.position = 'absolute'
        div.style.width = width - 10 + 'px'
        div.style.left = start + ( i * width)  + padding +  'px'
        div.style.height = height + 'px'
        // div.style.top = (bottom + height )+  'px';
        div.style.bottom = bottom +  'px'
        divs.push(div);
        parent_div.appendChild(div); 
    } 
}

function swapDivs(d1, d2){
    let first =  d1.style.left;
    let second =  d2.style.left
    d1.style.left = second
    d2.style.left = first
}

createDivsInsideParent(size);
parent_div.addEventListener('click', () => {
    swapDivs(divs[0], divs[1]);
    // let r1 = Math.floor(Math.random() * arr.length);
    // let r2 = Math.floor(Math.random() * (arr.length - 1));
    // if (r1 == r2)
    //     r2++;
    // if (r2 < r1)
    //     [r1, r2] = [r2, r1];
    // let n1 = parent_div.childNodes[r1 + 1];
    // let n2 = parent_div.childNodes[r2 + 1];
    // let x1 = n1.offsetLeft;
    // let x2 = n2.offsetLeft;
    // if (x1 == undefined)
    //     x1 = 0;
    // console.log(r1, r2)
    // console.log(x1, x2)
    // // parent_div.childNodes[r1 + 1].style.left = x2;
    // // parent_div.childNodes[r2 + 1].style.left = x1;
    // n2.before(parent_div.childNodes[r1 + 1])
    // n1.before(parent_div.childNodes[r2 + 1])
    //     // parent_div.insertAfter(parent_div.childNodes[r1], parent_div.childNodes[r2])
    //     // parent_div.childNode[r1].before(parent_div.childNode[r2])
});

// let i = 0;
document.querySelector('.bar').addEventListener('transitionend', () => { 
    //  why is this on parent div?  how about each div inside? oh right mb 
    //  it should still trigger twice, but in practice we might want to only add it to a single div at a time, then remove on trigger
    //this, right ,but this gets trigger twice in every animation
    // i thought of doing something similar to what we are doing in the interval 
    console.log("animationEnd")
    // i++;
});

//Yo can you see this?  YES great
let i = 0;

// let currentInterval = setInterval(() => { // can we avoid using intervals entirely? im pretty sure we can, but dk how
//     if(i == divs.length - 1) {
//         clearInterval(currentInterval)
//         console.log("done");
//     }
//     for(let j = 0; i < divs.length; ++j){
//         if(divs[i].style.height > divs[j].style.height){
//             console.log(divs[i].style.height,  divs[j].style.height);
//             swapDivs(divs[i], divs[j]);
//     }
//     }
//     i++;
// }, 1000)


// while(i  != divs.length - 1){
//     let j = 0;
//     let currentInterval = setInterval(()=>{
//         if(j == divs.length - 1) {
//             clearInterval(currentInterval)
//             console.log("done");
//             divs.forEach(d => console.log(d.style.height))
//         }
//         if(divs[i].style.height > divs[j].style.height){
//                 console.log(divs[i].style.height,  divs[j].style.height);
//                 swapDivs(divs[i], divs[j]);
//         }
//         j++;
//     }, 1000)
//     ++i;
// }


