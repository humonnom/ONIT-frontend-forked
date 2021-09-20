import React from "react";
import {
  NormalWrapper,
  AllWidgets,
  PageWrapper,
  BasicButton,
} from "../components";

function NormalMode(props) {
  return (
    <PageWrapper>
		<NormalWrapper>
      <BasicButton
        label='Edit'
        onClick={() => window.location.assign("/edit")}
      />
        <AllWidgets />
		</NormalWrapper>

    </PageWrapper>
  );
}

export default NormalMode;
