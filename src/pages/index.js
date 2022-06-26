import "./index.css";

import Api from "../script/utils/Api.js";
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
import { resetValidator, updateSaveButton } from "../script/utils/utils.js";

function fillProfileForm(currentInfo) {
  userDataInput.name.value = currentInfo.name;
  userDataInput.about.value = currentInfo.about;
}

function renderInitialInfo() {
  api
    .getAllInfo()
    .then((data) => {
      const userData = data[0];
      const cardsData = data[1];

      userInfo.saveUserId(userData._id);
      userInfo.setUserInfo(userData);
      userInfo.setUserAvatar(userData.avatar);

      cardsData
        .slice()
        .reverse()
        .forEach((card) => {
          cardsSection.renderer(card, userData._id);
        });
    })
    .catch((err) => api.reportError(err));
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
    userInfo.getUserId(),
    (evt) => {
      imagePopup.open(evt);
    },
    (evt) => {
      const cardElement = evt.currentTarget;
      deletePopup.open();
      deletePopup.setConfirmHandler(() => {
        const cardId = card._cardId;

        updateSaveButton(true, ".delete-popup");

        api
          .deleteCard(cardId)
          .then(() => {
            cardElement.remove();
            deletePopup.close();
          })
          .catch((err) => api.reportError(err))
          .finally(() => {
            updateSaveButton(false, ".delete-popup");
          });
      });
      deletePopup.setEventListeners();
    },
    () => {
      if (card.isLiked()) {
        api
          .changeCardLike(card._cardId, "DELETE")
          .then((updatedCard) => {
            card.updateLikes(updatedCard.likes);
          })
          .catch((err) => api.reportError(err));
      } else {
        api
          .changeCardLike(card._cardId, "PUT")
          .then((updatedCard) => {
            card.updateLikes(updatedCard.likes);
          })
          .catch((err) => api.reportError(err));
      }
    }
  );

  const generatedCard = card.generateCard();
  return generatedCard;
};

const cardsSection = new Section(
  {
    renderer: createCard,
  },
  ".elements__list"
);

const editProfilePopup = new PopupWithForm(
  ".edit-popup",
  (evt, inputValues) => {
    evt.preventDefault();
    updateSaveButton(true, ".edit-popup");

    api
      .editProfileInfo(inputValues)
      .then((userParameters) => {
        userInfo.setUserInfo(userParameters);
      })
      .catch((err) => api.reportError(err))
      .finally(() => {
        updateSaveButton(false, ".edit-popup");
      });

    editProfilePopup.close();
  }
);

const avatarPopup = new PopupWithForm(".avatar-popup", (evt, inputValue) => {
  evt.preventDefault();

  updateSaveButton(true, ".avatar-popup");

  api
    .editProfilePicture(inputValue)
    .then((userParameters) => {
      userInfo.setUserAvatar(userParameters.avatar);
      avatarPopup.close();
    })
    .catch((err) => api.reportError(err))
    .finally(() => {
      updateSaveButton(false, ".avatar-popup");
    });
});

const addCardPopup = new PopupWithForm(".add-popup", (evt, inputValues) => {
  evt.preventDefault();

  updateSaveButton(true, ".add-popup");

  api
    .addNewCard(inputValues)
    .then((card) => {
      cardsSection.renderer(card, userInfo.getUserId());
    })
    .catch((err) => api.reportError(err))
    .finally(() => {
      updateSaveButton(false, ".add-popup");
    });

  addCardPopup.close();
});

const deletePopup = new PopupWithConfirm(".delete-popup");

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

renderInitialInfo();
