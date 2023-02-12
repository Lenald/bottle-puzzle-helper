define([
    'jquery',
    'flask',
    'cellRepository'
], function($, flask, cellRepository) {
    'use strict';

    return {
        flaskDragOver: null,
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
        },

        setDragOver: function(item) {
            this.flaskDragOver = item;
            item.addClass('dragover');
        },

        unmarkDragOver: function(phase) {
            $('.dragover').removeClass('dragover');
        },

        resetDragOver: function() {
            this.flaskDragOver = null;
        },

        moveCell: function(cellSelector) {
            let flaskFrom = this.getById(cellSelector.parent().attr('data-id')),
                flaskTo = this.getById(this.flaskDragOver.attr('data-id')),
                cellObject = flaskFrom.extractCell();

            if (flaskTo.getFreeValue() && (flaskTo.getTopColor() === cellObject.getColor() || !flaskTo.getTopColor())) {
                flaskTo.addCell(cellObject);
                $(cellSelector).appendTo(this.flaskDragOver);
            } else {
                flaskFrom.addCell(cellObject);
            }
        }
    }
});