
import Card from './Card.js';
import initialCards from './cards.js';
import FormValidator from './FormValidator.js';
//Объявление переменных

//Объявление переменных попапа профиля
const popupList = document.querySelectorAll('.popup');
const buttonPopupProfileOpen = document.querySelector('.profile__edit-button');
const modalWindowProfile = document.querySelector('.popup-profile');
const buttonPopupProfileClose = modalWindowProfile.querySelector('.popup__close_button_profile');
const inputFormBoxName = modalWindowProfile.querySelector('.form__box_input_name');
const inputFormAboutProfile = modalWindowProfile.querySelector('.form__box_input_about');
const profileName = document.querySelector('.profile__title');
const profileContent = document.querySelector('.profile__content');
const formProfile = modalWindowProfile.querySelector('.form-profile');

//Объявление переменных попапа формы добавления карточки
const buttonOpenAddForma = document.querySelector('.profile__add-button');
const modalWindowNewCard = document.querySelector('.popup-forma');
const buttonCloseAddForma = modalWindowNewCard.querySelector('.popup__close_button_forma');

//Объявление переменных для попапа открытия карточки
const modalWindowFullImage = document.querySelector('.popup-card');
const largeImage = document.querySelector('.popup__image');
const largeTitle = document.querySelector('.popup__title');
const buttonClosePopupCard = modalWindowFullImage.querySelector('.popup__close_button_card');

//Объявление переменных для создания карточки
const listItem = document.querySelector('.elements');
const formCard = document.querySelector('.form-card');
const templateSelector = '#cardElement';
const inputFormCardName = formCard.querySelector('.form__box_input_title');
const inputFormCardLink = formCard.querySelector('.form__box_input_link');

//Объявление константы формы валидации
const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__box',
    submitButtonSelector: '.form__save',
    inactiveButtonClass: 'form__save_noactive',
    errorClass: 'form__error'
};

const formProfileValidation = new FormValidator (validationConfig, formProfile);
formProfileValidation.enableValidation()

const formCardValidation = new FormValidator (validationConfig, formCard);
formCardValidation.enableValidation()

//Функции

//Универсальная функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

//Универсальная функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

//Функция закрытия попапов при нажатии на клавищу Esc
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened')
        closePopup(popupOpened);
    }
}

//Функция закрытия попапов на оверлэй
const closePopupOnOverlay = function (event) {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget);
    }
}

popupList.forEach((popup) => popup.addEventListener('click', closePopupOnOverlay));

//Функция открытия попапа профиля
function openPopupProfile() {
    openPopup(modalWindowProfile);
    formProfile.reset();
    formProfileValidation.resetFormValidation();
    inputFormBoxName.value = profileName.textContent;
    inputFormAboutProfile.value = profileContent.textContent;
}

//Функция закрытия попапа профиля
function closePopupProfile() {
    closePopup(modalWindowProfile);
}

//Функция сохранения профиля
function handleProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputFormBoxName.value;
    profileContent.textContent = inputFormAboutProfile.value;
    closePopup(modalWindowProfile);
}

//Функция открытия попапа добавления карточки
function handleClickOpenPopupAddNewCard() {
    openPopup(modalWindowNewCard);
    formCard.reset();
    formCardValidation.resetFormValidation();
    const button = modalWindowNewCard.querySelector('.form__save');
    button.classList.add('form__save_noactive');
    button.setAttribute('disabled', true)
}

//Функция закрытия попапа добавления карточки
function handleClickClosePopupAddNewCard() {
    closePopup(modalWindowNewCard);
}

//Функция открытия попапа карточки
function handleClickOpenFullImageCard(data) {
    largeImage.src = data.link
    largeImage.alt = data.name
    largeTitle.textContent = data.name
    openPopup(modalWindowFullImage);
}

//Функция закрытия попапа карточки
function closePopupFullImage() {
    closePopup(modalWindowFullImage);
}

//Функция создания карточки
function createNewCard(item) {
    const card = new Card(item, templateSelector, handleClickOpenFullImageCard);
    const cardElement = card.createCard();
    return cardElement
}

function makeCard(container, card) {
    container.prepend(card);
}

initialCards.forEach(item => {
    makeCard(listItem, createNewCard(item));
});

//Сохранение карточки
function handleCardSubmit(evt) {
    evt.preventDefault();
    const save = {
        name: inputFormCardName.value,
        link: inputFormCardLink.value,
    };
    makeCard(listItem, createNewCard(save));
    closePopup(modalWindowNewCard);
    formCard.reset();
}

//Объявление функций

buttonPopupProfileOpen.addEventListener('click', openPopupProfile);
buttonPopupProfileClose.addEventListener('click', closePopupProfile);
formProfile.addEventListener('submit', handleProfileSubmit);

buttonOpenAddForma.addEventListener('click', handleClickOpenPopupAddNewCard);
buttonCloseAddForma.addEventListener('click', handleClickClosePopupAddNewCard);

buttonClosePopupCard.addEventListener('click', closePopupFullImage);
formCard.addEventListener('submit', handleCardSubmit);