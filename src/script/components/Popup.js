export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".close-button");

    this.close = this.close.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close);
    this._popup.addEventListener("mousedown", this._handleClickClose);
    document.addEventListener("keydown", this._handleEscClose);
  }

  _removeEventListeners() {
    this._closeButton.removeEventListener("click", this.close);
    this._popup.removeEventListener("mousedown", this._handleClickClose);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }
}
