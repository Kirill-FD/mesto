export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._initialCards = items;
        this.renderer = renderer;
    }

    createCardFromArray() {
        this._initialCards.forEach(element => {
            this.addItem(this.renderer(element))
        })
    }

    addItem(elementDom) {
        this._container.prepend(elementDom);
    }
}