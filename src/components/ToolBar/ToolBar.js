/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ToolBarButton, HeaderWrapper } from '..';
import { createReplacementModalAction } from '../../redux/slice';
import { convertForServer } from '../../utils/convert';
import {
  logo,
  img,
  img_selected,
  video,
  video_selected,
  calendar,
  calendar_selected,
  clock,
  clock_selected,
  text,
  text_selected,
  todolist,
  todolist_selected,
  pin,
  pin_selected,
} from '../../asset/index';

function ToolBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));
  const user_seq = localStorage.getItem('user_seq');

  const widgetList = [
    { type: 'image', label: '그림', emoji: img, selected: img_selected },
    { type: 'video', label: '비디오', emoji: video, selected: video_selected },
    { type: 'text', label: '텍스트', emoji: text, selected: text_selected },
    {
      type: 'calendar',
      label: '달력',
      emoji: calendar,
      selected: calendar_selected,
    },
    {
      type: 'todo',
      label: '투두',
      emoji: todolist,
      selected: todolist_selected,
    },
    { type: 'clock', label: '시계', emoji: clock, selected: clock_selected },
    { type: 'visit', label: '방명록', emoji: pin, selected: pin_selected },
  ];

  const new_widget_button_list = widgetList.map((value, i) => ({
    key: i,
    label: value.label,
    emoji: value.emoji,
    selected: value.selected,
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
            popUpWindowType: 'image',
          })
        );
      }
      console.log(`add ${value.type}`);
    },
  }));

  const NewWidgetButtons = new_widget_button_list.map((tool) => (
    <ToolBarButton
      key={tool.key}
      action={tool.onClick}
      emoji={tool.emoji}
      selected={tool.selected}
      type={tool.type}
      label={tool.label}
    />
  ));

  return (
    <HeaderWrapper>
      <div css={[flex, flexBtw]}>
        <a href='/main' css={marginLeft36}>
          <img alt='img' src={logo} css={height26} />
        </a>
        <div>
          <button
            type='button'
            css={[commonButtonStyle, cancelButtonWidth]}
            onClick={() => {
              window.location.assign(`/${user_seq}`);
            }}
          >
            저장하지 않고 나가기
          </button>
          <button
            type='button'
            css={[commonButtonStyle, confirmButtonWidth]}
            onClick={() => {
              const postData = convertForServer(widgets.list);
              history.push({
                pathname: `/${user_seq}/save`,
                state: { postData },
              });
            }}
          >
            저장
          </button>
        </div>
      </div>
      <div css={[height26, abosulteCenter, flex, flexCenter]}>
        {NewWidgetButtons}
      </div>
    </HeaderWrapper>
  );
}

const flex = css`
  display: flex;
  height: 100%;
`;

const flexBtw = css`
  justify-content: space-between;
  align-items: center;
`;

const flexCenter = css`
  justify-content: center;
  align-items: center;
`;

const commonButtonStyle = css`
  display: inline-block;
  text-align: center;
  height: 39px;
  border-radius: 17px;
  border: none;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #707070;
  background-color: #eee;
  padding: 0px;
  &:hover {
    background-color: #ef6408;
    color: #fff;
  }
`;

const marginLeft36 = css`
  margin-left: 36px;
`;

const height26 = css`
  height: 26px;
`;

const confirmButtonWidth = css`
  width: 99px;
  margin-right: 36px;
`;

const cancelButtonWidth = css`
  width: 132px;
  margin-right: 10px;
`;

const abosulteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ToolBar;
