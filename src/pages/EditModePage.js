import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PageWrapper, ToolBar, EditModeGrid, EditWrapper } from '../components';
import getLoginState from './getLoginState';
import renderData from './renderData';
import PopWidgets from '../components/Widgets/Pop/PopWidgets';

function EditMode() {
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));
  const [renderState, setRenderState] = useState(false);

  if (renderState === false) {
    const user_seq = localStorage.getItem('user_seq');
    const loginState = getLoginState();
    if (loginState === false) {
      window.location.assign(`/${user_seq}/normal`);
      alert('잘못된 접근입니다.');
    }
    renderData(user_seq);
    setRenderState(true);
  }

  return (
    <PageWrapper>
      <ToolBar />
      <EditWrapper>
        {modal.popUpWindow && <PopWidgets />}
        <EditModeGrid />
      </EditWrapper>
    </PageWrapper>
  );
}
export default EditMode;
