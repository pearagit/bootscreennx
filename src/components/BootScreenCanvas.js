import React, { useEffect } from "react";
import Jimp from "jimp";
import styles from "./BootScreenCanvas.module.css";

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

function drawText(context, text, x, y, color = "gray") {
	context.fillStyle = color;
	context.textBaseline = "top";

	var backspace = 0;
	for (var i = 0; i < text.length; i++) {
		if (text.charAt(i) === "_") {
			if (context.fillStyle === "#ffffff") context.fillStyle = color;
			else context.fillStyle = "white";
			backspace++;
			continue;
		}
		context.fillText(text.charAt(i), x + i * 16 - backspace * 16, y);
	}
}

function scaleCanvas(origin, destination) {
	destination.current
		.getContext("2d")
		.drawImage(
			origin.current,
			0,
			0,
			1280,
			720,
			0,
			0,
			destination.current.width,
			destination.current.height
		);
}

export default function BootScreenCanvas(props) {
	const [symbols, setSymbols] = React.useState(new Image());
	const canvas = React.useRef();
	const context = React.useRef();
	const scaledCanvas = React.useRef();
	const scaledContext = React.useRef();

	useEffect(() => {
		context.current = canvas.current.getContext("2d");
		scaledContext.current = scaledCanvas.current.getContext("2d");
		context.current.imageSmoothingEnabled = false;
		scaledContext.current.imageSmoothingEnabled = false;
		let img = new Image();
		img.src = process.env.PUBLIC_URL + "/symbols.png";
		img.onload = () => setSymbols(img);
	}, []);

	useEffect(() => {
		const ctx = context.current;
		context.current.fillStyle = "black";
		context.current.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		ctx.font = "32px PerfectDOSVGA437Win";
		ctx.fillStyle = "white";

		ctx.drawImage(symbols, 40, 10, 21, 29, 8, 16, 42, 58);

		switch (props.sideLogo) {
			case "Energy Star":
				ctx.drawImage(symbols, 0, 0, 133, 84, 966, 16, 266, 168);
				ctx.fillStyle = "black";
				ctx.fillRect(1040, 36, 50, 60);
				break;
			case "Energy Star Atmosphere":
				ctx.drawImage(symbols, 0, 84, 133, 84, 966, 16, 266, 168);
				break;
			case "Atmosphere":
				ctx.drawImage(symbols, 30, 168, 101, 84, 1100, 16, 151, 134);
				break;
			default:
				break;
		}

		drawText(ctx, props.firmware, 64, 16);
		drawText(ctx, "Copyright (C) 2021, " + props.copyrightHolder, 64, 48);

		drawText(ctx, `Nintendo Switch (ver ${props.version})`, 32, 160);
		drawText(ctx, "Main Processor    :   Nvidia Tegra X1 SoC", 32, 224);
		drawText(ctx, "Memory Test       :   65920K OK", 32, 256);
		drawText(ctx, "Plug and Play BIOS Extension, v1.0A", 32, 320);
		drawText(
			ctx,
			"Detecting Primary Master      ... " +
			props.storage +
			" Internal Storage",
			64,
			352
		);
		drawText(
			ctx,
			"Detecting Primary Slave       ... " + props.sdSize + " SD Card",
			64,
			384
		);
		drawText(ctx, "Detecting Secondary Master    ... None", 64, 416);
		drawText(ctx, "Detecting Secondary Slave     ... None", 64, 448);

		drawText(
			ctx,
			"Hold _" +
			props.bootloaderKeybind +
			"_ " +
			props.bootloaderTiming +
			" to enter _" +
			props.bootloaderName +
			"_.",
			16,
			CANVAS_HEIGHT - 40
		);

		scaleCanvas(canvas, scaledCanvas);
	}, [
		props.version,
		props.storage,
		props.sdSize,
		props.sideLogo,
		props.firmware,
		props.bootloaderKeybind,
		props.bootloaderTiming,
		props.bootloaderName,
		props.copyrightHolder,
		symbols,
	]);

	const downloadPNG = () => {
		const png = canvas.current.toDataURL("image/png");
		const download = document.createElement("a");
		download.href = png;
		download.download = "bootlogo.png";
		download.click();
	};

	const downloadBitmap = () => {
		Jimp.read(canvas.current.toDataURL("image/png"))
			.then((image) => {
				return image.rotate(90);
			})
			.then((image) => {
				const download = document.createElement("a");
				image.getBase64Async("image/bmp").then((a) => {
					download.href = a;
					download.download = "bootlogo.bmp";
					download.click();
				});
			});
	};

	return (
		<div className={styles.container}>
			<canvas
				style={{ width: "100%", imageRendering: "pixelated" }}
				ref={scaledCanvas}
				width={CANVAS_WIDTH}
				height={CANVAS_HEIGHT}
				className={styles.canvas}
			/>
			<canvas
				className={styles}
				style={{ display: "none" }}
				ref={canvas}
				width={CANVAS_WIDTH}
				height={CANVAS_HEIGHT}
			/>
			<div className={styles.actions}>
				<button onClick={downloadPNG}>Download png</button>
				<button onClick={downloadBitmap} className="primary">Download bitmap</button>
			</div>
		</div>
	);
}
