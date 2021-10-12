import React from 'react';
import { useSelector } from 'react-redux';
import {
  ToolBarButton,
  ToolBarWrapper,
  ToolBarGroup,
  ToolBarPartition,
  BasicButton,
} from '..';
import postWidgetsInfo from '../../api/postWidgetInfo';

// import { AddVideo, AddImage } from "../../widgets";

function ToolBar(props) {
  //   const [showAddVideo, setShowAddVideo] = useState(false);
  //   const [showAddImage, setShowAddImage] = useState(false);
  // setShowAddVideo((show) => !show)
  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));
  const new_widget_button_list = [
    {
      label: '그림',
      emoji: '🖼',
      type: 'image',
      onClick: () => {
        props.setIsPop({ on: 1, type: 'image' });
      },
    },
    {
      label: '영상',
      emoji: '📼',
      type: 'video',
      onClick: () => {
        props.setIsPop({ on: 1, type: 'video' });
      },
    },
    {
      label: '투두리스트',
      emoji: '✍️',
      type: 'todo',
      onClick: () => {
        props.setIsPop({ on: 1, type: 'todo' });
      },
    },
    {
      label: '달력',
      emoji: '📆',
      type: 'calendar',
      onClick: () => {
        props.setIsPop({ on: 1, type: 'calendar' });
      },
    },
    {
      label: '텍스트',
      emoji: 'T',
      type: 'text',
      onClick: () => {
        props.setIsPop({ on: 1, type: 'text' });
      },
    },
    {
      label: '시계',
      emoji: '⏰',
      type: 'clock',
      onClick: () => {
        props.setIsPop({ on: 1, type: 'clock' });
      },
    },
    {
      label: '방명록',
      emoji: '🙋‍♀️',
      type: 'todo',
      onClick: () => {
        props.setIsPop({ on: 1, type: 'guest book' });
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
    <ToolBarWrapper>
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
    </ToolBarWrapper>
  );
}

export default ToolBar;
