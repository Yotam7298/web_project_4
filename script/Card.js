import { openImagePopup } from "./utils.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#element")
      .content.querySelector(this._selector)
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    const removeButton = this._element.querySelector(".element__remove-button");
    const elementImage = this._element.querySelector(".element__image");
    const likeButton = this._element.querySelector(".element__like-button");

    this._element.addEventListener("click", (evt) => {
      switch (evt.target) {
        case removeButton:
          this._removeElement(this._element);
          break;
        case elementImage:
          openImagePopup({ name: this._name, link: this._link }, evt);
          break;
        case likeButton:
          evt.target.classList.toggle("element__like-button_active");
      }
    });
  }

  _removeElement(element) {
    element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector(".element__caption-text").textContent =
      this._name;
    this._element.querySelector(".element__image").src = this._link;

    return this._element;
  }
}
