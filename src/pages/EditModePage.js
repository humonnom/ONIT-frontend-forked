import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  PageWrapper,
  EditWrapper,
  ToolBar,
  EditAllWidgets,
  AddImage,
} from '../components';
import getWidgetsInfo from '../api/getWidgetsInfo';
import { createReplacementWidgetsAction } from '../redux/slice';

function EditMode(props) {
  const dispatch = useDispatch();
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));
  const handlePosUpdate = ([{ i, x, y, w, h }]) => {
    console.log('change');
  };

  useEffect(() => {
    const setWidgetState = async () => {
      // update from server
      const widgetsInfo = await getWidgetsInfo();
      // console.log(widgetsInfo);
      dispatch(
        createReplacementWidgetsAction({
          count: widgetsInfo.data.count,
          list: widgetsInfo.data.list,
        })
      );
    };
    setWidgetState();
  }, []);

  const layoutInfo = widgets.list;
  const [isPop, setIsPop] = useState({
    on: 0,
    type: 'none',
  });
  // console.log(newWidgets);
  return (
    <PageWrapper>
      <EditWrapper>
        <ToolBar setIsPop={setIsPop} />
        {modal.imgInputWindow && <AddImage />}
        <EditAllWidgets
          onDragOver={(event) => {
            console.log('onDragOver');
          }}
          isPop={isPop}
        />

        {isPop.on === 1 && (
          <Dialog
            onDragEnd={(event) => {
              console.log('onDragEnd');
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
