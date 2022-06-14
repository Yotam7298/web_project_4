import { validatorsList, userDataInput } from "./constants.js";

export function fillProfileForm(currentInfo) {
  userDataInput.name.value = currentInfo.name;
  userDataInput.title.value = currentInfo.title;
}

export function getFormValidator(formContainer) {
  const formId = formContainer.querySelector(".form").id;
  return validatorsList.find((valid) => valid.id === formId).validator;
}

export function resetValidator() {
  const openPopup = document.querySelector(".popup_opened");
  const currentValidator = getFormValidator(openPopup);
  currentValidator.resetValidation();
}
