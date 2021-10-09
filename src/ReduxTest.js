import React from 'react';
import { css } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import { createReplacementNumberAction } from './redux/slice';

function ReduxTest(props) {
  // state 가져오기
  const dispatch = useDispatch();
  const number = useSelector((state) => state.test.number);
  const { like, hate } = number;

  // state 수정하기
  const updateLike = (newLike) => {
    dispatch(
      createReplacementNumberAction({
        ...number,
        like: newLike,
      })
    );
  };

  const increaseHate = () => {
    dispatch(
      createReplacementNumberAction({
        ...number,
        hate: hate + 1,
      })
    );
  };
  const handleLike = () => {
    console.log(`like: ${like}`);
    updateLike(like + 1);
  };
  const handleHate = () => {
    console.log(`hate: ${hate}`);
    increaseHate();
  };

  return (
    <div>
      <p>네이트판</p>
      <p>---------</p>
      <p>
        Up:
        {like}
      </p>
      <p>
        Down:
        {hate}
      </p>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        `}
      >
        <button type='button' onClick={handleLike}>
          👍
        </button>
        <button type='button' onClick={handleHate}>
          👎
        </button>
      </div>
    </div>
  );
}

export default ReduxTest;
