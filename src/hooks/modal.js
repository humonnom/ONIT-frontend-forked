import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReplacementModalAction } from '../redux/slice';

export function useSetPopUpModal() {
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));

  const openImageModal = useCallback(
    (id) => {
      dispatch(
        createReplacementModalAction({
          imgChangeTargetId: id,
          popUpWindow: true,
          popUpWindowType: 'image',
        })
      );
    },
    [modal]
  );

  const closeToolbar = useCallback(() => {
    dispatch(
      createReplacementModalAction({
        imgChangeTargetId: '-1',
        popUpWindow: false,
        popUpWindowType: 'image',
      })
    );
  }, [modal]);

  return {
    openImageModal,
    closeToolbar,
  };
}
