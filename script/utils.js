import Card from "./Card.js";
import {
  editProfilePopup,
  addCardForm,
  validatorsList,
  elementsList,
} from "./index.js";

const nameField = document.querySelector("#name-input");
const aboutField = document.querySelector("#about-input");
const currentName = document.querySelector(".profile__name-text");
const currentAbout = document.querySelector(".profile__about");

const titleField = document.querySelector("#title-input");
const linkField = document.querySelector("#link-input");

export function openEditProfileForm() {
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

export function saveProfileButtonHandler(evt) {
  evt.preventDefault();
  currentName.textContent = nameField.value;
  currentAbout.textContent = aboutField.value;
  closePopup();
}

export function openAddCardForm() {
  addCardForm.querySelector(".form").reset();

  openPopup(addCardForm);

  const currentValidator = getFormValidator(addCardForm.querySelector(".form"));

  currentValidator.resetValidation();
}

export function createButtonHandler(evt) {
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

function getFormValidator(form) {
  return validatorsList.find((valid) => valid.id === form.id).validator;
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");

  addPopupClosingListeners(popup);
}
export function closePopup() {
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
