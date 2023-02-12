/**
 * TODO:
 *      - implement cascade move
 */

export class DragAndDrop {
    /**
     * @type {FlaskRepository}
     */
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
                self.onDragStart(e);
            });
            item.addEventListener('dragend', function (e) {
                document.getElementById('field').classList.remove('drag');
                self.flaskRepository.moveCell();
            });
            item.addEventListener('dragenter', function (e) {
                self.flaskRepository.initHoverFlask(e.currentTarget);
            });
        });

        document.querySelectorAll('#field .row').forEach(function(item) {
            item.addEventListener('dragenter', function (e) {
                if (e.eventPhase === e.AT_TARGET) {
                    self.flaskRepository.resetHoverFlask();
                }
            });
        });
    }

    onDragStart(e) {
        let flask = this.flaskRepository.getByElement(e.target);

        if (flask.getFreeValue() === 4 || flask.getTopColor() === 'cell-black') {
            e.preventDefault();
            return;
        }

        this.flaskRepository.initActiveFlask(e.currentTarget);
        document.getElementById('field').classList.add('drag');
    }
}