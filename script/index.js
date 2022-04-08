// CONSTANTS
// Main container
const container = document.querySelector(".page");

// Edit form consts
const editForm = container.querySelector(".edit-popup");
const editButton = container.querySelector(".profile__edit-button");
const editCloseButton = editForm.querySelector(".edit-popup__close-button");
const nameField = editForm.querySelector("#name");
const aboutField = editForm.querySelector("#about");
const saveButton = editForm.querySelector(".form__save");
const currentName = container.querySelector(".profile__name-text");
const currentAbout = container.querySelector(".profile__about");

// Add form consts
const addForm = container.querySelector(".add-popup");
const addButton = container.querySelector(".profile__add-button");
const addCloseButton = addForm.querySelector(".add-popup__close-button");
const titleField = addForm.querySelector("#title");
const linkField = addForm.querySelector("#link");
const createButton = addForm.querySelector(".form__save");

// Image popup consts
const imagePopup = container.querySelector(".image-popup");
const imageCloseButton = imagePopup.querySelector(".image-popup__close-button");
const imageCaption = imagePopup.querySelector(".image-popup__caption");

// Initial cards array
const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
];

// FUNCTIONS
// Edit form functions
function handleEditButton() {
  nameField.value = currentName.textContent;
  aboutField.value = currentAbout.textContent;
  editForm.classList.add("edit-popup_opened");
}

function handleEditCloseButton() {
  editForm.classList.remove("edit-popup_opened");
}

function handleSaveButton(evt) {
  evt.preventDefault();
  currentName.textContent = nameField.value;
  currentAbout.textContent = aboutField.value;
  handleCloseButton();
}

// Add form functions
function handleAddButton() {
  addForm.classList.add("add-popup_opened");
}

function handleAddCloseButton() {
  addForm.classList.remove("add-popup_opened");
}

function handleCreateButton(evt) {
  evt.preventDefault();
  createElement(linkField.value, titleField.value);
  addForm.classList.remove("add-popup_opened");
}

// Image popup function
function handleImageCloseButton() {
  imagePopup.classList.remove("image-popup_opened");
}

// Element creator function
function createElement(link, name) {
  const elementTemplate = document.querySelector("#element").content;
  const elementsList = document.querySelector(".elements__list");

  const element = elementTemplate
    .querySelector(".elements__list-item")
    .cloneNode(true);

  element.querySelector(".element__image").src = link;
  element.querySelector(".element__caption-text").textContent = name;

  element.querySelector(".element__image").addEventListener("click", (evt) => {
    imagePopup.classList.add("image-popup_opened");
    imagePopup.querySelector(".image-popup__image").src = evt.target.src;
    imagePopup.querySelector(".image-popup__caption").textContent = name;
  });

  element
    .querySelector(".element__remove-button")
    .addEventListener("click", () => {
      element.remove();
    });

  element
    .querySelector(".element__like-button")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like-button_active");
    });

  elementsList.prepend(element);
}

// EVENT LISTENERS
// Edit form listeners
editButton.addEventListener("click", handleEditButton);
editCloseButton.addEventListener("click", handleEditCloseButton);
editForm.addEventListener("submit", handleSaveButton);
// Add form listeners
addButton.addEventListener("click", handleAddButton);
addCloseButton.addEventListener("click", handleAddCloseButton);
addForm.addEventListener("submit", handleCreateButton);
// Image popup listener
imageCloseButton.addEventListener("click", handleImageCloseButton);

// INITIAL FUNCTION
initialCards.forEach((card) => {
  createElement(card.link, card.name);
});
