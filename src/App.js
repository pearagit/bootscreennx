import React from "react";
import styles from "./App.module.css";
import useCustomHook from "./hooks/CustomHook";
import CustomDropdown from "./components/CustomDropdown";
import BootScreenCanvas from "./components/BootScreenCanvas";

function App() {
	const [version, setVersion] = useCustomHook(0, "version");
	const [storage, setStorage] = useCustomHook(2, "storage_size");
	const [sdSize, setSdSize] = useCustomHook(3, "sd_size");
	const [sideLogo, setSideLogo] = useCustomHook(1, "side_logo");
	const [firmware, setFirmware] = useCustomHook(0, "firmware");
	const [copyrightHolder, setCopyrightHolder] = React.useState("");
	const [bootloaderKeybind, setBootloaderKeybind] = useCustomHook(
		0,
		"bootloader_keybind"
	);
	const [bootloaderTiming, setBootloaderTiming] = useCustomHook(
		0,
		"bootloader_timing"
	);
	const [bootloaderName, setBootloaderName] = useCustomHook(
		0,
		"bootloader_name"
	);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>
					Old School Boot Screen Generator
				</h1>
				<h2 className={styles.subtitle}>For the Nintendo Switch</h2>
			</div>
			<CustomDropdown
				customSet={setVersion}
				deviceDataId={"version"}
				label={"Version"}
			/>
			<CustomDropdown
				customSet={setStorage}
				deviceDataId={"storage_size"}
				label={"Storage Size"}
			/>
			<CustomDropdown
				customSet={setSdSize}
				deviceDataId={"sd_size"}
				label={"SD Size"}
			/>
			<CustomDropdown
				customSet={setSideLogo}
				deviceDataId={"side_logo"}
				label={"Logo"}
				disableCustom
			/>
			<CustomDropdown
				customSet={setFirmware}
				deviceDataId={"firmware"}
				label={"Firmware"}
			/>
			<input
				type="text"
				value={copyrightHolder}
				onChange={(e) => setCopyrightHolder(e.target.value)}
			></input>
			<CustomDropdown
				customSet={setBootloaderKeybind}
				deviceDataId={"bootloader_keybind"}
				label={"Bootloader Keybind"}
			/>
			<CustomDropdown
				customSet={setBootloaderTiming}
				deviceDataId={"bootloader_timing"}
				label={"Bootloader Timing"}
			/>
			<CustomDropdown
				customSet={setBootloaderName}
				deviceDataId={"bootloader_name"}
				label={"Bootloader Name"}
			/>
			<BootScreenCanvas
				version={version}
				storage={storage}
				sdSize={sdSize}
				sideLogo={sideLogo}
				firmware={firmware}
				copyrightHolder={copyrightHolder}
				bootloaderKeybind={bootloaderKeybind}
				bootloaderTiming={bootloaderTiming}
				bootloaderName={bootloaderName}
			/>
		</div>
	);
}

export default App;
