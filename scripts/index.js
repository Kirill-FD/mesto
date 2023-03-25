//Объявление переменных

//Объявление переменных попапа профиля
const buttonPopupProfileOpen = document.querySelector('.profile__edit-button');
const modalWindowProfile = document.querySelector('.popup-profile');
const popupProfileClose = modalWindowProfile.querySelector('.popup__close_button_profile');
const inputFormBoxName = modalWindowProfile.querySelector('.form__box_input_name');
const inputFormAboutProfile = modalWindowProfile.querySelector('.form__box_input_about');
const profileName = document.querySelector('.profile__title');
const profileContent = document.querySelector('.profile__content');
const formContainer = modalWindowProfile.querySelector('.form-profile');

//Объявление переменных попапа формы добавления карточки
const buttonPopupFormaOpen = document.querySelector('.profile__add-button');
const modalWindowNewCard = document.querySelector('.popup-forma');
const buttonFormaClose = modalWindowNewCard.querySelector('.popup__close_button_forma');

//Объявление переменных для попапа открытия карточки
const modalWindowFullImage = document.querySelector('.popup-card');
const largeImage = document.querySelector('.popup__image');
const largeTitle = document.querySelector('.popup__title');
const cardClose = document.querySelector('.popup__close_button_card');

//Объявление переменных для создания карточки
const elements = document.querySelector('.elements');
const formCard = document.querySelector('.form-card');
const inputFormCardName = formCard.querySelector('.form__box_input_title');
const inputFormCardLink = formCard.querySelector('.form__box_input_link');


//Функции

//Функция открытия попапа
function openPopup() {
    modalWindowProfile.classList.add('popup_opened');
    inputFormBoxName.value = profileName.textContent;
    inputFormAboutProfile.value = profileContent.textContent;
}

//Функция закрытия попапа
function closeProfile() {
    modalWindowProfile.classList.remove('popup_opened');
}

//Функция сохранения
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputFormBoxName.value;
    profileContent.textContent = inputFormAboutProfile.value;
    closeProfile();
}

//Функция открытия попапа
function openForma() {
    modalWindowNewCard.classList.add('popup_opened');
}

//Функция закрытия попапа
function closeForma() {
    modalWindowNewCard.classList.remove('popup_opened');
}

//Функция открытия попапа карточки
function openCard(evt) {
    largeImage.src = evt.target.src
    largeTitle.textContent = evt.target.alt
    modalWindowFullImage.classList.add('popup_opened');
}

//Функция закрытия попапа карточки
function closeCard() {
    modalWindowFullImage.classList.remove('popup_opened');
}

cardClose.addEventListener('click', function () {
    closeCard();
});

//Функция создания карточки
function makeCard(card) {
    const cardTemplate = document.querySelector('.template').content;
    const newCard = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = newCard.querySelector('.element__image');
    cardImage.setAttribute('src', card.link);
    cardImage.setAttribute('alt', card.alt);
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
        name: inputFormCardName.value,
        link: inputFormCardLink.value,
    };
    elements.prepend(makeCard(save));
    closeForma(evt);
    formCard.reset();
}

//Объявление функций

buttonPopupProfileOpen.addEventListener('click', openPopup);
popupProfileClose.addEventListener('click', closeProfile);
formContainer.addEventListener('submit', handleFormSubmit);

formCard.addEventListener('submit', handleCardSubmit);

buttonPopupFormaOpen.addEventListener('click', openForma);
buttonFormaClose.addEventListener('click', closeForma);