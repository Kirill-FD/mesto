import Popup from './Popup.js';

export default class PopupWithDeleteForm extends Popup{
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._form = this._popup.querySelector('.form');
        this._submitButton = this._form.querySelector('.form__save');
        this._defaultButtonText = this._submitButton.textContent;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitButton.textContent = `${this._submitButton.textContent}...`
            this._submitFunction({ card: this._element, cardId: this._cardId });
        })
    }

    setupDefaultText() {
        this._submitButton.textContent = this._defaultButtonText
    }

    open = ({ card, cardId }) => {
        super.open();
        this._element = card;
        this._cardId = cardId;
    }
}