//Импорты

import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import {
    initialCards,
    buttonPopupProfileOpen,
    buttonOpenAddForma,
    templateSelector,
    popupProfileSelector,
    popupImageSelector,
    listItemSelector,
    popupCardSelector,
    infoConfig,
    formsValidator,
    validationConfig
} from '../scripts/utils/constants.js';

//Объявление переменных

// const modalWindowProfile = document.querySelector('.popup-profile');
// const formProfile = modalWindowProfile.querySelector('.form-profile');
// const formCard = document.querySelector('.form-card');

const userInfo = new UserInfo(infoConfig)

// const formProfileValidation = new FormValidator (validationConfig, formProfile);
// formProfileValidation.enableValidation()

// const formCardValidation = new FormValidator (validationConfig, formCard);
// formCardValidation.enableValidation()

//Создание экземпляра попапа большой картинки
const popupImage = new PopupWithImage(popupImageSelector);

//Создание экземпляра Section
const section = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, templateSelector, popupImage.open);
        return card.createCard();
    }
 }, listItemSelector);

 section.createCardFromArray();

 //Создание экземпляра попапа профиля
 const popupProfile = new PopupWithForm(popupProfileSelector, (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo(popupProfile.getInputValues());
    popupProfile.close()
 })

 popupProfile.setEventListeners()

 //Создание экземпляра попапа создания карточки
 const popupAddNewCard = new PopupWithForm(popupCardSelector, (evt) => {
    evt.preventDefault();
    section.addItem(section.renderer(popupAddNewCard.getInputValues()));
    popupAddNewCard.close();
 })

 popupAddNewCard.setEventListeners();

 Array.from(document.forms).forEach(item => {
    const form = new FormValidator(validationConfig, item);
    const name = item.getAttribute('name');
    formsValidator[name] = form;
    form.enableValidation()
 })

 popupProfile.setEventListeners();
 popupAddNewCard.setEventListeners();
 popupImage.setEventListeners();

//Функции

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