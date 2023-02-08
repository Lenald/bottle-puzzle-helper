define([
    'jquery',
    'cell'
], function($, cell) {
    'use strict';

    return {
        cells: [],
        lastId: -1,

        reset: function() {
            this.lastId = -1;
            this.cells = [];
        },

        create: function() {
            this.cells[++this.lastId] = cell(this.lastId);

            return this.cells[this.lastId];
        },

        getById: function(id) {
            if (this.cells[id]) {
                return this.cells[id];
            }

            throw new Error('No such entity with id ' + id);
        }
    }
});