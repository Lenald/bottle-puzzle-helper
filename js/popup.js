define([
    'jquery'
], function ($) {
    'use strict';

    return {
        isShown: false,
        selector: '',
        top: 0,
        left: 0,
        width: 0,
        height: 0,

        initObservers: function() {
            let self = this;

            $(document).on('keydown', function(e) {
                self.hideOnEscape(e);
            }).on('click', function(e) {
                self.hideOnOuterClick(e);
            });
        },

        setPosition: function(position) {
            this.top = position.top;
            this.left = position.left;

            this.getElement().css('top', this.top + 'px').css('left', this.left + 'px');
        },

        show: function(position) {
            this.isShown = true;
            this.setPosition(position);
            this.getElement().css('display', 'flex');
        },

        hide: function() {
            this.isShown = false;
            this.getElement().css('display', 'none');
        },

        hideOnEscape: function(e) {
            if (e.key === 'Escape') {
                this.hide();
            }
        },

        hideOnOuterClick: function(e) {
            if (this.isShown) {
                let isOutOfX = e.clientX < this.left || e.clientX > this.left + this.width,
                    isOutOfY = e.clientY < this.top  || e.clientY > this.top  + this.height;

                if (isOutOfX || isOutOfY) {
                    this.hide();
                }
            }
        },

        getElement: function() {
            if (this.selector === '') {
                throw new Error('Popup not initialized. No selector.');
            }
            
            return this.selector;
        }
    }
});