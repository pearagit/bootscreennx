import React from "react";
import "./App.css";
import useCustomHook from "./hooks/CustomHook";
import CustomDropdown from "./components/CustomDropdown";
import BootScreenCanvas from "./components/BootScreenCanvas";

function App() {
	const [version, setVersion] = useCustomHook(0, "version");
	const [storage, setStorage] = useCustomHook(0, "storage_size");
	const [sdSize, setSdSize] = useCustomHook(0, "sd_size");
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
		<>
			<CustomDropdown customSet={setVersion} deviceDataId={"version"} />
			<CustomDropdown
				customSet={setStorage}
				deviceDataId={"storage_size"}
			/>
			<CustomDropdown customSet={setSdSize} deviceDataId={"sd_size"} />
			<CustomDropdown
				customSet={setSideLogo}
				deviceDataId={"side_logo"}
				disableCustom
			/>
			<CustomDropdown customSet={setFirmware} deviceDataId={"firmware"} />
			<input
				type="text"
				value={copyrightHolder}
				onChange={(e) => setCopyrightHolder(e.target.value)}
			></input>
			<CustomDropdown
				customSet={setBootloaderKeybind}
				deviceDataId={"bootloader_keybind"}
			/>
			<CustomDropdown
				customSet={setBootloaderTiming}
				deviceDataId={"bootloader_timing"}
			/>
			<CustomDropdown
				customSet={setBootloaderName}
				deviceDataId={"bootloader_name"}
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
		</>
	);
}

export default App;
