import React, { useEffect } from "react";
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

export default function BootScreenCanvas(props) {
	const canvas = React.useRef();
	const context = React.useRef();

	useEffect(() => {
		context.current = canvas.current.getContext("2d");
	}, []);

	useEffect(() => {
		const ctx = context.current;
		context.current.fillStyle = "black";
		context.current.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		ctx.font = "32px PerfectDOSVGA437Win";
		ctx.fillStyle = "white";

		drawText(ctx, props.firmware, 64, 16);
		drawText(ctx, "Copyright (C) 2020, " + props.copyrightHolder, 64, 48);

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
	]);

	return (
		<canvas
			className={styles}
			style={{ fontFamily: "DOSVGA" }}
			ref={canvas}
			width={CANVAS_WIDTH}
			height={CANVAS_HEIGHT}
		/>
	);
}
