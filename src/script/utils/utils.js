import { validatorsList } from "./constants.js";

export function getFormValidator(formContainer) {
  const formId = formContainer.querySelector(".form").id;
  return validatorsList.find((valid) => valid.id === formId).validator;
}

export function resetValidator() {
  const openedPopup = document.querySelector(".popup_opened");
  const currentValidator = getFormValidator(openedPopup);
  currentValidator.resetValidation();
}

export function updateSaveButton(isSaving, formSelector) {
  const form = document.querySelector(formSelector);
  const submitButton = form.querySelector(".submit-button");
  if (isSaving) {
    submitButton.textContent = "Saving...";
  } else {
    if ((formSelector = ".delete-popup")) {
      submitButton.textContent = "Yes";
    } else {
      submitButton.textContent = "Save";
    }
  }
}
