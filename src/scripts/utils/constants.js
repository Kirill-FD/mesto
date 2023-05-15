//Массив для template
const initialCards = [
    {
        title: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
        title: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
        title: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
        title: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
        title: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
        title: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    }
];


const buttonPopupProfileOpen = document.querySelector('.profile__edit-button');
const buttonPopupProfileClose = document.querySelector('.popup__close_button_profile');
const buttonOpenAddForma = document.querySelector('.profile__add-button');

const templateSelector = '#cardElement';
const popupProfileSelector = '.popup-profile';
const popupImageSelector = '.popup-card';
const listItemSelector = '.elements';
const popupCardSelector = '.popup-forma';

const infoConfig = {
    inputNameSelector: '.profile__title',
    InputAboutSelector: '.profile__content'
}

const formsValidator = {};

//Объявление константы формы валидации
const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__box',
    submitButtonClass: '.form__save',
    inactiveButtonClass: 'form__save_noactive',
    errorClass: 'form__error'
};

export {
    initialCards,
    buttonPopupProfileOpen,
    buttonPopupProfileClose,
    buttonOpenAddForma,
    templateSelector,
    popupProfileSelector,
    popupImageSelector,
    listItemSelector,
    popupCardSelector,
    infoConfig,
    formsValidator,
    validationConfig
};