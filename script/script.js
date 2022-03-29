const container = document.querySelector(".page");
const editForm = container.querySelector(".popup");
const editButton = container.querySelector(".profile__edit-button");
const closeButton = editForm.querySelector(".popup__close-button");
const saveButton = editForm.querySelector(".form__save");
const currentName = container.querySelector(".profile__name-text");
const currentAbout = container.querySelector(".profile__about");
const nameField = editForm.querySelector("#name");
const aboutField = editForm.querySelector("#about");
// const likeButton = container.querySelectorAll(".element__like-button");

// function handleLikeButton() {
//   likeButton.src = "./images/like-button_active.svg";
// }

function handleEditButton() {
  nameField.value = currentName.textContent;
  aboutField.value = currentAbout.textContent;
  editForm.classList.add("popup_opened");
}

function handleCloseButton() {
  editForm.classList.remove("popup_opened");
}

function handleSaveButton(event) {
  event.preventDefault();
  currentName.textContent = nameField.value;
  currentAbout.textContent = aboutField.value;
  handleCloseButton();
}

// likeButton.addEventListener("click", handleLikeButton);
editButton.addEventListener("click", handleEditButton);
closeButton.addEventListener("click", handleCloseButton);
editForm.addEventListener("submit", handleSaveButton);
