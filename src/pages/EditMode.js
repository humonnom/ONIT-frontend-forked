import React from "react";
import {
  PageWrapper,
  EditWrapper,
  ToolBar,
  AllWidgets,
  ToggleButton,
} from "../components";

function EditMode(props) {
  return (
    <PageWrapper>
      <ToggleButton label='Save' onClick={() => window.location.assign("/")} />
      <EditWrapper>
        <ToolBar />
        <AllWidgets />
      </EditWrapper>
    </PageWrapper>
  );
}

export default EditMode;
