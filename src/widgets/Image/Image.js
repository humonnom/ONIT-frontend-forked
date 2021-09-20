import React from "react";
import { WidgetWrapper } from "../../components";

function Image (props) {
  // const autoplay = props.autoplay || 'autoplay=1';
  if (props.src === undefined){
    return (
      <p>아직 위젯이 없습니다.</p>
      );
  }
  let height = '320';
  if (props.size === 'small'){
    height = '160';
  } else if (props.size === 'large') {
    height = '640';
  }

  return (
  <WidgetWrapper>
    <img src={props.src} alt="donkasu" width='auto' height={height}/>
  </WidgetWrapper>
);
}

export default Image;
