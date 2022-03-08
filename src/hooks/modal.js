import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReplacementModalAction } from '../redux/slice';

export function useSetPopUpModal() {
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));

  const openWidgetEditingModal = useCallback(
    (id, type) => {
      dispatch(
        createReplacementModalAction({
          imgChangeTargetId: id,
          popUpWindow: true,
          popUpWindowType: type,
        })
      );
    },
    [modal]
  );

  const initModalInfo = useCallback(() => {
    dispatch(
      createReplacementModalAction({
        imgChangeTargetId: '-1',
        popUpWindow: false,
        popUpWindowType: 'default',
      })
    );
  }, [modal]);

  return {
    openWidgetEditingModal,
    initModalInfo,
  };
}
