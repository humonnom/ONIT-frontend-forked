import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  PageWrapper,
  EditWrapper,
  ToolBar,
  EditAllWidgets,
} from '../components';
import { createReplacementWidgetAction } from '../redux/slice';

// 여기
function EditMode(props) {
  // redux test
  const dispatch = useDispatch();
  const { widget } = useSelector((state) => ({
    widget: state.info.widget,
  }));
  const layoutInfo = [widget];

  // const updateSize = (newW, newH) => {
  //   dispatch(
  //     createReplacementWidgetAction({
  //       ...widget,
  //       w: newW,
  //       h: newH,
  //     })
  //   );
  // };
  const updatePos = (newX, newY) => {
    dispatch(
      createReplacementWidgetAction({
        ...widget,
        y: newY,
        x: newX,
      })
    );
  };
  const handlePosUpdate = ([{ i, x, y, w, h }]) => {
    console.log('change');
    updatePos(x, y);
    console.log(x);
    console.log(y);
    console.log(widget.x);
    console.log(widget.y);
  };
  // const [layoutInfo, setLayoutInfo] = useState([
  //   {
  //     i: '0',
  //     x: 1,
  //     y: 1,
  //     w: 2,
  //     h: 2,
  //     type: 'txt',
  //     source: '블록을 추가하세요!',
  //   },
  // ]);
  const [isPop, setIsPop] = useState({
    on: 0,
    type: 'none',
  });
  return (
    <PageWrapper>
      <EditWrapper>
        <ToolBar setIsPop={setIsPop} />
        <EditAllWidgets
          onDragOver={(event) => {
            console.log('onDragOver');
            // console.log(event);
          }}
          // layoutInfo={layoutInfo}
          isPop={isPop}
        />

        {isPop.on === 1 && (
          <Dialog
            onDragEnd={(event) => {
              console.log('onDragEnd');
              // console.log(event);

              // TODO: Calculate coordinates using screen coordinates
              handlePosUpdate([
                {
                  i: layoutInfo.length,
                  x: 12,
                  y: 6,
                  w: 4,
                  h: 4,
                },
              ]);
              setIsPop({
                on: 0,
                type: 'none',
              });
            }}
          />
        )}
      </EditWrapper>
    </PageWrapper>
  );
}

function Dialog(props) {
  const [isHiding, setIsHiding] = useState(false);

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
      }}
    >
      {!isHiding && (
        <div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            padding: 16,
            backgroundColor: 'grey',
          }}
        />
      )}

      <Widget
        draggable
        onDragStart={(event) => {
          setIsHiding(true);
          console.log('onDragStart');
          // console.log(event);
        }}
        onDragEnd={() => {
          props.onDragEnd();
          setIsHiding(false);
        }}
      />
    </div>
  );
}

function Widget(props) {
  return (
    <div
      style={{
        position: 'absolute',
        padding: 16,
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 8,
      }}
      {...props}
    >
      Widget
    </div>
  );
}

export default EditMode;
