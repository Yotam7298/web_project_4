import { FormValidator } from "./validate.js";

// CONSTANTS
// Main container
const container = document.querySelector(".page");

// EditProfile form consts
const editProfilePopup = container.querySelector(".edit-popup");
const editProfileButton = container.querySelector(".profile__edit-button");
const editProfileCloseButton = editProfilePopup.querySelector(
  ".edit-popup__close-button"
);
const nameField = editProfilePopup.querySelector("#name-input");
const aboutField = editProfilePopup.querySelector("#about-input");
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

// FUNCTIONS
// EditProfile form functions
function openEditProfileForm() {
  fillProfileForm();
  openPopup(editProfilePopup);

  const currentValidator = getFormValidator(
    editProfilePopup.querySelector(".form")
  );
  currentValidator.resetValidation();
}

function fillProfileForm() {
  nameField.value = currentName.textContent;
  aboutField.value = currentAbout.textContent;
}

function saveProfileButtonHandler(evt) {
  evt.preventDefault();
  currentName.textContent = nameField.value;
  currentAbout.textContent = aboutField.value;
  closePopup();
}

// Add form functions
function openAddCardForm() {
  addCardForm.querySelector(".form").reset();

  openPopup(addCardForm);

  const currentValidator = getFormValidator(addCardForm.querySelector(".form"));

  currentValidator.resetValidation();
}

function createButtonHandler(evt) {
  evt.preventDefault();

  const newCard = new Card(
    {
      name: titleField.value,
      link: linkField.value,
    },
    ".elements__list-item"
  );

  elementsList.prepend(newCard.generateCard());

  closePopup();
}

//UNIVERSAL FUNCTIONS
function openPopup(popup) {
  popup.classList.add("popup_opened");

  addPopupClosingListeners(popup);
}

function closePopup() {
  const openPopup = document.querySelector(".popup_opened");

  openPopup.classList.remove("popup_opened");

  removePopupClosingListeners(openPopup);
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
  if (evt.key === "Escape") {
    closePopup();
  }
}

function checkClickCloseTrigger(evt) {
  if (evt.target == document.querySelector(".popup_opened")) {
    closePopup();
  }
}

function getFormValidator(form) {
  return validatorsList.find((valid) => valid.id === form.id).validator;
}

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

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = cardSelector;
  }

  _getTemplate() {
    const cardElement = elementTemplate
      .querySelector(this._selector)
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__remove-button")
      .addEventListener("click", () => {
        this._removeElement(this._element);
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", (evt) => {
        this._openImagePopup({ name: this._name, link: this._link }, evt);
      });

    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("element__like-button_active");
      });
  }

  _removeElement(element) {
    element.remove();
  }

  _openImagePopup(card, evt) {
    const popupImage = imagePopup.querySelector(".image-popup__image");
    const popupCaption = imagePopup.querySelector(".image-popup__caption");

    openPopup(imagePopup);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = card.name;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector(".element__caption-text").textContent =
      this._name;
    this._element.querySelector(".element__image").src = this._link;

    return this._element;
  }
}

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
