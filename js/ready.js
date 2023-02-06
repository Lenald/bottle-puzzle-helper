define([
    'jquery',
    'activeCell',
    'palette',
    'popupPalette',
    'field'
], function ($, activeCell, palette, popupPalette, field) {
    'use strict';

    let modules = Array.from(arguments);
    modules.shift(); //skip jQuery

    $(document).ready(function() {
        modules.forEach(function(module) {
            if (module.hasOwnProperty('initObservers')) {
                module.initObservers();
            }
        });

        field.generate();
    });
});

