import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, confirmHandler) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".confirm-button");
    // this._confirmHandler = confirmHandler;
  }

  setConfirmHandler(handleConfirm) {
    this._handleConfirm = handleConfirm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", this._handleConfirm);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._confirmButton.removeEventListener("click", this._handleConfirm);
  }

  // confirmDelete(evt) {
  //   confirmButton.addEventListener("click", () => {
  //     this._confirmHandler(evt);
  //     super.close();
  //   });
  // }
}
