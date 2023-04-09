//Объявление переменных

//Объявление переменных попапа профиля
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
const elements = document.querySelector('.elements');
const formCard = document.querySelector('.form-card');
const inputFormCardName = formCard.querySelector('.form__box_input_title');
const inputFormCardLink = formCard.querySelector('.form__box_input_link');

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

//Функция закрытия попапа при клике на overlay профиля
function closePopupOnOverlayProfile(evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(modalWindowProfile);
  }
}

//Функция открытия попапа добавления карточки
function handleClickOpenPopupAddNewCard() {
    openPopup(modalWindowNewCard);
    const button = modalWindowNewCard.querySelector('.form__save');
    button.classList.add('form__save_noactive');
    button.setAttribute('disabled', true)
}

//Функция закрытия попапа добавления карточки
function handleClickClosePopupAddNewCard() {
    closePopup(modalWindowNewCard);
}

//Функция закрытия попапа при клике на overlay карточки
function closePopupOnOverlayCard(evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(modalWindowNewCard);
  }
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

//Функция закрытия попапа при клике на overlay картинки
function closePopupOnOverlayImage(evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(modalWindowFullImage);
  }
}

//Функция создания карточки
function makeCard(card) {
    const cardTemplate = document.querySelector('.template').content;
    const newCard = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = newCard.querySelector('.element__image');
    cardImage.setAttribute('src', card.link);
    cardImage.setAttribute('alt', card.name);
    const cardTitle = newCard.querySelector(".element__title");
    cardTitle.textContent = card.name;
    const removeButton = newCard.querySelector('.element__remove');
    removeButton.addEventListener('click', function (evt) {
        const urn = evt.target;
        const image = urn.closest('.element');
        image.remove();
    });
    const likeButton = newCard.querySelector('.element__like');
    // likeButton.addEventListener('click', function (evt) {
    //     const elementLike = evt.target;
    //     elementLike.classList.toggle("element__like_active");
    // });
    likeButton.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('element__like')) {
          evt.target.classList.toggle('element__like_active');
      };
    })
    const largeCard = newCard.querySelector('.element__image');
    largeCard.addEventListener('click', () => handleClickOpenFullImageCard(card));
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

modalWindowProfile.addEventListener('click', closePopupOnOverlayProfile);
buttonPopupProfileOpen.addEventListener('click', openPopupProfile);
buttonPopupProfileClose.addEventListener('click', closePopupProfile);
formProfile.addEventListener('submit', handleProfileSubmit);

modalWindowNewCard.addEventListener('click', closePopupOnOverlayCard);
buttonOpenAddForma.addEventListener('click', handleClickOpenPopupAddNewCard);
buttonCloseAddForma.addEventListener('click', handleClickClosePopupAddNewCard);

modalWindowFullImage.addEventListener('click', closePopupOnOverlayImage);
buttonClosePopupCard.addEventListener('click', closePopupFullImage);
formCard.addEventListener('submit', handleCardSubmit);