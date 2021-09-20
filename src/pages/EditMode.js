import React from "react";
import {
  PageWrapper,
  EditWrapper,
  ToolBar,
  AllWidgets,
  BasicButton,
} from "../components";

function EditMode(props) {
  return (
    <PageWrapper>
      <BasicButton label='Save' onClick={() => window.location.assign("/")} />
      <EditWrapper>
        <ToolBar />
        <AllWidgets />
      </EditWrapper>
    </PageWrapper>
  );
}

export default EditMode;
