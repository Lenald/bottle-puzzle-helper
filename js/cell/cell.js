define([
    'jquery'
], function($) {
    'use strict';

    return function(id) {
        return {
            id: id,
            color: 'cell-black',

            getId: function() {
                return this.id;
            },

            getColor: function() {
                return this.color;
            },

            setColor: function(color) {
                this.color = color
            },

            toHtml: function() {
                return `<div class="${this.getColor()}" data-id="${this.getId()}" draggable="true"></div>`;
            }
        }
    }
});