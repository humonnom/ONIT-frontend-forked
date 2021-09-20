import React from 'react';

function ToggleButton(props) {

	return (
		<button onClick={props.onClick}>{props.label}</button>
	);
}

export default ToggleButton;