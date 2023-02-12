import {CellRepository} from "../cell/CellRepository.js";
import {Flask} from "./Flask.js";

export class FlaskRepository {
    /**
     * @type {Flask}
     */
    activeFlask = null;

    /**
     * @type {Flask}
     */
    hoverFlask = null;

    lastId = -1;

    /**
     * @type {Flask[]}
     */
    flasks = [];

    constructor() {
        this.cellRepository = new CellRepository();
    }

    reset() {
        this.lastId = -1;
        this.flasks = [];
        this.cellRepository.reset();
    }

    /**
     * @returns {Flask}
     */
    create() {
        this.flasks[++this.lastId] = new Flask(this.lastId, this.cellRepository);

        return this.flasks[this.lastId];
    }

    /**
     * @param {int} id
     * @returns {Flask}
     */
    getById(id) {
        if (this.flasks[id]) {
            return this.flasks[id];
        }

        throw new Error('No such entity with id ' + id);
    }

    /**
     * @param element
     * @returns {Flask}
     */
    getByElement(element) {
        return this.getById(element.getAttribute('data-id'));
    }

    fulfill() {
        for (let i = 0; i < this.flasks.length - 2; i++) {
            this.flasks[i].fulfill();
        }
    }

    initActiveFlask(element) {
        this.activeFlask = this.getByElement(element);
    }

    resetActiveFlask() {
        this.activeFlask = null;
    }

    initHoverFlask(element) {
        this.resetHoverFlask();

        let hoverFlask = this.getByElement(element);

        if (hoverFlask.getId() === this.activeFlask.getId()
            || !hoverFlask.getFreeValue()
            || (hoverFlask.getTopColor() && hoverFlask.getTopColor() !== this.activeFlask.getTopColor())
        ) {
            return;
        }

        this.hoverFlask = hoverFlask;
        element.classList.add('dragover');
    }

    unmarkHover() {
        document.querySelectorAll('.dragover').forEach(function(item) {
            item.classList.remove('dragover')
        });
    }

    resetHoverFlask() {
        this.unmarkHover();
        this.hoverFlask = null;
    }

    moveCell() {
        if (!this.hoverFlask) {
            return;
        }

        let cell = this.activeFlask.extractCell();
        this.hoverFlask.addCell(cell);

        this.hoverFlask.getElement().appendChild(cell.getElement());

        this.resetActiveFlask();
        this.resetHoverFlask();
    }
}