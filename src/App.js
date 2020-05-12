import React from "react";
import "./App.css";
import useCustomHook from "./hooks/CustomHook";
import CustomDropdown from "./components/CustomDropdown";

function App() {
	const [version, setVersion] = useCustomHook(0, "version");
	const [storage, setStorage] = useCustomHook(0, "storage_size");
	const [sideLogo, setSideLogo] = useCustomHook(0, "side_logo");

	return (
		<>
			<CustomDropdown customSet={setVersion} deviceDataId={"version"} />
			<CustomDropdown
				customSet={setStorage}
				deviceDataId={"storage_size"}
			/>
			<CustomDropdown
				customSet={setSideLogo}
				deviceDataId={"side_logo"}
				disableCustom
			/>
			{storage}
		</>
	);
}

export default App;
