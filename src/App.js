import React from "react";
import "./App.css";
import useCustomHook from "./hooks/CustomHook";
import CustomDropdown from "./components/CustomDropdown";

function App() {
	const [custom, setCustom] = useCustomHook(0, "version");

	return (
		<>
			<CustomDropdown customSet={setCustom} deviceDataId={"version"} />
			{custom}
		</>
	);
}

export default App;
