//Объявление переменных
const popupButtonOpen = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupButtonClose = popup.querySelector(".popup__close");
let formBoxName = popup.querySelector(".form__string_box_name");
let formBoxContent = popup.querySelector(".form__string_box_content");
let profileName = document.querySelector(".profile__title");
let profileContent = document.querySelector(".profile__content");
const popupContainer = popup.querySelector(".form");
// let elementLike = document.querySelector(".element__like");

//Функция открытия попапа
function openPopup() {
    popup.classList.add("popup_opened");
    formBoxName.value = profileName.textContent;
    formBoxContent.value = profileContent.textContent;
}

//Функция закрытия попапа
function closePopup() {
    popup.classList.remove("popup_opened");
}

//Функция сохранения
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = formBoxName.value;
    profileContent.textContent = formBoxContent.value;
    closePopup();
}

// function clickLike () {
//     elementLike.classList.toggle("element__like_active");
// }

popupButtonOpen.addEventListener("click", openPopup);
popupButtonClose.addEventListener("click", closePopup);
popupContainer.addEventListener("submit", handleFormSubmit);
// elementLike.addEventListener("click", clickLike);