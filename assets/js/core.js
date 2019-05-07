// The preview canvas
const drawCanvas = document.querySelector("#bootPreview");
// The context of the preview canvas
const drawCanvasCtx = drawCanvas.getContext("2d");
// Width of the Nintendo Switch screen, and by extension, the canvas
const CANVAS_WIDTH = 1280;
// Height of the Nintendo Switch screen, and by extension, the canvas
const CANVAS_HEIGHT = 720;

// Load the symbols spritesheet, containing the energy logos
var symbolSheet = new Image();
symbolSheet.src = "/assets/img/symbols.png";

// Disable image smoothing, results in a blurry output otherwise
drawCanvasCtx.imageSmoothingEnabled = false;

/**
 * Draws a string of text, with accurate character spacing
 * @param {string} text The text to write to the screen
 * @param {number} x The x co-ordinate of the text
 * @param {number} y The y co-ordinate of the text
 * @param {string} color The color in which to write the text
 */
function drawText(text, x, y, color = 'gray'){
    drawCanvasCtx.font = "32px PerfectDOSVGA437Win";
    drawCanvasCtx.fillStyle = color;
    drawCanvasCtx.textBaseline = "top"; 

    for (var i = 0; i < text.length; i++) {
        drawCanvasCtx.fillText(text.charAt(i), x + (i * 16), y);
    }
}

/**
 * Resets and redraws all elements on the canvas
 */
function redrawCanvas(){
    // The type of firmware the user is running
    var cfwType = $('select[name=type] option:selected', "#settings");
    // The firmware version selected by the user
    var firmwareVersion = $('select[name=firmware] option:selected', "#settings");
    // The size of the internal eMMC
    var emmcSize = $('select[name=emmc] option:selected', "#settings");
    // The size of the external SD
    var sdSize = $('select[name=sd] option:selected', "#settings");
    // Copyright information, at the bottom of the screen
    var copyrightLine = '';

    // Reset the canvas and draw the black background
    drawCanvasCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawCanvasCtx.fillStyle = "black";
    drawCanvasCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);



    // Draw any text the user requests
    drawText(cfwType.text(), 64, 16);
    drawText("Copyright (C) 2019, Team ReSwitched", 64, 48);

    // Draw the 'little blue man'
    drawCanvasCtx.drawImage(symbolSheet, 40, 10, 21, 29, 8, 16, 42, 58);
    // drawCanvasCtx.drawImage(blueman, 20, 20);
}

// Every time an input is changed, modify the preview
$("#settings input, #settings select").on('change', function() {
    console.log("Settings change");
    redrawCanvas();
});

// Draw the canvas once the window has loaded
window.onload = function() {
    redrawCanvas();
};