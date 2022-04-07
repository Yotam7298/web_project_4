const container = document.querySelector(".page");
const editForm = container.querySelector(".popup");
const editButton = container.querySelector(".profile__edit-button");
const closeButton = editForm.querySelector(".popup__close-button");
const saveButton = editForm.querySelector(".form__save");
const currentName = container.querySelector(".profile__name-text");
const currentAbout = container.querySelector(".profile__about");
const nameField = editForm.querySelector("#name");
const aboutField = editForm.querySelector("#about");
// const likeButton = container.querySelectorAll(".element__like-button");
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

// function handleLikeButton() {
//   likeButton.src = "./images/like-button_active.svg";
// }

function handleEditButton() {
  nameField.value = currentName.textContent;
  aboutField.value = currentAbout.textContent;
  editForm.classList.add("popup_opened");
}

function handleCloseButton() {
  editForm.classList.remove("popup_opened");
}

function handleSaveButton(event) {
  event.preventDefault();
  currentName.textContent = nameField.value;
  currentAbout.textContent = aboutField.value;
  handleCloseButton();
}

function createElement(link, name) {
  const elementTemplate = document.querySelector("#element").content;
  const elementsList = document.querySelector(".elements__list");

  const element = elementTemplate
    .querySelector(".elements__list-item")
    .cloneNode(true);

  element.querySelector(".element__image").src = link;
  element.querySelector(".element__caption-text").textContent = name;

  elementsList.prepend(element);
}

// likeButton.addEventListener("click", handleLikeButton);
editButton.addEventListener("click", handleEditButton);
closeButton.addEventListener("click", handleCloseButton);
editForm.addEventListener("submit", handleSaveButton);

initialCards.forEach((card) => {
  createElement(card.link, card.name);
});
