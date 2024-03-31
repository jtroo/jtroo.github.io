const showButton = document.getElementById("showInputFormat");
const closeButton = document.getElementById("closeInputFormat");
const dialog = document.getElementById("inputFormat");

function closeModalWithKeys(event) {
  if (event.key === 'Enter' || event.key === 'Escape') {
    event.preventDefault();
    dialog.close();
    removeEventListener('keydown', closeModalWithKeys);
  }
};

showButton.addEventListener("click", () => {
  dialog.showModal();
  addEventListener('keydown', closeModalWithKeys);
});

closeButton.addEventListener("click", () => {
  dialog.close();
  removeEventListener('keydown', closeModalWithKeys);
});
