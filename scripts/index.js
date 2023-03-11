const popupButtonOpen = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupButtonClose = popup.querySelector(".popup__close");
let formBoxName = popup.querySelector("#Name");
let formBoxContent = popup.querySelector("#About");
let profileName = document.querySelector(".profile__container_info_title");
let profileContent = document.querySelector(".profile__content");
const popupContainer = popup.querySelector(".popup__container");
const formSave = document.querySelector(".form__save");
// let elementLike = document.querySelector(".element__like");

function openPopup() {
    popup.classList.add("popup__opened");
    formBoxName.value = profileName.textContent;
    formBoxContent.value = profileContent.textContent;
}

function closePopup() {
    popup.classList.remove("popup__opened");
}

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