import React from "react";
import {
  NormalWrapper,
  AllWidgets,
  PageWrapper,
  ToggleButton,
} from "../components";

function NormalMode(props) {
  return (
    <PageWrapper>
		<NormalWrapper>
      <ToggleButton
        label='Edit'
        onClick={() => window.location.assign("/edit")}
      />
        <AllWidgets />
		</NormalWrapper>

    </PageWrapper>
  );
}

export default NormalMode;
