export class Palette {
    /**
     * @param {string} prevColor
     * @param {string} currentColor
     */
    updateCounter (prevColor, currentColor) {
        if (prevColor !== `cell-black`) {
            let element = document.querySelector(`#palette-counter .${prevColor} div`);
            element.innerHTML = parseInt(element.innerHTML) - 1;

            if (parseInt(element.innerHTML) === 3) {
                this.activateColor(prevColor);
            }
        }

        if (currentColor !== `cell-black`) {
            let element = document.querySelector(`#palette-counter .${currentColor} div`);
            element.innerHTML = parseInt(element.innerHTML) + 1;

            if (parseInt(element.innerHTML) === 4) {
                this.inactivateColor(currentColor);
            }
        }
    }

    /**
     * @param {string} color
     */
    activateColor(color) {
        document.querySelectorAll(`#palette-counter .${color}, #popup-palette .${color}`).forEach(function(item) {
            item.classList.remove('inactive');
        });
    }

    /**
     * @param {string} color
     */
    inactivateColor(color) {
        document.querySelectorAll(`#palette-counter .${color}, #popup-palette .${color}`).forEach(function(item) {
            item.classList.add('inactive');
        });
    }
}