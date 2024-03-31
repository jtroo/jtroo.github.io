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

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
  addEventListener('keydown', closeModalWithKeys);
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
  removeEventListener('keydown', closeModalWithKeys);
});
