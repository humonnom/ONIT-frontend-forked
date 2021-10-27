import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ToolBarButton,
  HeaderWrapper,
  ToolBarGroup,
  ToolBarPartition,
  BasicButton,
} from '..';
import postWidgetsInfo from '../../api/postWidgetsInfo';
import { createReplacementWidgetsAction } from '../../redux/slice';
import AddNewWidget from '../Widgets/AddNewWidget';

function ToolBar({ setIsPop }) {
  const dispatch = useDispatch();

  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));

  const new_widget_button_list = [
    {
      key: 0,
      label: '그림',
      emoji: '🖼',
      type: 'image',
      onClick: () => {
        const newWidgets = AddNewWidget(widgets, 0, 1000, '"하이": 하이');
        dispatch(
          createReplacementWidgetsAction({
            ...newWidgets,
          })
        );
      },
    },
    {
      key: 1,
      label: '영상',
      emoji: '📼',
      type: 'video',
      onClick: () => {
        setIsPop({ on: 1, type: 'video' });
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
      onClick: () => alert('휴지통 액션'),
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
            // postWidgetsInfo(widgets);
          }}
        />
      </ToolBarGroup>
    </HeaderWrapper>
  );
}

export default ToolBar;
