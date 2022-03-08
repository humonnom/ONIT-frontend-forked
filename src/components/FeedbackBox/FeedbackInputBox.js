/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useMyInfo } from '../../hooks/myInfo';
import { useRequestAuth } from '../../hooks/useRequestAuth';
import { mainColor, subColor } from '../../styles/color';
import { getApiEndpoint } from '../../utils/util';

const inputColor = '#fff';

function FeedbackInputBox() {
  const [inputmessage, setInputmessage] = useState('');
  const { loggedIn } = useMyInfo();
  const endpoint = `${getApiEndpoint()}/feedback/register`;

  const { res, request } = useRequestAuth({
    endpoint,
    method: 'post',
    data: {
      content: inputmessage,
    },
  });

  function sendAlert() {
    alert('피드백은 회원 가입 후에 작성 가능합니다!');
  }

  function sendQnA() {
    if (loggedIn === true) {
      request();
    } else {
      sendAlert();
    }
  }

  useEffect(() => {
    if (res && res.data) {
      window.location.reload();
    }
  }, [res]);

  const handleMessageChange = ({ target: { value } }) => {
    setInputmessage(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendQnA();
    }
  };

  return (
    <div css={[background]}>
      <input
        css={[removeInputCss, inputBox]}
        value={inputmessage}
        placeholder='이런 점이 개선되었으면 좋겠어요'
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
      />
      <button
        type='button'
        css={[removeButtonCss, buttonBox]}
        onClick={sendQnA}
      >
        남기기
      </button>
    </div>
  );
}

const background = css`
  background-color: ${inputColor};
  will-change: transform, opacity;
  transition: transform 1000ms ease 0s, opacity 1000ms ease 0s;
  opacity: 1;
  transform: translate3d(0px, 0px, 0px);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  margin: 43.2px 20px;
  border-radius: 48px;
  box-sizing: border-box;
`;

const removeButtonCss = css`
    border: 0;
    outline 0;
`;

const buttonBox = css`
  width: 97.2px;
  height: 33.6px;
  margin-right: 6px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  color: #ffffff;
  border-radius: 28px;
  background-color: ${subColor};
  &:hover {
    background-color: ${mainColor};
  }
`;

const removeInputCss = css`
  border: none;
  box-shadow: none;
  font-size: 1em;
  appearance: none;
`;

const inputBox = css`
  display: block;
  width: 100%;
  height: 24px;
  border-radius: 48px;
  background-color: ${inputColor};
  padding: 12px 20px;
`;

export default FeedbackInputBox;
