export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleRemoveElement,
    handleLikeClick
  ) {
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._owner = data.owner;

    this._selector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveElement = handleRemoveElement;
    this._handleLikeClick = handleLikeClick;
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
          this._handleRemoveElement(evt);
          break;
        case elementImage:
          this._handleCardClick(evt);
          break;
        case likeButton:
          this._handleLikeClick(evt);
          break;
      }
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element._id = this._cardId;
    this._element.likes = this._likes;
    this._element.owner = this._owner;

    const elementImage = this._element.querySelector(".element__image");
    const elementCaption = this._element.querySelector(
      ".element__caption-text"
    );
    const elementLikes = this._element.querySelector(".element__like-counter");

    this._setEventListeners();

    elementCaption.textContent = this._title;
    elementImage.src = this._link;
    elementImage.alt = `Photo of ${this._title}`;
    elementLikes.textContent = this._likes.length;

    return this._element;
  }
}
