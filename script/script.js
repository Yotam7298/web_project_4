let container = document.querySelector(".page");
let editForm = container.querySelector(".popup");
let editButton = container.querySelector(".profile__edit-button");
let closeButton = editForm.querySelector(".popup__close-button");
let saveButton = editForm.querySelector(".form__save");
let currentName = container.querySelector(".profile__name-text");
let currentAbout = container.querySelector(".profile__about");
let nameField = editForm.querySelector("#name");
let aboutField = editForm.querySelector("#about");
let likeButton = container.querySelector(".element__like-button");

function handleLikeButton() {
  likeButton.src = "./images/like-button_active.svg";
}

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
  editForm.classList.remove("popup_opened");
}

likeButton.addEventListener("click", handleLikeButton);
editButton.addEventListener("click", handleEditButton);
closeButton.addEventListener("click", handleCloseButton);
saveButton.addEventListener("click", handleSaveButton);
