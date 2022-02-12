/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import ToolBar from '../../ToolBar/ToolBar';
import { WIDGET_COMMON_RADIUS } from '../../../styles/style';

function NewBox() {
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));

  return <div css={newWidget}>{modal.toolbarWindow && <ToolBar />}</div>;
}

export default NewBox;

const newWidget = css`
  width: 100%;
  height: 100%;
  border-radius: ${WIDGET_COMMON_RADIUS};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;
`;
