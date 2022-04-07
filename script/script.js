const container = document.querySelector(".page");
const editForm = container.querySelector(".edit-popup");
const editButton = container.querySelector(".profile__edit-button");
const editCloseButton = editForm.querySelector(".edit-popup__close-button");
const imageCloseButton = container.querySelector(".image-popup__close-button");
const saveButton = editForm.querySelector(".form__save");
const currentName = container.querySelector(".profile__name-text");
const currentAbout = container.querySelector(".profile__about");
const nameField = editForm.querySelector("#name");
const aboutField = editForm.querySelector("#about");
// const likeButton = container.querySelectorAll(".element__like-button");
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

initialCards.forEach((card) => {
  createElement(card.link, card.name);
});

function handleEditButton() {
  nameField.value = currentName.textContent;
  aboutField.value = currentAbout.textContent;
  editForm.classList.add("edit-popup_opened");
}

function handleEditCloseButton() {
  editForm.classList.remove("edit-popup_opened");
}

function handleSaveButton(event) {
  event.preventDefault();
  currentName.textContent = nameField.value;
  currentAbout.textContent = aboutField.value;
  handleCloseButton();
}

function handleImageCloseButton() {
  container
    .querySelector(".image-popup")
    .classList.remove("image-popup_opened");
}

function createElement(link, name) {
  const elementTemplate = document.querySelector("#element").content;
  const elementsList = document.querySelector(".elements__list");

  const element = elementTemplate
    .querySelector(".elements__list-item")
    .cloneNode(true);

  element.querySelector(".element__image").src = link;
  element.querySelector(".element__caption-text").textContent = name;

  element.querySelector(".element__image").addEventListener("click", (evt) => {
    container.querySelector(".image-popup").classList.add("image-popup_opened");
    container.querySelector(".image-popup__image").src = evt.target.src;
  });

  element
    .querySelector(".element__remove-button")
    .addEventListener("click", () => {
      element.remove();
    });

  elementsList.prepend(element);
}

// likeButton.addEventListener("click", handleLikeButton);
editButton.addEventListener("click", handleEditButton);
editCloseButton.addEventListener("click", handleEditCloseButton);
editForm.addEventListener("submit", handleSaveButton);
imageCloseButton.addEventListener("click", handleImageCloseButton);
