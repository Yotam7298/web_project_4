// CONSTANTS
// Main container
const container = document.querySelector(".page");

// Edit form consts
const editForm = container.querySelector(".edit-popup");
const editButton = container.querySelector(".profile__edit-button");
const editCloseButton = editForm.querySelector(".edit-popup__close-button");
const nameField = editForm.querySelector("#name");
const aboutField = editForm.querySelector("#about");
const currentName = container.querySelector(".profile__name-text");
const currentAbout = container.querySelector(".profile__about");

// Add form consts
const addForm = container.querySelector(".add-popup");
const addButton = container.querySelector(".profile__add-button");
const addCloseButton = addForm.querySelector(".add-popup__close-button");

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
  fillProfileForm();
  openPopup(editForm);
}
function fillProfileForm() {
  nameField.value = currentName.textContent;
  aboutField.value = currentAbout.textContent;
}

function handleEditCloseButton() {
  closePopup(editForm);
}

function handleSaveProfileButton(evt) {
  evt.preventDefault();
  currentName.textContent = nameField.value;
  currentAbout.textContent = aboutField.value;
  handleEditCloseButton();
}

// Add form functions
function handleAddButton() {
  openPopup(addForm);
}

function handleAddCloseButton() {
  closePopup(addForm);
}

function handleCreateButton(evt) {
  const newCard = {
    name: addForm.querySelector("#title").value,
    link: addForm.querySelector("#link").value,
  };

  evt.preventDefault();
  renderCard(newCard);
  addForm.querySelector(".form").reset();
  closePopup(addForm);
}

// Image popup function
function handleImageCloseButton() {
  closePopup(imagePopup);
}

// Element creator function
function createElement(card) {
  const elementTemplate = document.querySelector("#element").content;
  const element = elementTemplate
    .querySelector(".elements__list-item")
    .cloneNode(true);
  const elementImage = element.querySelector(".element__image");
  const elementText = element.querySelector(".element__caption-text");

  elementImage.src = card.link;
  elementImage.alt = `A user uploaded photo named ${card.name}`;
  elementText.textContent = card.name;

  elementImage.addEventListener("click", (evt) => {
    openPopup(imagePopup);
    imagePopup.querySelector(".image-popup__image").src = evt.target.src;
    imagePopup.querySelector(".image-popup__caption").textContent = card.name;
  });

  element
    .querySelector(".element__remove-button")
    .addEventListener("click", removeElement(element));

  element
    .querySelector(".element__like-button")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like-button_active");
    });

  return element;
}

//UNIVERSAL FUNCTIONS
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function removeElement(element) {
  element.remove();
}

function renderCard(newCard) {
  const elementsList = document.querySelector(".elements__list");

  element = createElement(newCard);

  elementsList.prepend(element);
}

// EVENT LISTENERS
// Edit form listeners
editButton.addEventListener("click", handleEditButton);
editCloseButton.addEventListener("click", handleEditCloseButton);
editForm.addEventListener("submit", handleSaveProfileButton);
// Add form listeners
addButton.addEventListener("click", handleAddButton);
addCloseButton.addEventListener("click", handleAddCloseButton);
addForm.addEventListener("submit", handleCreateButton);
// Image popup listener
imageCloseButton.addEventListener("click", handleImageCloseButton);

// INITIAL FUNCTION
initialCards.forEach((card) => {
  renderCard(card);
});
