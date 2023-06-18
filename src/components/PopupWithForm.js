import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.form__box');
        this._submitButton = this._form.querySelector('.form__save');
        this._defaultButtonText = this._submitButton.textContent;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitButton.textContent = `Сохранение...`
            this._submitFunction(this.getInputValues())
        });
    }

    getInputValues() {
        this._values = {};
        this._inputList.forEach(input => {
            this._values[input.name] = input.value;
        })
        return this._values
    }

    setInputValues(dataProfile) {
        this._inputList.forEach(input => {
            input.value = dataProfile[input.name];
        })
    }

    setupDefaultText() {
        this._submitButton.textContent = this._defaultButtonText
    }

    close() {
        super.close();
        this._form.reset();
    }
}