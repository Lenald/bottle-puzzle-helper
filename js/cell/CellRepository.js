import {Cell} from "./Cell.js";
import {PopupPalette} from "../PopupPalette.js";
import {Palette} from "../Palette.js";

export class CellRepository {
    /**
     * @type {Cell[]}
     */
    cells = [];

    lastId = -1;

    /**
     * @type {Cell}
     */
    activeCell = null;

    constructor() {
        this.popup = new PopupPalette();
        this.palette = new Palette();

        this.initObservers();
    }

    initObservers() {
        let self = this;

        window.onresize = function() {
            self.onResize();
        };

        document.addEventListener('set-color', function(e) {
            self.onSetColor(e.detail);
        });

        document.addEventListener('field-is-ready', function() {
            self.onFieldReady();
        });
    }

    onFieldReady() {
        let self = this;

        document.querySelectorAll('.flask [class^="cell-"]').forEach(function(element) {
            element.addEventListener('click', function(e) {
                /**
                 * The popup's top left corner is being positioned in center of the cell.
                 * So, if we click a bit higher or a bit left of it -- the popup.hideOnOuterClick()
                 * will immediately hide the popup, so we need to stop the event propagation right now.
                 */
                e.stopPropagation();
                self.onCellClick(e.target);
            });
        });
    }

    /**
     * @param {Element} element
     */
    onCellClick(element) {
        this.initActiveCell(element);
        this.popup.show(this.calculatePopupPosition());
    }

    onResize() {
        if (this.activeCell !== null) {
            this.reinitActiveCell();

            this.popup.setPosition(this.calculatePopupPosition());
        }
    }

    /**
     * @param {string} newColor
     */
    onSetColor(newColor) {
        let prevColor = this.activeCell.getColor();

        this.activeCell.setColor(newColor);
        this.activeCell = null;

        this.popup.hide();
        this.palette.updateCounter(prevColor, newColor);
    }

    reset() {
        this.lastId = -1;
        this.cells = [];
    }

    /**
     * @returns {Cell}
     */
    create() {
        this.cells[++this.lastId] = new Cell(this.lastId);

        return this.cells[this.lastId];
    }

    /**
     * @param {Element} element
     * @returns {Cell}
     */
    getByElement(element) {
        return this.getById(parseInt(element.getAttribute('data-id')));
    }

    /**
     * @param {int} id
     * @returns {Cell}
     */
    getById(id) {
        if (this.cells[id]) {
            return this.cells[id];
        }

        throw new Error('No such entity with id ' + id);
    }

    /**
     * @param {Element} element
     */
    initActiveCell(element) {
        this.activeCell = this.getByElement(element);
        this.activeCell.setActive();
    }

    reinitActiveCell() {
        let zoom = Math.round(window.outerWidth / window.innerWidth * 100) / 100;
        this.activeCell.setActive(zoom);
    }

    /**
     * @returns {{top: number, left: number}}
     */
    calculatePopupPosition() {
        return {
            top: Math.round(this.activeCell.top + this.activeCell.size / 2),
            left: Math.round(this.activeCell.left + this.activeCell.size / 2)
        };
    }
}