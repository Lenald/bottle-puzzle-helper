define([
    'jquery',
    'flask',
    'cellRepository'
], function($, flask, cellRepository) {
    'use strict';

    return {
        lastId: -1,
        flasks: [],

        reset: function() {
            this.lastId = -1;
            this.flasks = [];
            cellRepository.reset();
        },

        create: function() {
            this.flasks[++this.lastId] = flask(this.lastId);

            return this.flasks[this.lastId];
        },

        getById: function(id) {
            if (this.flasks[id]) {
                return this.flasks[id];
            }

            throw new Error('No such entity with id ' + id);
        },

        fulfill: function() {
            for (let i = 0; i < this.flasks.length - 2; i++) {
                this.flasks[i].fulfill();
            }
        }
    }
});