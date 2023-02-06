define([
    'jquery',
    'popupPalette'
], function($, popup) {
    'use strict';

    return {
        initObservers: function() {
            let self = this;

            $(document).on('color-changed', function(e, prevColor, currentColor) {
                self.updateCounter(prevColor, currentColor);
                popup.hide();
            });

            $('#popup-palette label').on('click', function(e) {
                if (e.target.tagName === 'LABEL' && !$(e.target).hasClass('inactive')) {
                    $(document).trigger('set-color', [$(e.target).attr('class')]);
                }
            });
        },

        updateCounter: function (prevColor, currentColor) {
            if (prevColor !== `cell-black`) {
                let element = $(`#palette-counter .${prevColor} div`);
                element.html(parseInt(element.html()) - 1);

                if (parseInt(element.html()) === 3) {
                    this.activateColor(prevColor);
                }
            }

            if (currentColor !== `cell-black`) {
                let element = $(`#palette-counter .${currentColor} div`);
                element.html(parseInt(element.html()) + 1);

                if (parseInt(element.html()) === 4) {
                    this.inactivateColor(currentColor);
                }
            }
        },

        activateColor: function(color) {
            $(`#palette-counter .${color}, #popup-palette .${color}`).each(function() {
                $(this).removeClass('inactive');
            });
        },

        inactivateColor: function(color) {
            $(`#palette-counter .${color}, #popup-palette .${color}`).each(function() {
                $(this).addClass('inactive');
            });
        }
    }
});