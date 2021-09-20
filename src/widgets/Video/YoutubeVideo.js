import React from "react";
import { WidgetWrapper } from "../../components";

function YoutubeVideo (props) {
  // const autoplay = props.autoplay || 'autoplay=1';
  if (props.embedId === undefined){
    return (
      <p>아직 위젯이 없습니다.</p>
      );
  }
  const reset_style = 'modestbranding=1&controls=0&showinfo=0&rel=0';
  const loop = props.loop || 'loop=0';
  // const autoplay = props.autoplay || 'autoplay=1';
  const autoplay = props.autoplay || 'autoplay=0';
  const options = `?${reset_style}&${autoplay}&${loop}`;
  let width ='640';
  let height = '320';
  if (props.size === 'small'){
    width ='320';
    height = '160';
  } else if (props.size === 'large') {
    width ='1280';
    height = '640';
  }

  return (
  <WidgetWrapper>
    <iframe
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${props.embedId}${options}`}
      frameBorder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
      title='Embedded youtube'
    />
  </WidgetWrapper>
);
}

export default YoutubeVideo;
