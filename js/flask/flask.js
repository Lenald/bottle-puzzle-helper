define([
    'jquery',
    'cellRepository'
], function($, cellRepository) {
    'use strict';

    return function(id) {
        return {
            id: id,
            content: [],

            getId: function() {
                return this.id;
            },

            getFreeValue: function() {
                return 4 - this.content.length;
            },

            getTopColor: function() {
                return (this.content.length) ? this.content[this.content.length - 1] : '';
            },

            addCell: function(cell) {
                this.content.push(cell);
            },

            extractCell: function() {
                return this.content.pop();
            },

            fulfill: function() {
                if (this.content.length) {
                    throw new Error('Not empty flask!');
                }

                for (let i = 0; i < 4; i++) {
                    this.content.push(cellRepository.create());
                }
            },

            toHtml: function() {
                let content = '';

                this.content.forEach(function(item) {
                    content += item.toHtml();
                });

                return `<div class="flask" data-id="${this.getId()}">${content}</div>`;
            }
        }
    }
});