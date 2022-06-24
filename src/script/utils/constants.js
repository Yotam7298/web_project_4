// EditProfile form consts
const editProfileButton = document.querySelector(".profile__edit-button");

const userDataInput = {
  name: document.querySelector("#name-input"),
  about: document.querySelector("#about-input"),
};
const editAvatarButton = document.querySelector(".profile__avatar-edit");

// AddCard form consts
const addCardButton = document.querySelector(".profile__add-button");
const elementSelector = ".elements__list-item";
const elementsContainer = document.querySelector(".elements__list");

// Validator consts
const validatorsList = [];
const formsList = Array.from(document.querySelectorAll(".form"));

// Initial function consts
const config = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_disabled",
  inputErrorClass: "form__input_invalid",
  errorClass: "form__input-error_active",
};

export {
  editProfileButton,
  editAvatarButton,
  userDataInput,
  addCardButton,
  elementSelector,
  elementsContainer,
  validatorsList,
  formsList,
  config,
};
