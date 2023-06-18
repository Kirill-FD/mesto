export default class UserInfo {
    constructor(inputNameSelector, inputAboutSelector, inputAvatar) {
        this._inputName = document.querySelector(inputNameSelector);
        this._inputAbout = document.querySelector(inputAboutSelector);
        this._inputAvatar = document.querySelector(inputAvatar);
    }

    getUserInfo() {
        return {
            name: this._inputName.textContent,
            about: this._inputAbout.textContent
        }
    }

    setUserInfo({ avatar, name, about }) {
        this._inputAvatar.src = avatar
        this._inputName.textContent = name
        this._inputAbout.textContent = about
    }

    setId(id) {
        this._id = id;
    }

    getId() {
        return this._id;
    }
}