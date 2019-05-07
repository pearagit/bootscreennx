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
    drawCanvasCtx.fillStyle = color;
    drawCanvasCtx.textBaseline = "top"; 

    var backspace = 0;
    for (var i = 0; i < text.length; i++) {
        if (text.charAt(i) == '_'){
            if (drawCanvasCtx.fillStyle == "#ffffff")
                drawCanvasCtx.fillStyle = color
            else
                drawCanvasCtx.fillStyle = "white"
            backspace++;
            continue;
        }
        drawCanvasCtx.fillText(text.charAt(i), x + (i * 16) - (backspace * 16), y);
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
    var copyrightLine = "Copyright (C) 2019, ";
    // The chosen top-right logo to display
    var sideLogo = $('select[name=logoOptions] option:selected', "#settings");
    // Whether or not to display the bootloader message at the bottom of the screen
	var shouldDrawCustomBootString = $('input[name=hold]', "#settings").is(':checked');
	// The key to be held when entering the bootloader
	var bootloaderKey = $('select[name=onboot] option:selected', "#settings");
	// The bootloader to enter when the user presses the boot key
    var bootloader = $('input[name=boottool]', "#settings");
    // Time at which to hold the boot key
    var bootTime = $('select[name=firstTime] option:selected');

    // Whether to draw the custom bootloader given by the user
	var useCustomBootInput = false;
	// Whether to draw the custom CFW, and Copyright info, given by the user
	var useCustomCfw = false;

    // Changes selection box in input for custom bootloader
	if ($('select[name=boottool] option:selected', "#settings").val() == 'custom') {
		$('input[name=boottool]', "#settings").show();
		$('select[name=boottool]', "#settings").hide();
		useCustomBootInput = true;
    }
    
    // Changes selection box in input for custom CFW
	if ($('select[name=type] option:selected', "#settings").val() == 'custom') {
		$('input[name=type]', "#settings").show();
		$('input[name=typecopyright]', "#settings").show();
		$('select[name=type]', "#settings").hide();
		useCustomCfw = true;
    }
    
    // Set the copyright information
    if(!useCustomCfw){
		switch(cfwType.val()) {
			case 'atmosphere':
				copyrightLine += 'Team ReSwitched';
				break;
			case 'reinx':
				copyrightLine += 'Rei';
				break;
			case 'rajnx':
				copyrightLine += 'rajkosto';
				break;
			case 'sxos':
				copyrightLine += 'Team Xecuter';
				break;
		}
	}else{
		copyrightLine += $('input[name=typecopyright]', "#settings").val();
	}

    // Reset the canvas and draw the black background
    drawCanvasCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawCanvasCtx.fillStyle = "black";
    drawCanvasCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw the 'little blue man'
    drawCanvasCtx.drawImage(symbolSheet, 40, 10, 21, 29, 8, 16, 42, 58);

    // Draw logos at the top right of the screen
    switch (sideLogo.val()) {
        case 'energyStar':
            drawCanvasCtx.drawImage(symbolSheet, 0, 0, 133, 84, 966, 16, 266, 168);
            // Cover the 'little blue man' present in the energy star logo
            drawCanvasCtx.fillStyle = "black";
            drawCanvasCtx.fillRect(1040, 36, 50, 60);
            break;
        case 'energyStarAtmosphere':
            drawCanvasCtx.drawImage(symbolSheet, 0, 84, 133, 84, 966, 16, 266, 168);
			break;
        case 'atmosphere':
            drawCanvasCtx.drawImage(symbolSheet, 30, 168, 101, 84, 1100, 16, 151, 134);
			break;
    }
    
    // Set the custom bootloader input box to the users last selection
	if (!useCustomBootInput)
        $('input[name=boottool]', "#settings").val($('select[name=boottool] option:selected', "#settings").text());

    // Set the custom cfw input box to the users last selection
	if (!useCustomCfw)
        $('input[name=type]', "#settings").val($('select[name=type] option:selected', "#settings").text());

    // Draw any text the user requests
    drawText($('input[name=type]', "#settings").val(), 64, 16);
    drawText(copyrightLine, 64, 48);

    drawText("Nintendo Switch (ver " + firmwareVersion.val() + ")", 64, 160);
    drawText("Main Processor    :   Nvidia Tegra X1 SoC", 64, 224);
    drawText("Memory Test       :   65920K OK", 64, 256);

    drawText("Plug and Play BIOS Extension, v1.0A", 64, 320);
    drawText("Detecting Primary Master      ... " + emmcSize.val() + " Internal Storage", 96, 352);
    drawText("Detecting Primary Slave       ... " + sdSize.val() + " SD Card", 96, 384);
    drawText("Detecting Secondary Master    ... None", 96, 416);
    drawText("Detecting Secondary Slave     ... None", 96, 448);

    if(shouldDrawCustomBootString)
        drawText("Hold _" + bootloaderKey.val() + "_ " + bootTime.text() + " to enter _" + bootloader.val() + "_.", 64, CANVAS_HEIGHT - 64);
}

// Every time an input is changed, modify the preview
$("#settings input, #settings select").on('change', function() {
    redrawCanvas();
});

$("#downloadPNG").click(function() {
    $("#downloadPNG")[0].download = "bootlogo.png";
    $("#downloadPNG")[0].href = drawCanvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
});

// Draw the canvas once the window has loaded
window.onload = function() {
    drawCanvasCtx.font = "32px PerfectDOSVGA437Win";
    redrawCanvas();
};