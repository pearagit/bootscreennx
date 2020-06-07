import React from "react";

import styles from "./HowToUse.module.css";

export default function HowToUse() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>What is this?</h1>
			<p className={styles.text}>This is a tool to generate Old School / Retro style boot screens for the Nintendo Switch.</p>

			<h1 className={styles.title}>How do I use this?</h1>
			<div className={styles.text}>
				<ol>
					<li>Tweak the bootscreen to your liking</li>
					<li>Download the bitmap file</li>
					<li>Save the image as "bootlogo.bmp" and save to the root of your SD card. Certain CFW distributions may change where this file is placed.</li>
				</ol>
			</div>

			<h1 className={styles.title}>Who made this?</h1>
			<p className={styles.text}>This project was created and maintained by <a href="https://github.com/HarryPeach">Harry Peach</a> and contributors. The original idea came from <a href="https://sebascontre.github.io/bootscreen3ds/">here</a>.</p>

			<h1 className={styles.title}>Can I contribute?</h1>
			<p className={styles.text}>Yes! You can <a href="https://github.com/HarryPeach/bootscreennx">fork the repository</a> on GitHub and then submit a pull request.</p>
		</div>
	)
}