export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector("#close-button");
  }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this._popup.addEventListener("mousedown", (evt) => {
      this._handleClickClose(evt);
    });
    document.addEventListener("keydown", (evt) => {
      console.log(evt);
      this._handleEscClose(evt);
    });
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

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector("#popup-image");
  }

  open(evt) {
    super.open();
    this._setPopupContent(evt);
  }

  _setPopupContent(evt) {
    this._popupImage.src = evt.target.src;
    this._popupImage.alt = `enlarged ${evt.target.alt}`;
    this._popupImage.nextElementSibling.textContent =
      evt.target.nextElementSibling.textContent;
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._popupForm = this._popup.querySelector(".form");
    this._inputsArray = this._popup.querySelectorAll(".form__input");
  }

  _getInputValues() {
    const inputData = {};

    this._inputsArray.forEach((input) => {
      inputData[input.id] = input.value;
    });

    return inputData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._formSubmitHandler);
  }

  close() {
    this._popupForm.reset();
    this._popupForm.removeEventListener("submit", this._formSubmitHandler);
    super.close();
  }
}
