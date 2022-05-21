import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openEditProfileForm,
  saveProfileButtonHandler,
  openAddCardForm,
  createButtonHandler,
  closePopup,
} from "./utils.js";

// CONSTANTS
// EditProfile form consts
const editProfilePopup = document.querySelector(".edit-popup");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileCloseButton = document.querySelector(
  ".edit-popup__close-button"
);
// AddCard form consts
const addCardForm = document.querySelector(".add-popup");
const addCardButton = document.querySelector(".profile__add-button");
const addCardCloseButton = document.querySelector(".add-popup__close-button");
const elementsList = document.querySelector(".elements__list");

// Image popup consts
const imageCloseButton = document.querySelector(".image-popup__close-button");

const formsList = Array.from(document.querySelectorAll(".form"));
const validatorsList = [];

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

// EVENT LISTENERS
// Edit Profile form listeners
editProfileButton.addEventListener("click", openEditProfileForm);
editProfileCloseButton.addEventListener("click", closePopup);
editProfilePopup.addEventListener("submit", saveProfileButtonHandler);
// Add Card form listeners
addCardButton.addEventListener("click", openAddCardForm);
addCardCloseButton.addEventListener("click", closePopup);
addCardForm.addEventListener("submit", createButtonHandler);
// Image popup listener
imageCloseButton.addEventListener("click", closePopup);

initialCards.forEach((card) => {
  const initialCard = new Card(card, ".elements__list-item");
  const initialCardElement = initialCard.generateCard();

  elementsList.prepend(initialCardElement);
});

formsList.forEach((form) => {
  const formValidator = new FormValidator(
    {
      inputSelector: ".form__input",
      submitButtonSelector: ".form__save",
      inactiveButtonClass: "form__save_disabled",
      inputErrorClass: "form__input_invalid",
      errorClass: "form__input-error_active",
    },
    form
  );

  validatorsList.push({ validator: formValidator, id: form.id });

  formValidator.enableValidation();
});

export { editProfilePopup, addCardForm, elementsList, validatorsList };
