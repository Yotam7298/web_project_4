// EditProfile form consts
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileCloseButton = document.querySelector(
  ".edit-popup__close-button"
);
const userDataInput = {
  name: document.querySelector("#name-input"),
  title: document.querySelector("#about-input"),
};

// AddCard form consts
const addCardButton = document.querySelector(".profile__add-button");
const addCardCloseButton = document.querySelector(".add-popup__close-button");
const titleField = document.querySelector("#title-input");
const linkField = document.querySelector("#link-input");
const elementsList = document.querySelector(".elements__list");
const elementSelector = ".elements__list-item";

// Image popup consts
const imageCloseButton = document.querySelector(".image-popup__close-button");

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

export {
  editProfileButton,
  editProfileCloseButton,
  userDataInput,
  addCardButton,
  addCardCloseButton,
  titleField,
  linkField,
  elementsList,
  elementSelector,
  imageCloseButton,
  validatorsList,
  formsList,
  config,
  initialCards,
};
