import React from 'react';
import { PageWrapper, EditWrapper, ToolBar, EditModeGrid } from '../components';

function EditMode(props) {
  return (
    <PageWrapper>
      <EditWrapper>
        <ToolBar />
        <EditModeGrid />
      </EditWrapper>
    </PageWrapper>
  );
}

export default EditMode;
