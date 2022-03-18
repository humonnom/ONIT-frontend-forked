/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { closeSet } from '../asset';
import {
  BasicInputStyle,
  COLOR_STYLE,
  commonBtn,
  FlexColCenter,
  FlexColSpaceBetween,
  getAbsoluteBtn,
  InitButtonStyle,
  OrangeColorButton,
  RoundButtonSmall,
  SHADOW_STYLE,
} from '../styles/GlobalStyles';
import { useRequest } from '../hooks/useRequest';
import { getApiEndpoint } from '../utils/util';

function EmailCertModal({ closeModal, email, state, realstate }) {
  const label = '이메일 인증';
  const { btn, img } = getAbsoluteBtn(25, 42, 25);
  const [numbers, setNumbers] = useState('');

  const endpoint = `${getApiEndpoint()}/auth/email/${email}`;
  const { res: sendRes, request: send } = useRequest({
    endpoint: endpoint,
    method: 'get',
    data: {
      email,
    },
  });

  //   const endpoint = `${getApiEndpoint()}/auth/email/${email}`;
  //   const { res: sendRes, request: send } = useRequest({
  //     endpoint: endpoint,
  //     method: 'get',
  //     data: {
  //       email,
  //     },
  //   });

  const handleSubmit = () => {
    console.log('email submit');
    // request();
  };

  //   useEffect(() => {
  // 	  if (res){
  // 		  if (isOk(res.data.code)){
  // 			closeModal();
  //			certSucceed(true);
  // 		  }
  // 	  }
  //   }, [res])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  const handleChange = ({ target: { value } }) => {
    setNumbers(value);
  };

  useEffect(() => {
    console.log(state);
    console.log(realstate);
    if (state) {
      send();
    }
  }, [state, realstate]);

  useEffect(() => {
    // if (sendRes && sendRes.data && isOk(sendRes.data.code)){
    if (sendRes) {
      console.log(sendRes);
    }
  }, [sendRes]);

  return (
    <div css={[Container]}>
      <div css={PopupHeader}>
        <p css={[PopupLabel]}>{label}</p>
        {/* <p>{email}</p> */}
        <button
          type='button'
          css={[commonBtn, btn]}
          onClick={() => closeModal()}
        >
          <div css={img}>
            <img alt='img' height='50px' src={closeSet} />
          </div>
        </button>
      </div>

      <div css={[PopUpBody]}>
        {!state && (
          <>
            <div css={MessageWrapper}>
              <p css={MessageStyle}>현재 입력하신 이메일은 사용할 수 없어요!</p>
              <p css={MessageStyle}>다른 이메일로 다시 시도해주세요.</p>
            </div>
            <button
              type='button'
              css={[InitButtonStyle, OrangeColorButton, RoundButtonSmall]}
              onClick={() => closeModal()}
            >
              확인
            </button>
          </>
        )}
        {state && (
          <>
            <input
              type='text'
              name='text'
              value={numbers}
              css={[urlInputStyle]}
              placeholder='이메일로 송신된 숫자를 입력해주세요'
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <button
              type='button'
              css={[InitButtonStyle, OrangeColorButton, RoundButtonSmall]}
              onClick={() => {
                handleSubmit();
              }}
            >
              인증하기
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EmailCertModal;

const Container = css`
  display: block;
  position: fixed;
  background-color: ${COLOR_STYLE.white};
  top: 50%;
  right: 0;
  bottom: 0;
  left: 0;
  width: 360px;
  max-width: 360px;
  max-height: 300px;
  transform: translateY(-50%);
  ${FlexColCenter}
  ${SHADOW_STYLE.pale}
  z-index: 1000;
  margin: 0 auto;
  padding: 10px;
  border-radius: 30px;
  border: solid 1px black;
`;

const PopupHeader = css`
  margin-bottom: 10px;
  ${'' /* height: 10px; */}
`;

const PopupLabel = css`
  font-family: NotoSansCJKKR;
  font-size: 1.3rem;
  font-weight: 800;
`;

const PopupColumnWrapper = css`
  ${FlexColSpaceBetween}
  width: 80%;
  margin: 0;
`;

const PopUpBody = css`
  ${PopupColumnWrapper}
  align-items: center;
  margin-top: 10px;
`;

const urlInputStyle = css`
  ${BasicInputStyle}
  width: 80%;
  height: 24px;
  margin: 30px 15px 32px 0;
  padding: 8px 17px;
`;

const MessageWrapper = css`
  ${FlexColCenter}
  margin-top: 10px;
  margin-bottom: 20px;
`;

const MessageStyle = css`
  font-size: 0.9rem;
  margin: 10px 5px 0px 5px;
  color: ${COLOR_STYLE.brownishGrey};
`;
