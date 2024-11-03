function setupDialog(showId, closeId, dialogId) {
  const showButton = document.getElementById(showId);
  const closeButton = document.getElementById(closeId);
  const dialog = document.getElementById(dialogId);

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
}

setupDialog("showInputFormat", "closeInputFormat", "inputFormat");
setupDialog("showConfigFormat", "closeConfigFormat", "configFormat");
