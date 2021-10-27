import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  createReplacementModalAction,
  createReplacementWidgetsAction,
} from '../../../redux/slice';
import { ACTION_CREATE } from '../../../utils/constantValue';

function AddImage(props) {
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));
  const [url, setUrl] = useState('');
  const updateWidgets = (newWidget) => {
    console.log(widgets);
    dispatch(
      createReplacementWidgetsAction({
        ...widgets,
        count: widgets.count + 1,
        list: [...widgets.list, newWidget],
      })
    );
  };
  function createNewImageWidget() {
    const widget1 = {
      i: `tmpwid${widgets.count}`,
      x: 2,
      y: 3,
      w: 3,
      h: 4,
      type: 'image',
      data: {
        contents: `${url}`,
      },
      widget_action: ACTION_CREATE,
    };
    return widget1;
  }
  const handleChange = ({ target: { value } }) => {
    console.log(value);
    setUrl(value);
  };

  const handleSubmit = (event) => {
    // TODO: url valid 한지 체크해야함
    const newWidget = createNewImageWidget();
    updateWidgets(newWidget);

    dispatch(
      createReplacementModalAction({
        ...modal,
        imgInputWindow: false,
      })
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
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

export default AddImage;
