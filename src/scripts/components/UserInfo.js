export default class UserInfo {
    constructor(infoConfig) {
        this._inputName = document.querySelector(infoConfig.inputNameSelector);
        this._inputAbout = document.querySelector(infoConfig.InputAboutSelector);
    }

    getUserInfo() {
        return {
            name: this._inputName.textContent,
            about: this._inputAbout.textContent
        }
    }

    setUserInfo(dataProfile) {
        this._inputName.textContent = dataProfile.name;
        this._inputAbout.textContent = dataProfile.about;
    }
}