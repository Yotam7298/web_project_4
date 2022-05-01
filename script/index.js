import { resetValidation } from "./validate.js";

// CONSTANTS
// Main container
const container = document.querySelector(".page");

// EditProfile form consts
const editProfileForm = container.querySelector(".edit-popup");
const editProfileButton = container.querySelector(".profile__edit-button");
const editProfileCloseButton = editProfileForm.querySelector(
  ".edit-popup__close-button"
);
const nameField = editProfileForm.querySelector("#name-input");
const aboutField = editProfileForm.querySelector("#about-input");
const currentName = container.querySelector(".profile__name-text");
const currentAbout = container.querySelector(".profile__about");

// AddCard form consts
const addCardForm = container.querySelector(".add-popup");
const addCardButton = container.querySelector(".profile__add-button");
const addCardCloseButton = addCardForm.querySelector(
  ".add-popup__close-button"
);
const titleField = addCardForm.querySelector("#title-input");
const linkField = addCardForm.querySelector("#link-input");
const elementTemplate = document.querySelector("#element").content;
const elementsList = document.querySelector(".elements__list");

// Image popup consts
const imagePopup = container.querySelector(".image-popup");
const imageCloseButton = imagePopup.querySelector(".image-popup__close-button");

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
// EditProfile form functions
function openEditProfileForm() {
  fillProfileForm();
  openPopup(editProfileForm);

  resetValidation(editProfileForm, {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save",
    inactiveButtonClass: "form__save_disabled",
    inputErrorClass: "form__input_invalid",
    errorClass: "form__input-error_active",
  });
}

function fillProfileForm() {
  nameField.value = currentName.textContent;
  aboutField.value = currentAbout.textContent;
}

function closeEditProfileForm() {
  closePopup(editProfileForm);
}

function saveProfileButtonHandler(evt) {
  evt.preventDefault();
  currentName.textContent = nameField.value;
  currentAbout.textContent = aboutField.value;
  closeEditProfileForm();
}

// Add form functions
function openAddCardForm() {
  addCardForm.querySelector(".form").reset();

  openPopup(addCardForm);
  resetValidation(addCardForm, {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save",
    inactiveButtonClass: "form__save_disabled",
    inputErrorClass: "form__input_invalid",
    errorClass: "form__input-error_active",
  });
}

function closeAddCardForm() {
  closePopup(addCardForm);
}

function createButtonHandler(evt) {
  evt.preventDefault();

  const newCard = {
    name: titleField.value,
    link: linkField.value,
  };

  renderCard(newCard);
  closePopup(addCardForm);
}

// Image popup function
function openImagePopup(card, evt) {
  const popupImage = imagePopup.querySelector(".image-popup__image");
  const popupCaption = imagePopup.querySelector(".image-popup__caption");

  openPopup(imagePopup);
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = card.name;
}
function closeImagePopup() {
  closePopup(imagePopup);
}

// Element creator function
function createElement(card) {
  const element = elementTemplate
    .querySelector(".elements__list-item")
    .cloneNode(true);
  const elementImage = element.querySelector(".element__image");
  const elementText = element.querySelector(".element__caption-text");

  elementImage.src = card.link;
  elementImage.alt = `A user uploaded photo titled ${card.name}`;
  elementText.textContent = card.name;

  elementImage.addEventListener("click", (evt) => {
    openImagePopup(card, evt);
  });

  element
    .querySelector(".element__remove-button")
    .addEventListener("click", () => removeElement(element));

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

  addPopupClosingListeners(popup);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  removePopupClosingListeners(popup);
}

function removeElement(element) {
  element.remove();
}

function renderCard(newCard) {
  const element = createElement(newCard);

  elementsList.prepend(element);
}

function addPopupClosingListeners(popup) {
  popup.addEventListener("mousedown", checkClickCloseTrigger);
  document.addEventListener("keydown", checkKeyCloseTrigger);
}

function removePopupClosingListeners(popup) {
  popup.removeEventListener("mousedown", checkClickCloseTrigger);
  document.removeEventListener("keydown", checkKeyCloseTrigger);
}

function checkKeyCloseTrigger(evt) {
  const openPopup = document.querySelector(".popup_opened");

  if (evt.key === "Escape") {
    closePopup(openPopup);
  }
}

function checkClickCloseTrigger(evt) {
  const openPopup = document.querySelector(".popup_opened");

  if (evt.target == openPopup) {
    closePopup(openPopup);
  }
}

// EVENT LISTENERS
// EditProfile form listeners
editProfileButton.addEventListener("click", openEditProfileForm);
editProfileCloseButton.addEventListener("click", closeEditProfileForm);
editProfileForm.addEventListener("submit", saveProfileButtonHandler);
// Add form listeners
addCardButton.addEventListener("click", openAddCardForm);
addCardCloseButton.addEventListener("click", closeAddCardForm);
addCardForm.addEventListener("submit", createButtonHandler);
// Image popup listener
imageCloseButton.addEventListener("click", closeImagePopup);

// INITIAL FUNCTIONS
initialCards.forEach((card) => {
  renderCard(card);
});
