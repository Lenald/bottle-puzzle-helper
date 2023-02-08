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
        popupPalette: 'popupPalette',
        cell: 'cell/cell',
        cellRepository: 'cell/cellRepository',
        flask: 'flask/flask',
        flaskRepository: 'flask/flaskRepository',
        dragNDrop: 'drag-n-drop'
    }
});

requirejs(['ready']);