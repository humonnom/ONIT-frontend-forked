import React from 'react';
import {
  PageWrapper,
  EditWrapper,
  ToolBar,
  EditAllWidgets,
} from '../components';

function EditMode(props) {
  return (
    <PageWrapper>
      <EditWrapper>
        <ToolBar />
        <EditAllWidgets />
      </EditWrapper>
    </PageWrapper>
  );
}

export default EditMode;
