import {CellRepository} from "../cell/CellRepository.js";
import {Flask} from "./Flask.js";

export class FlaskRepository {
    activeFlask = null;
    hoverFlask = null;
    lastId = -1;
    flasks = [];

    constructor() {
        this.cellRepository = new CellRepository();
    }

    reset() {
        this.lastId = -1;
        this.flasks = [];
        this.cellRepository.reset();
    }

    create() {
        this.flasks[++this.lastId] = new Flask(this.lastId, this.cellRepository);

        return this.flasks[this.lastId];
    }

    getById(id) {
        if (this.flasks[id]) {
            return this.flasks[id];
        }

        throw new Error('No such entity with id ' + id);
    }

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
        this.hoverFlask = this.getByElement(element);

        if (this.hoverFlask.getTopColor() === this.activeFlask.getTopColor()) {
            this.unmarkHover();
            element.classList.add('dragover');
        }
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

    moveCell(cellSelector) {
        // let flaskFrom = this.getById(cellSelector.parent().attr('data-id')),
        //     flaskTo = this.getById(this.hoverFlask.attr('data-id')),
        //     cellObject = flaskFrom.extractCell();
        //
        // if (flaskTo.getFreeValue() && (flaskTo.getTopColor() === cellObject.getColor() || !flaskTo.getTopColor())) {
        //     flaskTo.addCell(cellObject);
        //     $(cellSelector).appendTo(this.hoverFlask);
        // } else {
        //     flaskFrom.addCell(cellObject);
        // }
    }
}