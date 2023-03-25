//Объявление переменных попапа профиля
const popupButtonOpen = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup__form_add_profile');
const popupProfileClose = popup.querySelector('.popup__close_button_profile');
let formBoxName = popup.querySelector('.form__box_input_name');
let formBoxContent = popup.querySelector('.form__box_input_content');
let profileName = document.querySelector('.profile__title');
let profileContent = document.querySelector('.profile__content');
const popupContainer = popup.querySelector('.form');

//Функция открытия попапа
function openPopup() {
    popup.classList.add('popup_opened');
    formBoxName.value = profileName.textContent;
    formBoxContent.value = profileContent.textContent;
}

//Функция закрытия попапа
function closePopup() {
    popup.classList.remove('popup_opened');
}

//Функция сохранения
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = formBoxName.value;
    profileContent.textContent = formBoxContent.value;
    closePopup();
}

//Объявление функций
popupButtonOpen.addEventListener('click', openPopup);
popupProfileClose.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', handleFormSubmit);

//Объявление переменных попапа формы добавления карточки
const formaButtonOpen = document.querySelector('.profile__add-button');
const forma = document.querySelector('.popup__form_add_card');
const formaButtonClose = forma.querySelector('.popup__close_button_forma');


//Функция открытия попапа
function openForma() {
    forma.classList.add('popup_opened');
}

//Функция закрытия попапа
function closeForma() {
    forma.classList.remove('popup_opened');
}

//Объявление функций
formaButtonOpen.addEventListener('click', openForma);
formaButtonClose.addEventListener('click', closeForma);

//Массив для template
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: 'Архыз'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt: 'Челябинская область'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt: 'Иваново'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt: 'Камчатка'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt: 'Холмогорский район'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        alt: 'Байкал'
    }
];

//Объявление переменных для создания карточки
const elements = document.querySelector('.elements');
const formCard = document.querySelector('.form__create_new_card');
const cardName = formCard.querySelector('.form__box_input_title');
const cardLink = formCard.querySelector('.form__box_input_link');

//Функция создания карточки
function makeCard(card) {
    const cardTemplate = document.querySelector('.template').content;
    const newCard = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = newCard.querySelector('.element__image');
    cardImage.setAttribute("src", card.link);
    cardImage.setAttribute("alt", card.alt);
    const cardTitle = newCard.querySelector(".element__title");
    cardTitle.textContent = card.name;
    const removeButton = newCard.querySelector('.element__remove');
    removeButton.addEventListener('click', function (evt) {
        const urn = evt.target;
        const image = urn.closest('.element');
        image.remove();
    });
    const likeButton = newCard.querySelector('.element__like');
    likeButton.addEventListener('click', function (evt) {
        const elementLike = evt.target;
        elementLike.classList.toggle("element__like_active");
    });
    const largeCard = newCard.querySelector('.element__image');
    largeCard.addEventListener('click', openCard);
    return newCard;
}

initialCards.forEach((card) => {
    elements.prepend(makeCard(card));
});

//Сохранение карточки
function handleCardSubmit(evt) {
    evt.preventDefault();
    const save = {
        name: cardName.value,
        link: cardLink.value,
    };
    elements.prepend(makeCard(save));
    closeForma(evt);
    formCard.reset();
}

//Объявление функций
formCard.addEventListener('submit', handleCardSubmit);

//Объявление переменных для попапа открытия карточки
const cardOpen = document.querySelector('.popup-card');
const cardClose = document.querySelector('.popup-card__close');

//Функция открытия попапа карточки
function openCard(evt) {
    const largeImage = document.querySelector('.popup-card__image');
    const largeTitle = document.querySelector('.popup-card__title');
    largeImage.src = evt.target.src
    largeTitle.textContent = evt.target.alt
    cardOpen.classList.add('popup-card_opened');
}

//Функция закрытия попапа карточки
function closeCard() {
    cardOpen.classList.remove('popup-card_opened');
}

cardClose.addEventListener('click', function(){
    closeCard();
});