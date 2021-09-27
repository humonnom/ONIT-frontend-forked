import React from 'react';
import {
  PageWrapper,
  EditWrapper,
  ToolBar,
  EditAllWidgets,
  BasicButton,
} from '../components';

function EditMode(props) {
  return (
    <PageWrapper>
      <BasicButton label='Save' onClick={() => window.location.assign('/')} />
      <EditWrapper>
        <ToolBar />
        <EditAllWidgets />
      </EditWrapper>
    </PageWrapper>
  );
}

export default EditMode;
