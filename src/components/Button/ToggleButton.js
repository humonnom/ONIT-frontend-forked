import React from 'react';

function ToggleButton(props) {

	return (
		<div style={{
			position: "absolute",
			right: "20px",
			top: "20px",
		  }}>
		<button onClick={props.onClick}>{props.label}</button>
		</div>
	);
}

export default ToggleButton;