import "./index.css";

import Api from "../script/components/Api.js";
import Card from "../script/components/Card.js";
import FormValidator from "../script/components/FormValidator.js";
import Section from "../script/components/Section.js";
import PopupWithForm from "../script/components/PopupWithForm.js";
import PopupWithImage from "../script/components/PopupWithImage.js";
import UserInfo from "../script/components/UserInfo.js";
import {
  editProfileButton,
  editProfileCloseButton,
  userDataInput,
  addCardButton,
  addCardCloseButton,
  elementSelector,
  imageCloseButton,
  validatorsList,
  formsList,
  config,
  initialCards,
} from "../script/utils/constants.js";
import { resetValidator } from "../script/utils/utils.js";

function fillProfileForm(currentInfo) {
  userDataInput.name.value = currentInfo.name;
  userDataInput.title.value = currentInfo.title;
}

//Classes instances

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo("#profile-name", "#profile-title");

const imagePopup = new PopupWithImage(".image-popup");

const createCard = (item) => {
  const card = new Card(item, elementSelector, (evt) => {
    imagePopup.open(evt);
  });
  const generatedCard = card.generateCard();
  return generatedCard;
};

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".elements__list"
);

const editProfilePopup = new PopupWithForm(".edit-popup", (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(userDataInput.name.value, userDataInput.title.value);
  editProfilePopup.close();
});

const addCardPopup = new PopupWithForm(".add-popup", (evt) => {
  evt.preventDefault();
  const cardData = {
    name: document.querySelector("#title-input").value,
    link: document.querySelector("#link-input").value,
  };
  const newCard = createCard(cardData);

  cardsSection.addItem(newCard);
  addCardPopup.close();
});

// EVENT LISTENERS
// Edit Profile form listeners
editProfileButton.addEventListener("click", () => {
  const userCurrentInfo = userInfo.getUserInfo();
  fillProfileForm(userCurrentInfo);

  editProfilePopup.open();
  resetValidator();
});
editProfileCloseButton.addEventListener("click", () => {
  editProfilePopup.close();
});

// Add Card form listeners
addCardButton.addEventListener("click", () => {
  addCardPopup.open();

  resetValidator();
});
addCardCloseButton.addEventListener("click", () => {
  addCardPopup.close();
});

// Image popup listener
imageCloseButton.addEventListener("click", () => {
  imagePopup.close();
});

// Initial functions
cardsSection.renderer();
formsList.forEach((form) => {
  const formValidator = new FormValidator(config, form);

  validatorsList.push({ validator: formValidator, id: form.id });

  formValidator.enableValidation();
});
