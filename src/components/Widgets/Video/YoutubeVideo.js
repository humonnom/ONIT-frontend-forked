import React from 'react';
import { WidgetWrapper } from '../..';

function YoutubeVideo({ embedId }) {
  // const autoplay = props.autoplay || 'autoplay=1';
  if (embedId === undefined) {
    return <p>아직 위젯이 없습니다.</p>;
  }
  const reset_style = 'modestbranding=1&controls=0&showinfo=0&rel=0';
  // const loop = props.loop || 'loop=0';
  const loop = 'loop=0';
  // const loop = 'loop=1'; // 루프 돌지 않음
  // const autoplay = props.autoplay || 'autoplay=1';
  // const autoplay = 'autoplay=1';
  // const autoplay = props.autoplay || 'autoplay=0';
  const autoplay = 'autoplay=1';
  const mute = 'mute=0';
  const options = `?${reset_style}&${autoplay}&${mute}&${loop}`;
  // 사이즈 조절
  let width = '640';
  let height = '320';
  // if (props.size === 'small') {
  width = '320';
  height = '160';
  // } else if (props.size === 'large') {
  //   width = '1280';
  //   height = '640';
  // }

  return (
    <div style={radiusStyle}>
      <iframe
        width='100%'
        height='100%'
        src={`https://www.youtube.com/embed/${embedId}${options}`}
        frameBorder='0'
        alt='profile'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        title='Embedded youtube'
      />
    </div>
  );
}

const radiusStyle = {
  width: '100%',
  height: '100%',
  background: '#000',
  WebkitBorderRadius: '10px',
  borderRadius: '10px',
  overflow: 'hidden',
};

export default YoutubeVideo;
