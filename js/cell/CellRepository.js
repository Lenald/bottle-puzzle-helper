import {Cell} from "./Cell.js";
import {PopupPalette} from "../PopupPalette.js";
import {Palette} from "../Palette.js";

export class CellRepository {
    cells = [];
    lastId = -1;
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

    create() {
        this.cells[++this.lastId] = new Cell(this.lastId);

        return this.cells[this.lastId];
    }

    getByElement(element) {
        return this.getById(parseInt(element.getAttribute('data-id')));
    }

    getById(id) {
        if (this.cells[id]) {
            return this.cells[id];
        }

        throw new Error('No such entity with id ' + id);
    }

    initActiveCell(element) {
        this.activeCell = this.getByElement(element);
        this.activeCell.setActive();
    }

    reinitActiveCell() {
        let zoom = Math.round(window.outerWidth / window.innerWidth * 100) / 100;
        this.activeCell.setActive(zoom);
    }

    calculatePopupPosition() {
        return {
            top: Math.round(this.activeCell.top + this.activeCell.size / 2),
            left: Math.round(this.activeCell.left + this.activeCell.size / 2)
        };
    }
}