/**
 * TODO:
 *      - cancel drag'n'drop if cell is not on top, or the flask is full
 *      - check if cell can be placed (same color)
 *      - implement cascade move
 */

export class DragAndDrop {
    flaskRepository = null;

    constructor(flaskRepository) {
        this.flaskRepository = flaskRepository;

        this.initObservers();
    }

    initObservers() {
        let self = this;

        document.addEventListener('field-is-ready', function() {
            self.onFieldReady();
        });
    }

    onFieldReady() {
        let self = this;

        document.querySelectorAll('.flask').forEach(function(item) {
            item.addEventListener('dragstart', function (e) {
                self.flaskRepository.initActiveFlask(e.currentTarget);
                document.getElementById('field').classList.add('drag');
            });
            item.addEventListener('dragend', function (e) {
                document.getElementById('field').classList.remove('drag');
                self.flaskRepository.resetActiveFlask();
                self.flaskRepository.resetHoverFlask();
            });
            item.addEventListener('dragenter', function (e) {
                self.flaskRepository.initHoverFlask(e.currentTarget);
            });
        });

        document.querySelectorAll('#field .row').forEach(function(item) {
            item.addEventListener('dragenter', function (e) {
                self.flaskRepository.resetHoverFlask();
            });
        });
    }
}