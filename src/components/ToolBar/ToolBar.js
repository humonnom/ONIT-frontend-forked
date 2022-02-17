/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { ToolBarButton } from '..';
import { createReplacementModalAction } from '../../redux/slice';
import { img, video, text } from '../../asset/index';

function ToolBar() {
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));

  const widgetList = [
    { type: 'image', label: '그림', emoji: img },
    { type: 'video', label: '비디오', emoji: video },
    { type: 'text', label: '텍스트', emoji: text },
    // {
    //   type: 'calendar',
    //   label: '달력',
    //   emoji: calendar,
    // },
    // {
    //   type: 'todo',
    //   label: '투두',
    //   emoji: todolist,
    // },
    // { type: 'clock', label: '시계', emoji: clock },
    // { type: 'visit', label: '방명록', emoji: pin },
  ];

  const new_widget_button_list = widgetList.map((value, i) => ({
    key: i,
    label: value.label,
    emoji: value.emoji,
    type: value.type,
    onClick: () => {
      if (modal.popUpWindow === true) {
        dispatch(
          createReplacementModalAction({
            ...modal,
            popUpWindow: false,
          })
        );
      } else {
        dispatch(
          createReplacementModalAction({
            ...modal,
            popUpWindow: true,
            popUpWindowType: value.type,
          })
        );
      }
    },
  }));

  const NewWidgetButtons = new_widget_button_list.map((tool) => (
    <li key={tool.key} css={deleteListStyle}>
      <ToolBarButton
        action={tool.onClick}
        emoji={tool.emoji}
        type={tool.type}
        label={tool.label}
      />
    </li>
  ));

  return (
    <div css={toolBar}>
      <ul css={deleteListStyle}>{NewWidgetButtons}</ul>
    </div>
  );
}

export default ToolBar;

const toolBar = css`
  width: 150px;
  height: 60px;
  border-radius: 10px;
  background-color: #eeeeee;
`;

const deleteListStyle = css`
  list-style-type: none;
  float: left;
  margin: 7.5px;
`;
