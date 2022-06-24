import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, confirmHandler) {
    super(popupSelector);
    this._confirmHandler = confirmHandler;
  }

  confirmDelete(evt) {
    const confirmButton = this._popup.querySelector(".confirm-button");

    confirmButton.addEventListener("click", () => {
      this._confirmHandler(evt);
      super.close();
    });
  }
}
