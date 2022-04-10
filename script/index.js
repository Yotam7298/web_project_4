// CONSTANTS
// Main container
const container = document.querySelector(".page");

// EditProfile form consts
const editProfileForm = container.querySelector(".edit-popup");
const editProfileButton = container.querySelector(".profile__edit-button");
const editProfileCloseButton = editProfileForm.querySelector(
  ".edit-popup__close-button"
);
const nameField = editProfileForm.querySelector("#name");
const aboutField = editProfileForm.querySelector("#about");
const currentName = container.querySelector(".profile__name-text");
const currentAbout = container.querySelector(".profile__about");

// Add form consts
const addCardForm = container.querySelector(".add-popup");
const addCardButton = container.querySelector(".profile__add-button");
const addCardCloseButton = addCardForm.querySelector(
  ".add-popup__close-button"
);

// Image popup consts
const imagePopup = container.querySelector(".image-popup");
const imageCloseButton = imagePopup.querySelector(".image-popup__close-button");
const imageCaption = imagePopup.querySelector(".image-popup__caption");

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
function handleEditProfileButton() {
  fillProfileForm();
  openPopup(editProfileForm);
}
function fillProfileForm() {
  nameField.value = currentName.textContent;
  aboutField.value = currentAbout.textContent;
}

function handleEditProfileCloseButton() {
  closePopup(editProfileForm);
}

function handleSaveProfileButton(evt) {
  evt.preventDefault();
  currentName.textContent = nameField.value;
  currentAbout.textContent = aboutField.value;
  handleEditProfileCloseButton();
}

// Add form functions
function handleAddCardButton() {
  openPopup(addCardForm);
}

function handleAddCardCloseButton() {
  closePopup(addCardForm);
}

function handleCreateButton(evt) {
  const newCard = {
    name: addCardForm.querySelector("#title").value,
    link: addCardForm.querySelector("#link").value,
  };

  evt.preventDefault();
  renderCard(newCard);
  addCardForm.querySelector(".form").reset();
  closePopup(addCardForm);
}

// Image popup function
function handleImageCloseButton() {
  closePopup(imagePopup);
}

// Element creator function
function createElement(card) {
  const elementTemplate = document.querySelector("#element").content;
  const element = elementTemplate
    .querySelector(".elements__list-item")
    .cloneNode(true);
  const elementImage = element.querySelector(".element__image");
  const elementText = element.querySelector(".element__caption-text");

  elementImage.src = card.link;
  elementImage.alt = `A user uploaded photo titled ${card.name}`;
  elementText.textContent = card.name;

  elementImage.addEventListener("click", (evt) => {
    openPopup(imagePopup);
    imagePopup.querySelector(".image-popup__image").src = evt.target.src;
    imagePopup.querySelector(".image-popup__caption").textContent = card.name;
  });

  element
    .querySelector(".element__remove-button")
    .addEventListener("click", () => removeElement(element));

  element
    .querySelector(".element__like-button")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like-button_active");
    });

  return element;
}

//UNIVERSAL FUNCTIONS
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function removeElement(element) {
  element.remove();
}

function renderCard(newCard) {
  const elementsList = document.querySelector(".elements__list");

  element = createElement(newCard);

  elementsList.prepend(element);
}

// EVENT LISTENERS
// EditProfile form listeners
editProfileButton.addEventListener("click", handleEditProfileButton);
editProfileCloseButton.addEventListener("click", handleEditProfileCloseButton);
editProfileForm.addEventListener("submit", handleSaveProfileButton);
// Add form listeners
addCardButton.addEventListener("click", handleAddCardButton);
addCardCloseButton.addEventListener("click", handleAddCardCloseButton);
addCardForm.addEventListener("submit", handleCreateButton);
// Image popup listener
imageCloseButton.addEventListener("click", handleImageCloseButton);

// INITIAL FUNCTION
initialCards.forEach((card) => {
  renderCard(card);
});
