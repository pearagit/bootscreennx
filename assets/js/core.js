const drawCanvas = document.querySelector("#bootPreview");
const drawCanvasCtx = drawCanvas.getContext("2d");

// Every time an input is changed, modify the preview
$("#settings input, #settings select").on('change', function() {
    console.log("Change");
});

drawCanvasCtx.moveTo(0, 0);
drawCanvasCtx.lineTo(200, 100);
drawCanvasCtx.stroke();