import React from "react";
import { MdEdit, MdInput } from "react-icons/md";

import styles from "./CustomDropdown.module.css";

import DeviceData from "../device_data.json";

export default function CustomDropdown(props) {
	// const checkbox = React.useRef();
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
			<form className={styles.element}>
				<label className={styles.label} htmlFor={props.deviceDataId}>
					{props.label}
				</label>
				{!props.disableCustom &&
					(customInput ? (
						<MdInput
							onClick={onCheckboxChange}
							className={styles.icon}
						/>
					) : (
							<MdEdit
								onClick={onCheckboxChange}
								className={styles.icon}
							/>
						))}
				{customInput && !props.disableCustom ? (
					<input
						id={props.deviceDataId}
						type="text"
						onChange={onValueChange}
						className={styles.textBox}
					/>
				) : (
						<select
							id={props.deviceDataId}
							onChange={onValueChange}
							className={styles.select}
						>
							{DeviceData[props.deviceDataId].map((el, index) => (
								<option key={index} value={el}>
									{el}
								</option>
							))}
						</select>
					)}
			</form>
		</>
	);
}
