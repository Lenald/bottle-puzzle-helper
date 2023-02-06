define([
    'jquery',
    'popup'
], function($, popup) {
    'use strict';

    return $.extend({}, popup, {
        selector: $('#popup-palette'),
        top: 0,
        left: 0,
        width: 185,
        height: 185
    });
});