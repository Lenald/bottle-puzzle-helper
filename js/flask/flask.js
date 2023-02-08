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
                return 4 - $(`#flask_${this.id} [class^="cell"]`).length;
            },

            getTopColor: function() {
                let cells = $(`#flask_${this.id} [class^="cell"]`);

                return (cells.length) ? cells.last().attr('class').match(/cell-[a-z]+?/)[0] : 'none';
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