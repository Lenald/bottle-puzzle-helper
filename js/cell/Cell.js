export class Cell {
    id = -1;

    color = 'cell-black';

    top = 0;

    left = 0;

    size = 0;

    constructor(id) {
        this.id = id;
    }

    /**
     * @returns {int}
     */
    getId() {
        return this.id;
    }

    /**
     * @returns {Element}
     */
    getElement() {
        return document.querySelector(`[class^="cell-"][data-id="${this.id}"]`);
    }

    /**
     * @returns {string}
     */
    getColor() {
        return this.color;
    }

    /**
     * @param {string} color
     */
    setColor(color) {
        this.color = color;
        this.getElement().className = color;
    }

    /**
     * @returns {string}
     */
    toHtml() {
        return `<div class="${this.getColor()}" data-id="${this.getId()}"></div>`;
    }

    /**
     * @param {number} zoom
     */
    setActive(zoom = 1) {
        let element = this.getElement();

        this.top = element.offsetTop;
        this.left = element.offsetLeft;
        this.size = Math.round(element.offsetWidth * zoom);
    }
}