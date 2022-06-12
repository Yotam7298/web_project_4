import "./styles/index.css";

import Card from "./script/components/Card.js";
import FormValidator from "./script/components/FormValidator.js";
import Section from "./script/components/Section.js";
import { PopupWithImage, PopupWithForm } from "./script/components/Popup.js";
import UserInfo from "./script/components/UserInfo.js";
import {
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
} from "./script/utils/constants.js";
import { resetValidator } from "./script/utils/utils.js";

//Classes instances
const initialSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, elementSelector, (evt) => {
        NEWimagePopup.open(evt);
      });
      const generatedCard = card.generateCard();
      return generatedCard;
    },
  },
  ".elements__list"
);
const NEWuserInfo = new UserInfo("#profile-name", "#profile-title");
const NEWimagePopup = new PopupWithImage(".image-popup");
const NEWeditProfilePopup = new PopupWithForm(".edit-popup", (evt) => {
  evt.preventDefault();
  NEWuserInfo.setUserInfo(userDataInput.name.value, userDataInput.title.value);
  NEWeditProfilePopup.close();
});
const NEWaddCardPopup = new PopupWithForm(".add-popup", (evt) => {
  evt.preventDefault();
  const newCard = new Card(
    {
      name: titleField.value,
      link: linkField.value,
    },
    elementSelector,
    (evt) => {
      NEWimagePopup.open(evt);
    }
  );
  elementsList.prepend(newCard.generateCard());
  NEWaddCardPopup.close();
});

// EVENT LISTENERS
// Edit Profile form listeners
editProfileButton.addEventListener("click", () => {
  const userInfo = NEWuserInfo.getUserInfo();
  userDataInput.name.value = userInfo.name;
  userDataInput.title.value = userInfo.title;

  NEWeditProfilePopup.open();
  resetValidator();
});
editProfileCloseButton.addEventListener("click", () => {
  NEWeditProfilePopup.close();
});

// Add Card form listeners
addCardButton.addEventListener("click", () => {
  NEWaddCardPopup.open();

  resetValidator();
});
addCardCloseButton.addEventListener("click", () => {
  NEWaddCardPopup.close();
});

// Image popup listener
imageCloseButton.addEventListener("click", () => {
  NEWimagePopup.close();
});

// Initial functions
initialSection.renderer();
formsList.forEach((form) => {
  const formValidator = new FormValidator(config, form);

  validatorsList.push({ validator: formValidator, id: form.id });

  formValidator.enableValidation();
});
