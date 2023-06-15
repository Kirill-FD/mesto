export default class Card {
    constructor(cardData, templateSelector, largeCard, openDelete, changeLike) {
        this._cardData = cardData;
        this._name = cardData.name;
        this._link = cardData.link;
        this._likes = cardData.likes;
        this._likesLength = cardData.likes.length;
        this._myId = cardData.myId;
        this._ownerId = cardData.owner._id;
        this._cardId = cardData._id;
        this._templateSelector = templateSelector;
        this._openImage = largeCard;
        this._openDelete = openDelete;
        this._changeLike = changeLike;
        this._newCard = this._getTemplate();
        this._largeCard = this._newCard.querySelector('.elements__image');
        this._likeElement = this._newCard.querySelector('.elements__like');
        this._title = this._newCard.querySelector('.elements__title');
        this._removeElement = this._newCard.querySelector('.elements__remove');
        this._counter = this._newCard.querySelector('.elements__counter')
    }

    _getTemplate() {
        return document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true)
    }

    _handleLike = () => {
        this._changeLike(this._likeElement, this._cardId);
    }

    _handleDeleteElement = () => {
        this._openDelete({ card: this, cardId: this._cardId });
    }

    // _handleRemove = () => {
    //     this._newCard.remove();
    //     this._newCard = null;
    // }

    _handleFullImage = () => {
        this._openImage(this._data);
    }

    _setEventListeners() {
        this._likeElement.addEventListener('click', this._handleLike);
        this._removeElement.addEventListener('click', this._handleDeleteElement);
        this._largeCard.addEventListener('click', this._handleFullImage);
    }

    _changeVisibleTrashBtn() {
        this._myId !== this._ownerId ? this._removeElement.style.display = 'block' : this._removeElement.style.display = 'none';
      }
    
    
    // {
    //     if (this._myId !== this._ownerId) {
    //         this._removeElement.remove()
    //     }
    // }

    _checkStatusLike() {
        this._likes.forEach(item => {
            if (item._id === this._myId) {
                this._likeElement.classList.add('elements__like_active')
                return
            }
        })
        this._counter.textContent = this._likesLength;
    }

    toggleLike(likes) {
        this._likeElement.classList.toggle('elements__like_active');
        this._counter.textContent = likes.length;
    }

    removeCardElement() {
        this._newCard.remove();
        this._newCard = null;
    }

    createCard() {
        this._largeCard.src = this._link;
        this._largeCard.alt = `Изображение ${this._name}`;
        this._title.textContent = this._name;
        this._checkStatusLike();
        this._changeVisibleTrashBtn();
        this._setEventListeners();
        return this._newCard;
    }
}