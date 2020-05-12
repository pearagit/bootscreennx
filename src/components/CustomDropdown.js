import React from "react";

export default function CustomDropdown(props) {
	const checkbox = React.useRef();
	const [customInput, setCustomInput] = React.useState(false);

	const onCheckboxChange = (e) => {
		setCustomInput(e.target.checked);
	};

	const onValueChange = (e) => {
		props.customSet(e.target.value, checkbox.current.checked);
	};

	return (
		<>
			{props.deviceDataId}
			<form>
				<input
					type="checkbox"
					checked={customInput}
					onChange={onCheckboxChange}
					ref={checkbox}
				/>
				{customInput ? (
					<input type="text" onChange={onValueChange} />
				) : (
					<select id="cars" onChange={onValueChange}>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
					</select>
				)}
			</form>
		</>
	);
}
