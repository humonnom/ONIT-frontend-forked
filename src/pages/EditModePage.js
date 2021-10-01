import React, { useState } from 'react';
import {
  PageWrapper,
  EditWrapper,
  ToolBar,
  EditAllWidgets,
} from '../components';

function EditMode(props) {
  const [layoutInfo, setLayoutInfo] = useState([
    {
      i: '0',
      x: 1,
      y: 1,
      w: 2,
      h: 2,
      type: 'image',
      source: 'url',
    },
    { i: '1', x: 2, y: 4, w: 4, h: 2 },
    { i: '2', x: 10, y: 4, w: 4, h: 4 },
  ]);

  return (
    <PageWrapper>
      <EditWrapper>
        <ToolBar />
        <EditAllWidgets
          draggable
          onDragOver={(event) => {
            console.log('onDragOver');
            // console.log(event);
          }}
          layoutInfo={layoutInfo}
        />

        <Dialog
          onDragEnd={(event) => {
            console.log('onDragEnd');
            // console.log(event);

            // TODO: Calculate coordinates using screen coordinates
            setLayoutInfo([
              ...layoutInfo,
              { i: layoutInfo.length, x: 12, y: 6, w: 4, h: 4 },
            ]);
          }}
        />
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
      <button
        type='button'
        onClick={(event) => {
          alert('hello');
        }}
      >
        button
      </button>
    </div>
  );
}

export default EditMode;
