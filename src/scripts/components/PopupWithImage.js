import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._largeImage = this._popup.querySelector('.popup__image');
        this._popupTitle = this._popup.querySelector('.popup__title')
    }

    open = (cardData) => {
        this._largeImage.src = cardData.link;
        this._largeImage.alt = `Изображение ${cardData.title}`;
        this._popupTitle.textContent = cardData.name;
        super.open();
    }
}