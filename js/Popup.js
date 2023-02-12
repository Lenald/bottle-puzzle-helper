export class Popup {
    isShown = false;
    htmlId = '';
    element = null;
    top = 0;
    left = 0;
    width = 0;
    height = 0;

    constructor() {
        this.initObservers()
    }

    initObservers() {
        let self = this;

        document.addEventListener('keydown', function(e) {
            self.hideOnEscape(e);
        });
        document.addEventListener('click', function(e) {
            self.hideOnOuterClick(e);
        });
    }

    setPosition(position) {
        this.top = position.top;
        this.left = position.left;

        this.getElement().style.top = this.top + 'px';
        this.getElement().style.left = this.left + 'px';
    }

    show(position) {
        this.isShown = true;
        this.setPosition(position);
        this.getElement().style.display = 'flex';
    }

    hide() {
        this.isShown = false;
        this.getElement().style.display = 'none';
    }

    hideOnEscape(e) {
        if (e.key === 'Escape') {
            this.hide();
        }
    }

    hideOnOuterClick(e) {
        if (this.isShown) {
            let isOutOfX = e.clientX < this.left || e.clientX > this.left + this.width,
                isOutOfY = e.clientY < this.top  || e.clientY > this.top  + this.height;

            if (isOutOfX || isOutOfY) {
                this.hide();
            }
        }
    }

    getElement() {
        if (this.element === null) {
            if (this.htmlId === '') {
                throw new Error('Popup not initialized. No htmlId.');
            }

            this.element = document.getElementById(this.htmlId)
        }

        return this.element;
    }
}