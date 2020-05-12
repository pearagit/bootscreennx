import React from "react";
import "./App.css";
import useCustomHook from "./hooks/CustomHook";
import CustomDropdown from "./components/CustomDropdown";
import BootScreenCanvas from "./components/BootScreenCanvas";

function App() {
	const [version, setVersion] = useCustomHook(0, "version");
	const [storage, setStorage] = useCustomHook(0, "storage_size");
	const [sdSize, setSdSize] = useCustomHook(0, "sd_size");
	const [sideLogo, setSideLogo] = useCustomHook(0, "side_logo");
	const [firmware, setFirmware] = useCustomHook(0, "firmware");

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
			<BootScreenCanvas
				version={version}
				storage={storage}
				sdSize={sdSize}
				sideLogo={sideLogo}
				firmware={firmware}
			/>
		</>
	);
}

export default App;
