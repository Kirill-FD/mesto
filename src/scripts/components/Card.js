export default class Card {
    constructor(data, templateSelector, largeCard) {
        this._data = data;
        this._name = data.title;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openImage = largeCard;
    }

    _getTemplate() {
        return document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true)
    }

    _handleLike = () => {
        this._likeElement.classList.toggle('elements__like_active');
    }

    _handleRemove = () => {
        this._newCard.remove();
        this._newCard = null;
    }

    _handleFullImage = () => {
        this._openImage(this._data);
    }

    _setEventListeners() {
        this._likeElement.addEventListener('click', this._handleLike);
        this._removeElement.addEventListener('click', this._handleRemove);
        this._largeCard.addEventListener('click', this._handleFullImage);
    }

    createCard() {
        this._newCard = this._getTemplate();
        this._largeCard = this._newCard.querySelector('.elements__image');
        this._likeElement = this._newCard.querySelector('.elements__like');
        this._removeElement = this._newCard.querySelector('.elements__remove');
        this._largeCard.src = this._link;
        this._largeCard.alt = `Изображение ${this._name}`;
        this._newCard.querySelector('.elements__title').textContent = this._name;
        this._setEventListeners();
        return this._newCard;
    }
}