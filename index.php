<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Manrope">
    <link rel="stylesheet" href="css/fontello.css">
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

    <div class="row">
        <div id="about">
            <h2>What is it</h2>
            <p class="no-indent"><img class="left" src="images/open_start.webp"><span class="indent"></span>I recently started playing one game on my phone. The number of test tubes is given as an input. Each test tube is filled with different colored liquids. Each test tube contains 4 layers. The task is a method of transfusions from a test tube to a test tube to sort the liquids in one way or another.<img class="right" src="images/open_end.webp"> As a result, in each test tube, all 4 layers must be filled with liquid of the same color. There is only one rule – you can pour liquid from one test tube into another only if the second test tube is empty, or the top layer is the same color. For example, red liquid cannot be poured into a test tube with blue liquid. Also, in the case of a transfusion, as many layers of the same color are transferred as can fit in the receiving test tube.</p>
            <p>The game has several types of levels. I call them like this:</p>
            <p><strong>Open</strong> – this is when the player sees the color of each layer in each test tube.</p>
            <p><strong>Closed</strong> – this is when the player sees the color of only the topmost layer in each test tube. If the next layer is the same color, then it is also considered open. That is, the player sees the top color, no matter how much it is there. All other layers in the test tube are replaced by dark placeholders with questions. As soon as this placeholder becomes the top layer, it changes to the color that was actually there. If this layer is covered back by undoing the move, it will still remain visible. However, it will not work to abuse the cancellation, because free cancellations per level – 5. But more on that later.</p>
            <p><strong>Challenge</strong>. If the first two types of levels alternate (something like 3 open, 1 closed), then challenge levels are available only in daily levels. A kind of daily check, where 1 new level appears every day. As a reward for closing this entire month's bingo card, there is some kind of reward. So, a <strong>challenge</strong> level is just like a <strong>closed</strong> level, but the player sees only the color of one of the topmost layers of only the active test tube (the one that we selected as "pour from"). As soon as the test tube becomes inactive, the top color is hidden in the placeholder. Thus it turns into a transfusion of unknown liquids in a dark room at night. Liquids are also poured in one layer. Even if there were several layers of the same color in a test tube in a row, they will have to be poured one at a time.</p>
            <p>The game itself is quite addictive. A great time-killer for those who love logic puzzles. If the planning game can be called a logic puzzle... But...</p>
            <p>Before I opened PlayMarket for several years, it turns out that the industry has invented a new way to monetize casual games: paid everything. Paid hints, paid undo moves, paid other buttons. And you need to pay, of course, by viewing ads! And the ads, of course, are endlessly fucked up! Like stupid games like Mafia City, misleads like "our game is about opening sections one by one to fill the monster with lava, then fill the lava with water, then pour out the treasures and release the fucking princess", but in fact the game turns out to be about anything but that. Well, ya know... And of course, where would we be without them: ads after each level. If you don't want to – pay money.</p>
            <p>So it is in this game. Only 5 cancellations are given per level. If you spent all of them, then to get 5 more – watch the ad. Do not want? Well then start the level again.</p>
            <p>I solve the problems of such games by banning a specific application from accessing the Internet. However, with, at times, numerous restarts, keeping in mind where which color is in each of the 12 flasks on each of the 4 layers is very problematic. That's why I made myself such a helper.</p>
            <h2>How to use</h2>
            <p>At the very top, you can choose how many test tubes are in the level. During generation, each test tube is filled with 4 cells (the last two are always empty at the start).</p>
            <p>The field is divided into two halves. On the left is the starting map. All layers there are in the place where they are at the start of the level. You can only choose colors there. On the right is a map of the current state. There you can also choose colors, but you can also move the cells.</p>
            <p>To select a color, click on the cell. A popup will appear with a palette where you can select the desired color. A color set on any map will cause the same color to be set on a similar cell on another map.</p>
            <p>To move cells from one test tube to another (to pour) – drag a test tube with an open layer onto another test tube with an open layer of the same color or empty, and as many layers as will fit there will move. If it is possible to transfer from test tube A to test tube B, test tube B will be highlighted when hovering over it while dragging.</p>
            <p>If there are 4 cells of the same color on the map, this color will not be available for selection in the future. The counter is below both maps. To make it available again, somewhere in any test tube, you will have to repaint the cell in a different color (for example, black with a question mark).</p>
            <p>To start the level over (to copy the map on the left to the map on the right) – press the RESET button. All cells will move to their original position, but open colors will remain open.</p>
            <p>To reset everything at all – regenerate the map.</p>
            <p>You can undo moves with the undo button (<i class="icon undo"></i>). A move is a transfusion from test tube to test tube. Changing the color of the cells is not considered a move and cannot be canceled. Reset and regeneration reset the history, so they cannot be canceled either. The number of cancellations is not limited.</p>
            <p>There are two modes in the helper: for closed and challenge levels. In closed level mode, cells will move in cascade. That is, after moving a cell from test tube A to test tube B, if possible, subsequent cells of the same color will be moved from A as long as they are placed in B. Cancellation works in the same way. There is no cascading movement in Challenge mode. You can switch between modes in the settings on the top right.</p>
            <p>You can also invert the counters in the settings so that they count not how much of a particular color is on the map, but how much more of this color can be placed (so that they count not from 0 to 4, but vice versa from 4 to 0).</p>
            <p>Also in the settings you can enable hiding unused colors. In this case, if the number of used colors at a certain moment becomes equal to the number oftest tubes minus 2 (the number of initially filled test tubes), all unused colors will be hidden. For example, we have a level for 11 test tubes. From the start, 9 test tubes are filled. That is, in total, 9 colors participate in the game. In this case, at the moment of choosing the ninth color (when 9 unique colors are assigned to the cells in the game), all those not used will be hidden.</p>
        </div>
    </div>

    <script type="module">
        import {Field} from "./js/Field.js";

        let field = new Field();
        field.generate();
    </script>
</body>
</html>