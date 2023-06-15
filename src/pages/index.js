//Импорты

import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteForm from '../components/PopupWithDeleteForm.js';
import Api from '../components/Api.js';
import {
    buttonPopupProfileOpen,
    buttonOpenAddForma,
    templateSelector,
    popupProfileSelector,
    popupImageSelector,
    listItemSelector,
    popupCardSelector,
    formsValidator,
    validationConfig,
    inputNameSelector,
    inputAboutSelector,
    inputAvatar,
    popupDeleteSelector,
    popupEditAvatarSelector,
    avatarElement
} from '../utils/constants.js';

//Объявление переменных
let userId;
const userInfo = new UserInfo(inputNameSelector, inputAboutSelector, inputAvatar);

//Создание экземпляра Api

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
    headers: {
        authorization: 'fce15185-699b-4076-96f7-035573220092',
        'Content-Type': 'application/json'
    }
})

//Создание экземпляра попапа большой картинки
const popupImage = new PopupWithImage(popupImageSelector);

const popupDelete = new PopupWithDeleteForm(popupDeleteSelector, ({ card, cardId }) => {
    api.deleteCard(cardId)
        .then(() => {
            card.removeCardElement()
            popupDelete.close()
        })
        .catch(error => console.error(`Ошибка удаления карточки ${error}`))
        .finally(() => popupDelete.setupDefaultText())
})

popupDelete.setEventListeners()

function createNewCard(item) {
    const card = new Card(item, templateSelector, popupImage.open, popupDelete.open, (likeElement, cardId) => {
        if (likeElement.classList.contains('elements__like_active')) {
            api.deleteLike(cardId)
                .then(res => {
                    card.toggleLike(res.likes)
                })
                .catch(error => console.error(`Ошибка снятия лайка ${error}`))
        } else {
            api.addLike(cardId)
                .then(res => {
                    card.toggleLike(res.likes)
                })
                .catch(error => console.error(`Ошибка добавления лайка ${error}`))
        }
    })
    const cardElement = card.createCard();
    return cardElement;
};

//Создание экземпляра Section
const section = new Section((item) => {
    section.addItemAppend(createNewCard(item))
}, listItemSelector);

//Создание экземпляра попапа профиля
const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
    api.setUserInfo(data)
        .then(res => {
            userInfo.setUserInfo({ name: res.name, about: res.about, avatar: res.avatar })
            popupProfile.close()
        })
        .catch((error => console.error(`Ошибка редактирования профиля ${error}`)))
        .finally(() => popupProfile.setupDefaultText())
})

popupProfile.setEventListeners()

//Изменение аватара
const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, (data) => {
    api.setNewAvatar(data)
        .then(dataUser => {
            userInfo.setUserInfo({ name: dataUser.name, about: dataUser.about, avatar: dataUser.avatar })
            popupEditAvatar.close()
        })
        .catch(error => console.error(`Ошибка редактирования аватара ${error}`))
        .finally(() => popupEditAvatar.setupDefaultText())
})

popupEditAvatar.setEventListeners()

//Создание экземпляра попапа создания карточки
const popupAddNewCard = new PopupWithForm(popupCardSelector, (data) => {
    api.addCard(data)
        .then(dataCard => {
            userId = dataCard._id;
            section.addItemPrepend(createNewCard(dataCard));
            popupAddNewCard.close();
        })
        .catch(error => console.error(`Ошибка при создании ${error}`))
        .finally(() => popupAddNewCard.setupDefaultText())
})

Array.from(document.forms).forEach(item => {
    const form = new FormValidator(validationConfig, item);
    const name = item.getAttribute('name');
    formsValidator[name] = form;
    form.enableValidation()
})

popupAddNewCard.setEventListeners();
popupImage.setEventListeners();

//Функция открытия попапа профиля
buttonPopupProfileOpen.addEventListener('click', () => {
    formsValidator.Profile.resetFormValidation();
    popupProfile.setInputValues(userInfo.getUserInfo());
    popupProfile.open()
})

//Функция открытия попапа создания карточки
buttonOpenAddForma.addEventListener('click', () => {
    formsValidator.Cards.resetFormValidation();
    popupAddNewCard.open()
})

//Функция открытия попапа аватара
avatarElement.addEventListener('click', () => {
    formsValidator.Avatar.resetFormValidation();
    popupEditAvatar.open()
})

Promise.all([api.getInfo(), api.getCards()])
    .then(([dataUser, dataCard]) => {
        userId = dataUser._id;
        dataCard.forEach(element => element.myId = dataUser._id);
        userInfo.setUserInfo({ name: dataUser.name, about: dataUser.about, avatar: dataUser.avatar });
        
        section.createCardFromArray(dataCard);
    })
    .catch(error => console.error(`Ошибка при создании начальных данных ${error}`))