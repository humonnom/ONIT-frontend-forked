import React from 'react';
import { useSelector } from 'react-redux';
import {
  PageWrapper,
  EditWrapper,
  ToolBar,
  EditModeGrid,
  AddImage,
} from '../components';

function EditMode(props) {
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));

  return (
    <PageWrapper>
      <EditWrapper>
        <ToolBar />
        {modal.imgInputWindow && <AddImage />}
        <EditModeGrid />
      </EditWrapper>
    </PageWrapper>
  );
}

export default EditMode;
