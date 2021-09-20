import React from 'react';
import { css } from '@emotion/css';

function ToolBarButton(props) {
	return (
		<div
			onClick={props.action}
			className={css`
				margin: 5px;
				display: flex;
				flex-direction: column;
				align-items: center;
				`
			}>
			<button
				className={css`
					background-color: #E0E0E0;
					padding: 5px 13px;
					border-radius: 4px;
					border: none;
					height: 32px;
					width: 45px;
					line-height: center;
				`}
			>{props.emoji}</button>
			<p
				className={css`
						font-size: x-small;
					`
				}>{props.label}</p>
		</div>
	);
}

export default ToolBarButton;