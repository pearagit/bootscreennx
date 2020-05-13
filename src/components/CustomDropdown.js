import React from "react";
import { MdEdit, MdInput } from "react-icons/md";

import DeviceData from "../device_data.json";

export default function CustomDropdown(props) {
	const checkbox = React.useRef();
	const [customInput, setCustomInput] = React.useState(false);

	const onCheckboxChange = (e) => {
		setCustomInput(!customInput);
	};

	const onValueChange = (e) => {
		if (customInput) {
			props.customSet(e.target.value, true);
		} else {
			props.customSet(e.target.selectedIndex, false);
		}
	};

	return (
		<>
			<form>
				{!props.disableCustom &&
					(customInput ? (
						<MdInput onClick={onCheckboxChange} />
					) : (
						<MdEdit onClick={onCheckboxChange} />
					))}
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
				<label htmlFor={props.deviceDataId}>{props.label}</label>
			</form>
		</>
	);
}
