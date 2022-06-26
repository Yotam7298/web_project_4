export default class Card {
  constructor(
    data,
    cardSelector,
    userId,
    handleCardClick,
    handleRemoveElement,
    handleLikeClick
  ) {
    this._title = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._owner = data.owner;

    this._userId = userId;

    this._selector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveElement = handleRemoveElement;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector("#element")
      .content.querySelector(this._selector)
      .cloneNode(true);

    return cardTemplate;
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

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  _renderLikes() {
    const likeCounter = this._element.querySelector(".element__like-counter");
    const likeButton = this._element.querySelector(".element__like-button");

    likeCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      likeButton.classList.add("element__like-button_active");
    } else {
      likeButton.classList.remove("element__like-button_active");
    }
  }

  _renderDeleteButton() {
    const removeButton = this._element.querySelector(".element__remove-button");

    if (this._owner._id === this._userId) {
      removeButton.classList.add("element__remove-button_owner");
    }
  }

  updateLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element._id = this._cardId;
    this._element.owner = this._owner;

    const elementImage = this._element.querySelector(".element__image");
    const elementCaption = this._element.querySelector(
      ".element__caption-text"
    );
    const elementLikes = this._element.querySelector(".element__like-counter");

    this._setEventListeners();
    this._renderLikes();
    this._renderDeleteButton();

    elementCaption.textContent = this._title;
    elementImage.src = this._link;
    elementImage.alt = `Photo of ${this._title}`;
    elementLikes.textContent = this._likes.length;

    return this._element;
  }
}
