import { openPopup } from "./utils.js";

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
    this._element
      .querySelector(".element__remove-button")
      .addEventListener("click", () => {
        this._removeElement(this._element);
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", (evt) => {
        this._openImagePopup({ name: this._name, link: this._link }, evt);
      });

    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("element__like-button_active");
      });
  }

  _removeElement(element) {
    element.remove();
  }

  _openImagePopup(card, evt) {
    const imagePopup = document.querySelector(".image-popup");

    const popupImage = imagePopup.querySelector(".image-popup__image");
    const popupCaption = imagePopup.querySelector(".image-popup__caption");

    openPopup(imagePopup);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = card.name;
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
