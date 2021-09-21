import React, { useState } from 'react';
import Cookies from 'js-cookie';

function AddVideo(props) {
  const [url, setUrl] = useState('');

  const handleChange = ({ target: { value } }) => {
    setUrl(value);
  };

  const handleSubmit = (event) => {
    try {
      const urlObj = new URL(url);
      // let widget_list = Cookies.get('widget');
      // const new_widget = {
      //   type: 'video',
      //   id: urlObj.searchParams.get("v"),
      //   size: 'm'
      // };
      const new_widget = urlObj.searchParams.get('v');
      // Cookies.set('widget', widget_list.concat(new_widget));
      Cookies.set('video', new_widget);
      props.setShow(false);
    } catch (e) {
      alert('url이 이상해요~');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    // form wrapper
    <>
      <input
        type='url'
        name='url'
        value={url}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSubmit} type='button'>
        위젯으로 만들기
      </button>
    </>
  );
}

export default AddVideo;
