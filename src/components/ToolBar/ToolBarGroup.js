import React from 'react';
import { css } from '@emotion/css';

const ToolBarGroup = ({ children }) => {
	return (
		<div
			className={css`
				display: flex;
				max-width: 100%;
				margin: auto;
			`}>
			{children}
		</div>
	);
}

export default ToolBarGroup;