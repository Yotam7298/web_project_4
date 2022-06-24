import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._popupForm = this._popup.querySelector(".form");
    this._inputsArray = this._popup.querySelectorAll(".form__input");
  }

  _getInputValues() {
    const inputData = {};

    this._inputsArray.forEach((input) => {
      const inputName = input.id.split("-");
      inputData[inputName[0]] = input.value;
    });

    return inputData;
  }

  _handleSubmit = (evt) => {
    const inputValues = this._getInputValues();
    this._formSubmitHandler(evt, inputValues);
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._popupForm.removeEventListener("submit", this._handleSubmit);
  }

  close() {
    this._popupForm.reset();
    this.removeEventListeners();
    super.close();
  }
}
