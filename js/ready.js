define([
    'jquery',
    'activeCell',
    'palette',
    'popupPalette',
    'field',
    'dragNDrop'
], function ($, activeCell, palette, popupPalette, field, dragNDrop) {
    'use strict';

    let modules = Array.from(arguments);
    modules.shift(); //skip jQuery

    $(document).ready(function() {
        field.generate();

        modules.forEach(function(module) {
            if (module.hasOwnProperty('initObservers')) {
                module.initObservers();
            }
        });
    });
});

