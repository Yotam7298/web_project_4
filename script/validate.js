const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_disabled",
  inputErrorClass: "form__input_invalid",
  errorClass: "form__input-error_active",
};

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
}

function isFormInvalid(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState({ inputList, buttonElement }) {
  if (isFormInvalid(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState({ inputList, buttonElement });
    });
  });
}

function enableValidation() {
  formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation();
