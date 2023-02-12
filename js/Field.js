import {FlaskRepository} from "./flask/FlaskRepository.js";
import {DragAndDrop} from "./DragAndDrop.js";

export class Field {
    /**
     * @type {DragAndDrop}
     */
    dragAndDrop = null;

    /**
     * @type {FlaskRepository}
     */
    flaskRepository = null;
    
    constructor() {
        this.flaskRepository = new FlaskRepository();
        this.dragAndDrop = new DragAndDrop(this.flaskRepository);

        this.initObservers();
    }
    
    initObservers() {
        let self = this;

        document.getElementById('generate').addEventListener('click', function() {
            self.generate();
        });
    }

    generate() {
        let field = document.getElementById('count'),
            count = Math.abs(parseInt(field.value));

        if (count < 7 || count > 14) {
            count = 14;
            field.value = 14;
        }

        this.flaskRepository.reset();

        for (let i = 0; i < count; i++) {
            this.flaskRepository.create();
        }

        this.flaskRepository.fulfill();

        document.getElementById('field').innerHTML = this.getRowHtml(0, Math.ceil(count / 2))
            + this.getRowHtml(Math.ceil(count / 2), count);

        document.querySelectorAll(`#palette-counter [class^="cell-"], #popup-palette [class^="cell-"]`)
            .forEach(function(item) {
                item.classList.remove('inactive');
            });

        document.querySelectorAll('#palette-counter [class^="cell-"] div').forEach(function(item) {
            item.innerHTML = '0';
        });

        document.dispatchEvent(new CustomEvent('field-is-ready'));
    }

    getRowHtml(from, to) {
        let row = '';

        for (let i = from; i < to; i++) {
            row += this.flaskRepository.getById(i).toHtml();
        }

        return `<div class="row">${row}</div>`;
    }
}