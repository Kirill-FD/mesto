export default class Card {
    constructor(data, templateSelector, largeCard) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._bigImage = largeCard;
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
        this._bigImage(this._data);
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
        this._largeCard.alt = this._name;
        this._newCard.querySelector('.elements__title').textContent = this._name;
        this._setEventListeners();
        return this._newCard;
    }
}

// function makeCard(card) {
//     const cardTemplate = document.querySelector('.template').content;
//     const newCard = cardTemplate.querySelector('.element').cloneNode(true);
//     const cardImage = newCard.querySelector('.element__image');
//     cardImage.setAttribute('src', card.link);
//     cardImage.setAttribute('alt', card.name);
//     const cardTitle = newCard.querySelector(".element__title");
//     cardTitle.textContent = card.name;
//     const removeButton = newCard.querySelector('.element__remove');
//     removeButton.addEventListener('click', function (evt) {
//         const urn = evt.target;
//         const image = urn.closest('.element');
//         image.remove();
//     });
//     const likeButton = newCard.querySelector('.element__like');
//     likeButton.addEventListener('click', function (evt) {
//         if (evt.target.classList.contains('element__like')) {
//             evt.target.classList.toggle('element__like_active');
//         };
//     })
//     const largeCard = newCard.querySelector('.element__image');
//     largeCard.addEventListener('click', () => handleClickOpenFullImageCard(card));
//     return newCard;
// }