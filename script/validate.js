function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
}

function setEventListeners(formElement, config) {
  const validationElements = getVariables(formElement, config);
  const inputList = validationElements.inputs;
  const buttonElement = validationElements.button;

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function getVariables(selectedForm, config) {
  const inputList = Array.from(
    selectedForm.querySelectorAll(config.inputSelector)
  );

  const buttonElement = selectedForm.querySelector(".form__save");

  return { inputs: inputList, button: buttonElement };
}

function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  }
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function toggleButtonState(inputList, buttonElement, config) {
  if (isFormInvalid(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function isFormInvalid(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function resetValidation(selectedForm, config) {
  const validationElements = getVariables(selectedForm, config);

  toggleButtonState(
    validationElements.inputs,
    validationElements.button,
    config
  );
  validationElements.inputs.forEach((input) => {
    hideInputError(selectedForm, input, config);
  });
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_disabled",
  inputErrorClass: "form__input_invalid",
  errorClass: "form__input-error_active",
});

export { resetValidation };
