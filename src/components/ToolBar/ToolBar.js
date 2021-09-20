import React from "react";
import { AddWidgetButton, ToolBarWrapper, ToolBarGroup, ToolBarPartition } from "..";
// import { AddVideo, AddImage } from "../../widgets";

function ToolBar(props) {
  //   const [showAddVideo, setShowAddVideo] = useState(false);
  //   const [showAddImage, setShowAddImage] = useState(false);
  //setShowAddVideo((show) => !show)

  function AddWidgetAction({ label }) {
    alert(`${label} 위젯 추가 팝업`);
    //(AddVideo or AddImage)
  }

  const add_widget_button_list = [
    { label: "그림", emoji: "🖼", type: "image", onClick: () => AddWidgetAction({label: 'image'}) },
    { label: "영상", emoji: "📼", type: "video", onClick: () => AddWidgetAction({label: 'video'}) },
    { label: "투두리스트", emoji: "✍️", type: "todo", onClick: () => AddWidgetAction({label: 'todo'}) },
    { label: "달력", emoji: "📆", type: "todo", onClick: () => AddWidgetAction({label: 'calendar'}) },
    { label: "텍스트", emoji: "T", type: "todo", onClick: () => AddWidgetAction({label: 'text'}) },
    { label: "시계", emoji: "⏰", type: "todo", onClick: () => AddWidgetAction({label: 'clock'}) },
    { label: "방명록", emoji: "🙋‍♀️", type: "todo", onClick: () => AddWidgetAction({label: 'guest book'}) },
  ];
  const AddWidgetButtons = add_widget_button_list.map(function (tool) {
    return <AddWidgetButton  onClick={tool.onClick}
	emoji={tool.emoji}
	type={tool.type}
	label={tool.label}
	/>;
  });

  const essential_button_list = [
    { label: "미리보기", emoji: "🕶", type: "preview", onClick: () => alert("미리보기 액션") },
    { label: "휴지통", emoji: "🗑", type: "trash", onClick: () => alert("휴지통 액션") },
  ];
  const EssentialButtons = essential_button_list.map(function (tool) {
    return <AddWidgetButton  onClick={tool.onClick}
	emoji={tool.emoji}
	type={tool.type}
	label={tool.label}
	/>;
  });

  return (
    <ToolBarWrapper>
      <ToolBarGroup>
        {EssentialButtons}
      </ToolBarGroup>
	  <ToolBarPartition />
      <ToolBarGroup>
        {AddWidgetButtons}
      </ToolBarGroup>
    </ToolBarWrapper>
  );
}

export default ToolBar;
