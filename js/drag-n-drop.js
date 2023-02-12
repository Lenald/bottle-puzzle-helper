/**
 * TODO:
 *      - cancel drag'n'drop if cell is not on top, or the flask is full
 *      - check if cell can be placed (same color)
 *      - implement cascade move
 */

define([
    'jquery',
    'cellRepository',
    'flaskRepository'
], function($, cellRepository, flaskRepository) {
    'use strict';

    return {
        initObservers: function() {
            let self = this;

            $('.flask').on('dragenter', function(e) {
                if (e.eventPhase === 2) {
                    flaskRepository.setDragOver($(e.target));
                }
            }).on('dragleave', function(e) {
                if (e.eventPhase === 2) {
                    flaskRepository.unmarkDragOver(e);
                }
            }).on('dragend', function(e) {
                let cellSelector = $(e.target);
                flaskRepository.moveCell(cellSelector);
                flaskRepository.resetDragOver();
            });

            $('.flask [class^="cell-"]').on('dragstart', function(e) {
                if ($(e.target).next().length) {
                    e.preventDefault();
                }
            }).on('dragenter', function(e) {
                /**
                 * Dirty hack:
                 *
                 * If we drag a cell from one flask over another
                 * and (same event, without release) over any cell in that flask -
                 * the event sequence will be following:
                 *  Mouse down
                 *   enter cell  (the one we are dragging),      phase AT_TARGET
                 *   enter flask (the one we are dragging from), phase BUBBLING
                 *   enter flask (the one we are dragging from), phase AT_TARGET
                 *
                 *  Mouse move aside (to the space between flasks)
                 *   leave cell  (the one we are dragging),      phase AT_TARGET
                 *   leave flask (the one we are dragging from), phase BUBBLING
                 *   leave flask (the one we are dragging from), phase AT_TARGET
                 *
                 *  Mouse move aside (to the second flask)
                 *   enter flask (the one we are over),          phase AT_TARGET
                 *
                 *  Mouse move to the nearest cell inside the flask
                 *   enter cell  (the one we are over now),      phase AT_TARGET
                 *   enter flask (the one we are over),          phase BUBBLING
                 *   leave flask (the one we are over),          phase AT_TARGET
                 *
                 *  Mouse up
                 *   leave cell  (the one we are over),          phase AT_TARGET
                 *   leave flask (the one we are over),          phase BUBBLING
                 *
                 * As we can see, when we enter a cell - the flask spawns 'enter flask' and right after it - 'leave flask'.
                 * Because of that the flask loses its highlight class .dragover
                 *
                 * To avoid this issue - we need on cell-dragenter disable the flask-ondragleave
                 * and restore it on cell-dragleave
                 */
                if (e.eventPhase === 2) {
                    $(e.target).parent().off('dragleave');
                }
            }).on('dragleave', function(e) {
                if (e.eventPhase === 2) {
                    $(e.target).parent().on('dragleave', function(e) {
                        flaskRepository.unmarkDragOver(e);
                    });
                }
            });
        }
    }
});