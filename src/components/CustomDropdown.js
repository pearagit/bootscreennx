import React from "react";
import DeviceData from "../device_data.json";

export default function CustomDropdown(props) {
	const checkbox = React.useRef();
	const [customInput, setCustomInput] = React.useState(false);

	const onCheckboxChange = (e) => {
		setCustomInput(e.target.checked);
	};

	const onValueChange = (e) => {
		if (checkbox.current?.checked) {
			props.customSet(e.target.value, true);
		} else {
			props.customSet(e.target.selectedIndex, false);
		}
	};

	return (
		<>
			<form>
				{!props.disableCustom && (
					<input
						type="checkbox"
						checked={customInput}
						onChange={onCheckboxChange}
						ref={checkbox}
					/>
				)}
				{customInput && !props.disableCustom ? (
					<input
						id={props.deviceDataId}
						type="text"
						onChange={onValueChange}
					/>
				) : (
					<select id={props.deviceDataId} onChange={onValueChange}>
						{DeviceData[props.deviceDataId].map((el, index) => (
							<option key={index} value={el}>
								{el}
							</option>
						))}
					</select>
				)}
				<label for={props.deviceDataId}>{props.label}</label>
			</form>
		</>
	);
}
