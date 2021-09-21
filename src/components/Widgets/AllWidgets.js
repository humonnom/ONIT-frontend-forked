import React from 'react';
import Cookies from 'js-cookie';
import { YoutubeVideo, Image } from '..';

function AllWidgets(props) {
  const video = <YoutubeVideo embedId={Cookies.get('video')} />;
  const image = <Image src={Cookies.get('image')} />;
  return (
    <div>
      {video}
      {image}
    </div>
  );
}

export default AllWidgets;
