import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  PageWrapper,
  EditWrapper,
  ToolBar,
  EditModeGrid,
  AddImage,
} from '../components';
import getWidgetsInfo from '../api/getWidgetsInfo';
import { createReplacementWidgetsAction } from '../redux/slice';

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
