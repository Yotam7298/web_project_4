// import Card from "./Card.js";

export const validatorsList = [];
export const elementsList = document.querySelector(".elements__list");

// export const addCardPopup = document.querySelector(".add-popup");
// export const editProfilePopup = document.querySelector(".edit-popup");

export const elementSelector = ".elements__list-item";

export const userDataInput = {
  name: document.querySelector("#name-input"),
  title: document.querySelector("#about-input"),
};

// export const nameField = document.querySelector("#name-input");
// export const aboutField = document.querySelector("#about-input");
// export const currentName = document.querySelector(".profile__name-text");
// export const currentAbout = document.querySelector(".profile__about");

export const titleField = document.querySelector("#title-input");
export const linkField = document.querySelector("#link-input");

// const imagePopup = document.querySelector(".image-popup");
// const popupImage = imagePopup.querySelector(".image-popup__image");
// const popupCaption = imagePopup.querySelector(".image-popup__caption");

// export function openEditProfileForm() {
//   fillProfileForm();
//   openPopup(editProfilePopup);
// }

// export function fillProfileForm() {
//   nameField.value = currentName.textContent;
//   aboutField.value = currentAbout.textContent;
// }

// export function saveProfileButtonHandler(evt) {
//   evt.preventDefault();
//   currentName.textContent = nameField.value;
//   currentAbout.textContent = aboutField.value;
//   closePopup();
// }

// export function openAddCardForm() {
//   addCardPopup.querySelector(".form").reset();

//   openPopup(addCardPopup);
// }

// export function createButtonHandler(evt) {
//   evt.preventDefault();

//   const newCard = new Card(
//     {
//       name: titleField.value,
//       link: linkField.value,
//     },
//     elementSelector
//   );

//   elementsList.prepend(newCard.generateCard());

//   closePopup();
// }

export function getFormValidator(formContainer) {
  const formId = formContainer.querySelector(".form").id;
  return validatorsList.find((valid) => valid.id === formId).validator;
}

// export function openPopup(popup) {
//   popup.classList.add("popup_opened");

//   addPopupClosingListeners(popup);
// }

// export function closePopup() {
//   const openPopup = document.querySelector(".popup_opened");

//   openPopup.classList.remove("popup_opened");

//   const currentValidator = getFormValidator(openPopup);
//   currentValidator.resetValidation();

//   removePopupClosingListeners(openPopup);
// }

// export function openImagePopup(card, evt) {
//   openPopup(imagePopup);
//   popupImage.src = evt.target.src;
//   popupImage.alt = evt.target.alt;
//   popupCaption.textContent = card.name;
// }

// function addPopupClosingListeners(popup) {
//   popup.addEventListener("mousedown", checkClickCloseTrigger);
//   document.addEventListener("keydown", checkKeyCloseTrigger);
// }

// function removePopupClosingListeners(popup) {
//   popup.removeEventListener("mousedown", checkClickCloseTrigger);
//   document.removeEventListener("keydown", checkKeyCloseTrigger);
// }

// function checkKeyCloseTrigger(evt) {
//   if (evt.key === "Escape") {
//     closePopup();
//   }
// }

// function checkClickCloseTrigger(evt) {
//   if (evt.target == document.querySelector(".popup_opened")) {
//     closePopup();
//   }
// }

export function resetValidator() {
  const openPopup = document.querySelector(".popup_opened");
  const currentValidator = getFormValidator(openPopup);
  currentValidator.resetValidation();
}
