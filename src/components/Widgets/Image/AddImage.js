import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createReplacementModalAction,
  createReplacementWidgetsAction,
} from '../../../redux/slice';
import {
  ACTION_CREATE,
  DELETED_OFF,
  TYPE_IMAGE,
} from '../../../utils/constantValue';

function AddImage(props) {
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
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
    const newWidget = {
      i: widgets.count.toString(),
      x: 6,
      y: 6,
      w: 3,
      h: 3,
      widget_action: ACTION_CREATE,
      widget_type: TYPE_IMAGE,
      widget_data: {
        url: `${url}`,
      },
    };
    return newWidget;
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
