//Функции валидации форм

const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__box',
    submitButtonSelector: '.form__save',
    inactiveButtonClass: 'form__save_noactive',
    inputErrorClass: 'form__error'
};

//Функция проверки на валидность
const enableValidation = ({formSelector, ...rest}) => {
    const forms = Array.from(document.querySelectorAll(formSelector));    
    forms.forEach(form => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })   
        setEventListeners(form, rest)
});
}

const setEventListeners = (formToValidate, {inputSelector, submitButtonSelector, ...rest}) => {
    const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector));
    const formButton = formToValidate.querySelector(submitButtonSelector);
    disableButton(formButton, rest);
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(input);
            if (hasInvalidInput(formInputs)) {
                disableButton(formButton, rest)
            } else {
                enableButton(formButton, rest)
            }
        })
    })
}

const checkInputValidity = (input) => {
    const currentInputErrorContainer = document.querySelector(`#${input.id}-error`)
    if (input.checkValidity()) {
        currentInputErrorContainer.textContent = '';
    } else {
        currentInputErrorContainer.textContent = input.validationMessage;
    }
}

const hasInvalidInput = (formInputs) => {
    return formInputs.some(item => !item.validity.valid)
}

//Функция активной кнопки
const enableButton = (button, {inactiveButtonClass, submitButtonSelector}) => {
    button.classList.remove(inactiveButtonClass);
    button.classList.add(submitButtonSelector);
    button.removeAttribute('disabled')
}

//Функция неактивной кнопки
const disableButton = (button, {inactiveButtonClass, submitButtonSelector}) => {
    button.classList.add(inactiveButtonClass);
    button.classList.remove(submitButtonSelector);
    button.setAttribute('disabled', true)
}

enableValidation(validationConfig);