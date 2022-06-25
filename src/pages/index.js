import "./index.css";

import Api from "../script/components/Api.js";
import Card from "../script/components/Card.js";
import FormValidator from "../script/components/FormValidator.js";
import Section from "../script/components/Section.js";
import PopupWithForm from "../script/components/PopupWithForm.js";
import PopupWithImage from "../script/components/PopupWithImage.js";
import PopupWithConfirm from "../script/components/PopupWithConfirm";
import UserInfo from "../script/components/UserInfo.js";
import {
  editProfileButton,
  editAvatarButton,
  addCardButton,
  userDataInput,
  elementSelector,
  elementsContainer,
  validatorsList,
  formsList,
  config,
} from "../script/utils/constants.js";
import { resetValidator } from "../script/utils/utils.js";

function fillProfileForm(currentInfo) {
  userDataInput.name.value = currentInfo.name;
  userDataInput.about.value = currentInfo.about;
}

function renderInitialInfo() {
  api.getAllInfo().then((data) => {
    const userData = data[0];
    const cardsData = data[1];

    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);

    cardsSection.renderer(cardsData, userData._id);
  });
}

function renderCards() {
  api.getAllInfo().then((data) => {
    const userData = data[0];
    const cardsData = data[1];

    cardsSection.renderer(cardsData, userData._id);
  });
}

function updateSaveButton(isSaving, formSelector) {
  const form = document.querySelector(formSelector);
  const submitButton = form.querySelector(".form__save");
  if (isSaving) {
    submitButton.textContent = "Saving...";
  } else {
    submitButton.textContent = "Save";
  }
}

//Classes instances

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "f800af66-4bca-42fd-8139-117d10b5a510",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo(
  "#profile-name",
  "#profile-about",
  "#profile-avatar"
);

const imagePopup = new PopupWithImage(".image-popup");

const createCard = (item) => {
  const card = new Card(
    item,
    elementSelector,
    (evt) => {
      imagePopup.open(evt);
    },
    (evt) => {
      const card = evt.currentTarget;
      deletePopup.open();
      deletePopup.confirmDelete(card);
    },
    (evt) => {
      const card = evt.currentTarget;
      const likeButton = evt.target;
      const likeCounter = card.querySelector(".element__like-counter");

      api.getUserInfo().then((user) => {
        if (card.likes.some((like) => like._id === user._id)) {
          api.changeCardLike(card._id, "DELETE").then((updatedCard) => {
            card.likes = updatedCard.likes;
            likeCounter.textContent = updatedCard.likes.length;
            likeButton.classList.remove("element__like-button_active");
          });
        } else {
          api.changeCardLike(card._id, "PUT").then((updatedCard) => {
            card.likes = updatedCard.likes;
            likeCounter.textContent = updatedCard.likes.length;
            likeButton.classList.add("element__like-button_active");
          });
        }
      });
    }
  );

  const generatedCard = card.generateCard();
  return generatedCard;
};

const cardsSection = new Section(
  {
    renderer: createCard,
    modifier: (element, userId) => {
      const elementRemoveButton = element.querySelector(
        ".element__remove-button"
      );
      const elementLikeButton = element.querySelector(".element__like-button");

      if (element.owner._id === userId) {
        elementRemoveButton.classList.add("element__remove-button_owner");
      }
      if (element.likes.some((like) => like._id === userId)) {
        elementLikeButton.classList.add("element__like-button_active");
      }
    },
  },
  ".elements__list"
);

const editProfilePopup = new PopupWithForm(
  ".edit-popup",
  (evt, inputValues) => {
    evt.preventDefault();
    updateSaveButton(true, ".edit-popup");

    api.editProfileInfo(inputValues).then((userParameters) => {
      userInfo.setUserInfo(userParameters);

      updateSaveButton(false, ".edit-popup");
    });

    editProfilePopup.close();
  }
);

const avatarPopup = new PopupWithForm(".avatar-popup", (evt, inputValue) => {
  evt.preventDefault();

  updateSaveButton(true, ".avatar-popup");

  api.editProfilePicture(inputValue).then((userParameters) => {
    userInfo.setUserAvatar(userParameters.avatar);
    avatarPopup.close();

    updateSaveButton(false, ".avatar-popup");
  });
});

const addCardPopup = new PopupWithForm(".add-popup", (evt, inputValues) => {
  evt.preventDefault();

  updateSaveButton(true, ".add-popup");

  api.addNewCard(inputValues).then(() => {
    elementsContainer.innerHTML = "";
    renderCards();

    updateSaveButton(false, ".add-popup");
  });

  addCardPopup.close();
});

const deletePopup = new PopupWithConfirm(".delete-popup", (item) => {
  const cardId = item._id;
  api.deleteCard(cardId).then(() => {
    elementsContainer.innerHTML = "";
    renderCards();
  });
});

// EVENT LISTENERS
// Edit Profile form listeners
editProfileButton.addEventListener("click", () => {
  const userCurrentInfo = userInfo.getUserInfo();
  fillProfileForm(userCurrentInfo);

  editProfilePopup.open();
  resetValidator();
});
editAvatarButton.addEventListener("click", () => {
  avatarPopup.open();
  resetValidator();
});

// Add Card form listeners
addCardButton.addEventListener("click", () => {
  addCardPopup.open();
  resetValidator();
});

// Initial functions

formsList.forEach((form) => {
  const formValidator = new FormValidator(config, form);

  validatorsList.push({ validator: formValidator, id: form.id });

  formValidator.enableValidation();
});

// renderUserInfo();
// renderCards();
// api.getAllInfo();

renderInitialInfo();
