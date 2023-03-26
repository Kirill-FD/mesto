//Объявление переменных

//Объявление переменных попапа профиля
const popup = document.querySelector('.popup');
const buttonPopupProfileOpen = document.querySelector('.profile__edit-button');
const modalWindowProfile = document.querySelector('.popup-profile');
const buttonPopupProfileClose = modalWindowProfile.querySelector('.popup__close_button_profile');
const inputFormBoxName = modalWindowProfile.querySelector('.form__box_input_name');
const inputFormAboutProfile = modalWindowProfile.querySelector('.form__box_input_about');
const profileName = document.querySelector('.profile__title');
const profileContent = document.querySelector('.profile__content');
const formContainer = modalWindowProfile.querySelector('.form-profile');

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
const elements = document.querySelector('.elements');
const formCard = document.querySelector('.form-card');
const inputFormCardName = formCard.querySelector('.form__box_input_title');
const inputFormCardLink = formCard.querySelector('.form__box_input_link');


//Функции

//Универсальная функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

//Универсальная функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

//Функция открытия попапа профиля
function openPopupProfile() {
    openPopup(modalWindowProfile);
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
function openPopupForma() {
    openPopup(modalWindowNewCard);
}
//Функция закрытия попапа добавления карточки
function closePopupForma() {
    closePopup(modalWindowNewCard);
}

//Функция открытия попапа карточки
function openPopupCard(evt) {
    largeImage.src = evt.target.src
    largeTitle.textContent = evt.target.alt
    openPopup(modalWindowFullImage);
}

//Функция закрытия попапа карточки
function closePopupCard() {
    closePopup(modalWindowFullImage);
}

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
    largeCard.addEventListener('click', openPopupCard);
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
    closePopup(modalWindowNewCard);
    formCard.reset();
}

//Объявление функций

buttonPopupProfileOpen.addEventListener('click', openPopupProfile);
buttonPopupProfileClose.addEventListener('click', closePopupProfile);
formContainer.addEventListener('submit', handleProfileSubmit);

buttonOpenAddForma.addEventListener('click', openPopupForma);
buttonCloseAddForma.addEventListener('click', closePopupForma);

buttonClosePopupCard.addEventListener('click', closePopupCard);
formCard.addEventListener('submit', handleCardSubmit);