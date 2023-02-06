requirejs.config({
    baseUrl: 'js',
    paths: {
        activeCell: 'activeCell',
        field: 'field',
        jquery: 'lib/jquery-3.6.3', //dev
        // jquery: 'lib/jquery-3.6.3.min', //prod
        ready: 'ready',
        palette: 'palette',
        popup: 'popup',
        popupPalette: 'popup-palette'
    }
})

requirejs(['ready']);