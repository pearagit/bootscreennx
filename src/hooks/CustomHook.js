import React from "react";
import DeviceData from "../device_data.json";

export default function useCustomHook(initialIndex, deviceDataId) {
	const [selectedId, setSelectedId] = React.useState(initialIndex);
	const [customInfo, setCustomInfo] = React.useState(false);

	const setValue = (val, custom) => {
		setSelectedId(custom ? val : val - 1);
		setCustomInfo(custom);
	};

	return [
		customInfo ? selectedId : DeviceData[deviceDataId][selectedId],
		setValue,
	];
}
