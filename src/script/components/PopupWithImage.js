import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector("#popup-image");
    this._popupCaption = this._popup.querySelector("#popup-caption");
  }

  open(evt, item) {
    super.open();
    this._setPopupContent(evt);
  }

  _setPopupContent(evt) {
    const selectedImage = evt.currentTarget.querySelector(".element__image");
    const selectedCaption = evt.currentTarget.querySelector(
      ".element__caption-text"
    );

    this._popupImage.src = selectedImage.src;
    this._popupImage.alt = `Enlarged ${selectedImage.alt}`;
    this._popupCaption.textContent = selectedCaption.textContent;
  }
}
