define([
    'jquery'
], function ($) {
    'use strict';

    return {
        initObservers: function() {
            let self = this;

            $('#generate').on('click', function() {
                self.generate();
            });
        },

        generate: function() {
            let field = $('#count'),
                count = Math.abs(parseInt(field.val()));

            if (count < 7 || count > 14) {
                count = 14;
                field.val(14);
            }

            let html = '<div class="row">'
                + this.getGlassHtml().repeat(Math.ceil(count / 2))
                + '</div><div class="row">'
                + this.getGlassHtml().repeat(count - Math.ceil(count / 2) - 2)
                + this.getEmptyGlassHtml().repeat(2)
                + '</div>';

            $('#field').html(html);

            $(`#palette-counter [class^="tile-"], #popup-palette [class^="tile-"]`).each(function() {
                $(this).removeClass('inactive');
            });

            $('#palette-counter [class^="tile-"] div').each(function() {
                $(this).html(0);
            });
        },

        getGlassHtml: function() {
            return '<div class="glass">' + '<div class="tile-black"></div>'.repeat(4) + '</div>';
        },

        getEmptyGlassHtml() {
            return '<div class="glass"></div>';
        }
    }
});