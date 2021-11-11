import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  ToolBarButton,
  HeaderWrapper,
  ToolBarGroup,
  ToolBarPartition,
  BasicButton,
} from '..';
import postWidgetsInfo from '../../api/postWidgetsInfo';
import SaveEditPageData from '../../pages/SaveEditPageData';
import {
  createReplacementModalAction,
  createReplacementWidgetsAction,
} from '../../redux/slice';
import { convertForServer } from '../../utils/convert';

function ToolBar({ setIsPop }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));
  const user_seq = localStorage.getItem('user_seq');
  // dispatch
  const updateWidgets = (newWidgetList) => {
    dispatch(
      createReplacementWidgetsAction({
        ...widgets,
        // count: widgets.count,
        list: newWidgetList,
      })
    );
  };
  function getNewWidgetList(targetItemIndex) {
    const newList = JSON.parse(JSON.stringify(widgets.list));
    // console.log(targetItemCode);
    const found = newList.find((element) => element.i === targetItemIndex);
    found.widget_action = 'D';
    // console.log(found);
    // TODO: 만들자마자 삭제한 위젯도 widget_action 'D'로 보내면 되는지 확인
    return newList;
  }

  const new_widget_button_list = [
    {
      key: 0,
      label: '그림',
      emoji: '🖼',
      type: 'image',
      onClick: () => {
        if (modal.popUpWindow === true) {
          dispatch(
            createReplacementModalAction({
              ...modal,
              popUpWindow: false,
            })
          );
        } else {
          console.log('이미지가 클릭되엇습니다');
          dispatch(
            createReplacementModalAction({
              ...modal,
              popUpWindow: true,
              popUpWindowType: 'image',
            })
          );
        }
        console.log('add image');
      },
    },
    {
      key: 1,
      label: '영상',
      emoji: '📼',
      type: 'video',
      onClick: () => {
        // setIsPop({ on: 1, type: 'video' });
        if (modal.popUpWindow === true) {
          dispatch(
            createReplacementModalAction({
              ...modal,
              popUpWindow: false,
            })
          );
        } else {
          console.log('비디오가 클릭되엇습니다');
          dispatch(
            createReplacementModalAction({
              ...modal,
              popUpWindow: true,
              popUpWindowType: 'video',
            })
          );
        }
      },
    },
    {
      key: 2,
      label: '투두리스트',
      emoji: '✍️',
      type: 'todo',
      onClick: () => {
        setIsPop({ on: 1, type: 'todo' });
      },
    },
    {
      key: 3,
      label: '달력',
      emoji: '📆',
      type: 'calendar',
      onClick: () => {
        setIsPop({ on: 1, type: 'calendar' });
      },
    },
    {
      key: 4,
      label: '텍스트',
      emoji: 'T',
      type: 'text',
      onClick: () => {
        setIsPop({ on: 1, type: 'text' });
      },
    },
    {
      key: 5,
      label: '시계',
      emoji: '⏰',
      type: 'clock',
      onClick: () => {
        setIsPop({ on: 1, type: 'clock' });
      },
    },
    {
      key: 6,
      label: '방명록',
      emoji: '🙋‍♀️',
      type: 'todo',
      onClick: () => {
        setIsPop({ on: 1, type: 'guest book' });
      },
    },
  ];

  const NewWidgetButtons = new_widget_button_list.map((tool) => (
    <ToolBarButton
      key={tool.key}
      action={tool.onClick}
      emoji={tool.emoji}
      type={tool.type}
      label={tool.label}
    />
  ));

  const essential_button_list = [
    {
      key: 0,
      label: '미리보기',
      emoji: '🕶',
      type: 'preview',
      onClick: () => alert('미리보기 액션'),
    },
    {
      key: 1,
      label: '휴지통',
      emoji: '🗑',
      type: 'trash',
      onClick: () => {
        // 1. getNewWidgetList에 클릭된 위젝 객체의 widget_code를 인자로 넣는다.
        // 2. 해당 위젯객체의 widget_action이 'D'로 업데이트된 새로운 리스트 반환.
        // 3. 새로 반환된 리스트를 이용해 dispatch하여 리덕스 업데이트
        // 4. 위젯을 화면에 뿌릴때 widget_action이 'D'인 객체는 화면에 뿌리지 않도록 한다.
        const newWidgetList = getNewWidgetList('0');

        console.log(newWidgetList);
        updateWidgets(newWidgetList);
      },
    },
  ];
  const EssentialButtons = essential_button_list.map((tool) => (
    <ToolBarButton
      key={tool.key}
      action={tool.onClick}
      emoji={tool.emoji}
      type={tool.type}
      label={tool.label}
    />
  ));

  return (
    <HeaderWrapper>
      <ToolBarGroup>{EssentialButtons}</ToolBarGroup>
      <ToolBarPartition />
      <ToolBarGroup>{NewWidgetButtons}</ToolBarGroup>
      <ToolBarPartition />
      <ToolBarGroup>
        <BasicButton
          label='Save'
          onClick={() => {
            console.log('do post :');
            const postData = convertForServer(widgets.list);
            console.log(postData);
            history.push({
              pathname: `/${user_seq}/save`,
              state: { postData },
            });
          }}
        />
      </ToolBarGroup>
    </HeaderWrapper>
  );
}

export default ToolBar;
