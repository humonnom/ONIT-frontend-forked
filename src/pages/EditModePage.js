import React from 'react';
import { useSelector } from 'react-redux';
import { PageWrapper, EditWrapper, ToolBar, EditModeGrid } from '../components';
import PopWidgets from '../components/Widgets/Pop/PopWidgets';

function EditMode(props) {
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));

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
// modal.imgInputWindow && <EditImage />
export default EditMode;
