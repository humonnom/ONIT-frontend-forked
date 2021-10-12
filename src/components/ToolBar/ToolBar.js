import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ToolBarButton,
  HeaderWrapper,
  ToolBarGroup,
  ToolBarPartition,
  BasicButton,
} from '..';
import postWidgetsInfo from '../../api/postWidgetInfo';
import {
  createReplacementModalAction,
  createReplacementWidgetsAction,
} from '../../redux/slice';

function ToolBar({ setIsPop }) {
  const dispatch = useDispatch();
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));
  // const updateWidgets = (newWidget) => {
  //   console.log(widgets);
  //   dispatch(
  //     createReplacementWidgetsAction({
  //       ...widgets,
  //       count: widgets.count + 1,
  //       list: [...widgets.list, newWidget],
  //     })
  //   );
  // };

  // function createNewImageWidget() {
  //   const widget1 = {
  //     i: 4,
  //     x: 2,
  //     y: 3,
  //     w: 3,
  //     h: 4,
  //     type: 'image',
  //     data: {
  //       contents:
  //         'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtOcFD%2FbtqQ7UbH7rb%2FfLOIKxZ6cKDbxfAkGpQErK%2Fimg.png',
  //     },
  //   };
  //   return widget1;
  // }

  const new_widget_button_list = [
    {
      label: '그림',
      emoji: '🖼',
      type: 'image',
      onClick: () => {
        // setIsPop({ on: 1, type: 'image' });
        dispatch(
          createReplacementModalAction({
            ...modal,
            imgInputWindow: true,
          })
        );
        // const newWidget = createNewImageWidget();
        // updateWidgets(newWidget);
      },
    },
    {
      label: '영상',
      emoji: '📼',
      type: 'video',
      onClick: () => {
        setIsPop({ on: 1, type: 'video' });
      },
    },
    {
      label: '투두리스트',
      emoji: '✍️',
      type: 'todo',
      onClick: () => {
        setIsPop({ on: 1, type: 'todo' });
      },
    },
    {
      label: '달력',
      emoji: '📆',
      type: 'calendar',
      onClick: () => {
        setIsPop({ on: 1, type: 'calendar' });
      },
    },
    {
      label: '텍스트',
      emoji: 'T',
      type: 'text',
      onClick: () => {
        setIsPop({ on: 1, type: 'text' });
      },
    },
    {
      label: '시계',
      emoji: '⏰',
      type: 'clock',
      onClick: () => {
        setIsPop({ on: 1, type: 'clock' });
      },
    },
    {
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
      action={tool.onClick}
      emoji={tool.emoji}
      type={tool.type}
      label={tool.label}
    />
  ));

  const essential_button_list = [
    {
      label: '미리보기',
      emoji: '🕶',
      type: 'preview',
      onClick: () => alert('미리보기 액션'),
    },
    {
      label: '휴지통',
      emoji: '🗑',
      type: 'trash',
      onClick: () => alert('휴지통 액션'),
    },
  ];
  const EssentialButtons = essential_button_list.map((tool) => (
    <ToolBarButton
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
            postWidgetsInfo(widgets);
            window.location.assign('/normal');
          }}
        />
      </ToolBarGroup>
    </HeaderWrapper>
  );
}

export default ToolBar;
