export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = cardSelector;
    this._handleCardClick = handleCardClick;
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
          this._removeElement();
          break;
        case elementImage:
          this._handleCardClick(evt);
          break;
        case likeButton:
          evt.target.classList.toggle("element__like-button_active");
          break;
      }
    });
  }

  _removeElement() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();

    const elementImage = this._element.querySelector(".element__image");
    const elementCaption = this._element.querySelector(
      ".element__caption-text"
    );

    this._setEventListeners();

    elementCaption.textContent = this._name;
    elementImage.src = this._link;
    elementImage.alt = `Photo of ${this._name}`;

    return this._element;
  }
}
