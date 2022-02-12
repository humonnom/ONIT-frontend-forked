import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/css';
import {
  createReplacementModalAction,
  createReplacementWidgetsAction,
} from '../../../redux/slice';

import { TYPE_IMAGE } from '../../../utils/constantValue';

function EditImage() {
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const closeEditWindow = () => {
    dispatch(
      createReplacementModalAction({
        ...modal,
        imgInputWindow: false,
        imgChangeTargetId: -1,
      })
    );
  };
  const updateWidgets = (newList) => {
    dispatch(
      createReplacementWidgetsAction({
        ...widgets,
        list: newList,
      })
    );
  };
  function editWidgetInfo(oldList) {
    const newList = JSON.parse(JSON.stringify(oldList));
    const found = newList.find(
      (element) => element.i === modal.imgChangeTargetId
    );
    if (found.widget_type === TYPE_IMAGE) {
      const src = { thumbnail: `${url}` };
      found.widget_data = src;
    }
    return newList;
  }
  const handleChange = ({ target: { value } }) => {
    setUrl(value);
  };

  const handleSubmit = () => {
    // TODO: url valid 한지 체크해야함
    const newList = editWidgetInfo(widgets.list);
    updateWidgets(newList);
    closeEditWindow();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div
      className={css`
        display: absolute;
        top: 47%;
        left: 46%;
      `}
    >
      <input
        type='url'
        name='url'
        value={url}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSubmit} type='button'>
        수정완료
      </button>
    </div>
  );
}

export default EditImage;
