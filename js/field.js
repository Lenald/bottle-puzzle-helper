define([
    'jquery',
    'flaskRepository',
    'dragNDrop'
], function ($, flaskRepository, dragNDrop) {
    'use strict';

    return {
        initObservers: function() {
            let self = this;

            $('#generate').on('click', function() {
                self.generate();
                dragNDrop.initObservers();
            });
        },

        generate: function() {
            let field = $('#count'),
                count = Math.abs(parseInt(field.val()));

            if (count < 7 || count > 14) {
                count = 14;
                field.val(14);
            }

            flaskRepository.reset();

            for (let i = 0; i < count; i++) {
                flaskRepository.create();
            }

            flaskRepository.fulfill();

            $('#field').html(
                this.getRowHtml(0, Math.ceil(count / 2))
                + this.getRowHtml(Math.ceil(count / 2), count)
            );

            $(`#palette-counter [class^="cell-"], #popup-palette [class^="cell-"]`).each(function() {
                $(this).removeClass('inactive');
            });

            $('#palette-counter [class^="cell-"] div').each(function() {
                $(this).html(0);
            });
        },

        getRowHtml: function(from, to) {
            let row = '';

            for (let i = from; i < to; i++) {
                row += flaskRepository.getById(i).toHtml();
            }

            return `<div class="row">${row}</div>`;
        }
    }
});