import {Popup} from "./Popup.js";

export class PopupPalette extends Popup{
    htmlId = 'popup-palette';
    top = 0;
    left = 0;
    width = 185;
    height = 185;

    initObservers() {
        super.initObservers();

        document.querySelectorAll('#popup-palette label').forEach(function(item){
            item.addEventListener('click', function(e) {
                if (e.target.tagName === 'LABEL' && !e.target.classList.contains('inactive')) {
                    document.dispatchEvent(new CustomEvent('set-color', {detail: e.target.getAttribute('class')}));
                }
            });
        });
    }
}