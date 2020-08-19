// Get the modal
var modal = document.getElementById("myModal");
const openModal= function() {
  modal.style.display = "block";
}

const closeModal = function() {
  modal.style.display = "none";
}

// document.body.addEventListener('click', () => {
//   if(modal.style.display == "block"){
//     closeModal();
//   }
// })


export {openModal, closeModal}