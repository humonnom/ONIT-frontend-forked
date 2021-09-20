import React, { useState } from "react";
import { NormalMode, EditMode, PageWrapper, ToggleButton } from "../components";

function Main(props) {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <PageWrapper>
      <div style={{
        position: "absolute",
        right: "20px",
        top: "20px",
      }}>
        {(isEditMode === true) && <ToggleButton label='Save' onClick={() => setIsEditMode(false)}/>}
        {(isEditMode === false) && <ToggleButton label='Edit' onClick={() => setIsEditMode(true)}/>}
      </div>
      {(isEditMode === false) && <NormalMode />}
      {(isEditMode === true) && <EditMode />}
    </PageWrapper>
  );
}

export default Main;
