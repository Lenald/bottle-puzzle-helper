define([
    'jquery',
    'popupPalette',
    'palette'
], function ($, popup) {
    'use strict';

    return {
        element: null,
        left: 0,
        top: 0,
        size: 0,

        initObservers: function() {
            let self = this;

            $(document).on('click', '.bottle > div', function(e) {
                self.init(e);

                /*
                 * The popup's top left corner is being positioned in center of the cell.
                 * So, if we click a bit higher or a bit left of it -- the popup.hideOnOuterClick()
                 * will immediately hide the popup, so we need to stop the event propagation right now.
                 */
                e.stopPropagation();
            });

            $(window).resize(function() {
                if (self.element !== null) {
                    self.reinit();
                }
            });

            $(document).on('set-color', function(e, newColor) {
                self.setClass(newColor);
            });
        },

        init: function(e) {
            this.element = $(e.target);

            this.initPosition();

            popup.show(this.calculatePopupPosition());
        },

        reinit: function() {
            this.initPosition();

            let zoom = Math.round(window.outerWidth / window.innerWidth * 100) / 100;
            this.size = Math.round(this.size * zoom);

            popup.setPosition(this.calculatePopupPosition());
        },

        initPosition: function() {
            let position = this.element.position();

            this.top = position.top;
            this.left = position.left;
            this.size = parseInt(this.element.css('width'));
        },

        setClass: function(newColor) {
            let prevColor = this.element.attr('class');
            this.element.attr('class', newColor);

            $(document).trigger('color-changed', [prevColor, newColor]);
        },

        calculatePopupPosition: function() {
            return {
                top: Math.round(this.top + this.size / 2),
                left: Math.round(this.left + this.size / 2)
            };
        }
    }
});