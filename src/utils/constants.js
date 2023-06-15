//Константы

const buttonPopupProfileOpen = document.querySelector('.profile__edit-button');
const buttonPopupProfileClose = document.querySelector('.popup__close_button_profile');
const buttonOpenAddForma = document.querySelector('.profile__add-button');
const avatarElement = document.querySelector('.profile__avatar-button');
// const avatarImageElement = document.querySelector('.profile__avatar');

const templateSelector = '#cardElement';
const popupProfileSelector = '.popup-profile';
const popupImageSelector = '.popup-card';
const listItemSelector = '.elements';
const popupCardSelector = '.popup-forma';
const inputNameSelector = '.profile__title';
const inputAboutSelector = '.profile__content';
const inputAvatar = '.profile__avatar';
const popupDeleteSelector = '.popup-delete';
const popupEditAvatarSelector = '.popup-edit';

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
    buttonPopupProfileOpen,
    buttonPopupProfileClose,
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
};