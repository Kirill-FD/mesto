//Валидация форм

export default class FormValidator {
    constructor(config, form) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonClass = config.submitButtonClass;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._errorClass - config.errorClass;
        this._form = form;
        this._button = form.querySelector(this._submitButtonClass);
        this._inputList = form.querySelectorAll(this._inputSelector);
    }

    _concealInputError() {
        this._input.classList.remove(this._errorClass);
        this._currentInputErrorContainer.textContent = '';
    }

    _showInputError() {
        this._input.classList.add(this._errorClass);
        this._currentInputErrorContainer.textContent = this._input.validationMessage;
    }

    _enableButton() {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.removeAttribute('disabled')
    }

    _disableButton() {
        this._button.classList.add(this._inactiveButtonClass);
        this._button.setAttribute('disabled', true)
    }

    _hasInvalidInput() {
        return Array.from(this._inputList).every(input => input.validity.valid);
    }

    _toggleButton() {
        this._hasInvalidInput() ? this._enableButton() : this._disableButton();
    }

    _checkInputValidity() {
        this._currentInputErrorContainer = this._form.querySelector(`#${this._input.id}-error`);
        this._input.validity.valid ? this._concealInputError() : this._showInputError();
    }

    _setEventListener() {
        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._input = input;
                this._checkInputValidity();
                this._toggleButton();
            })
        })
    }

    enableValidation() {
        this._setEventListener();
    }

    resetFormValidation() {
        this._inputList.forEach(input => {
            this._input = input;
            this._currentInputErrorContainer = this._form.querySelector(`#${this._input.id}-error`);
            if (!input.validity.valid) {
              this._concealInputError()  
            }
        })
        this._disableButton();
    }
}

