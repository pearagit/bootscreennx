import React from "react";
import DeviceData from "./device_data.json";
import "./App.css";
import useCustomHook from "./CustomHook";

function App() {
	const [version, setVersion] = React.useState(0);
	const [storage, setStorage] = React.useState(0);
	const [custom, setCustom] = useCustomHook(0, "version");

	return (
		<>
			<button onClick={() => setCustom("2", false)}>clickForFun</button>
			{custom}
		</>
	);
}

export default App;
