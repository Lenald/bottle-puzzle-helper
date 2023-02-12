<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='https://fonts.googleapis.com/css?family=Manrope' rel='stylesheet'>
    <link rel="stylesheet" href="css/styles.css">
    <title>bottles</title>
</head>
<body>
    <div class="row">
        <input type="number" id="count" tabindex="1" value=14 min="7" max="14">
        <button id="generate" tabindex="2">GENERATE</button>
    </div>

    <div id="field"></div>

    <div id="popup-palette">
        <div class="row">
            <label class="cell-black"><input type="radio" name="color" value="black"></label>
        </div>
        <div class="row">
            <label class="cell-red"><input type="radio" name="color" value="red"></label>
            <label class="cell-orange"><input type="radio" name="color" value="orange"></label>
            <label class="cell-yellow"><input type="radio" name="color" value="yellow"></label>
            <label class="cell-mint"><input type="radio" name="color" value="mint"></label>
        </div>
        <div class="row">
            <label class="cell-green"><input type="radio" name="color" value="green"></label>
            <label class="cell-lime"><input type="radio" name="color" value="lime"></label>
            <label class="cell-cyan"><input type="radio" name="color" value="cyan"></label>
            <label class="cell-blue"><input type="radio" name="color" value="blue"></label>
        </div>
        <div class="row">
            <label class="cell-purple"><input type="radio" name="color" value="magenta"></label>
            <label class="cell-magenta"><input type="radio" name="color" value="magenta"></label>
            <label class="cell-pink"><input type="radio" name="color" value="pink"></label>
            <label class="cell-grey"><input type="radio" name="color" value="grey"></label>
        </div>
    </div>

    <div class="row">
        <div id="palette-counter">
            <div class="row">
                <div class="cell-red"><div>0</div></div>
                <div class="cell-orange"><div>0</div></div>
                <div class="cell-yellow"><div>0</div></div>
                <div class="cell-mint"><div>0</div></div>
                <div class="cell-green"><div>0</div></div>
                <div class="cell-lime"><div>0</div></div>
            </div>
            <div class="row">
                <div class="cell-cyan"><div>0</div></div>
                <div class="cell-blue"><div>0</div></div>
                <div class="cell-purple"><div>0</div></div>
                <div class="cell-magenta"><div>0</div></div>
                <div class="cell-pink"><div>0</div></div>
                <div class="cell-grey"><div>0</div></div>
            </div>
        </div>
    </div>

    <script type="module">
        import {Field} from "./js/Field.js";

        let field = new Field();
        field.generate();
    </script>
</body>
</html>