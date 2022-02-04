/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { useHistory, useLocation } from 'react-router';
import {
  COLOR_STYLE,
  FlexColCenter,
  FlexColSpaceAroundStart,
  FlexSpaceAroundCenter,
  FlexSpaceBetweenCenter,
  FlexSpaceBetweenStart,
} from '../styles/GlobalStyles';
import { useInput } from '../hooks/useInput';
import { getApiEndpoint } from '../utils/util';
import useRequestJoin from '../hooks/useRequestJoin';

// TODO: get field data from server
const getFieldList = () => [
  { id: 1, label: '페인팅', name: 'painting' },
  // { id: 2, label: '조각', name: 'sculpture' },
  // { id: 3, label: '비디오아트', name: 'video_art' },
  // { id: 4, label: '디지털아트', name: 'digital_art' },
  // { id: 5, label: '현대미술', name: 'modern_art' },
  // { id: 6, label: '공예', name: 'crafts' },
  // { id: 7, label: '포토그래피', name: 'photography' },
  // { id: 8, label: '건축', name: 'architecture' },
];

function JoinPage() {
  const [field, setField] = useState([]);
  // const [showPassword, setShowPassword] = useState(false);
  const [agreement, setAgreement] = useState(false);

  // TODO: 분야선택도 조건에 넣기
  const history = useHistory();
  const location = useLocation();
  const fieldList = getFieldList();

  const { type, userEmail } = location.state || { type: null, userEmail: null };
  const endpoint = `${getApiEndpoint()}/auth/login/kakao`;
  const email = useInput({ type: 'email' });
  // const password = useInput({ type: 'password' });
  const name = useInput({ type: 'name' });
  const url = useInput({ type: 'url' });

  const { res, request } = useRequestJoin({
    endpoint,
    method: 'post',
    data: {
      email: userEmail || email.input.value,
      nickname: name.input.value,
      url: url.input.value,
      field: field,
    },
  });

  useEffect(() => {
    if (res) {
      console.log(res);
    }
  }, [res]);

  const isValid = useCallback((inputState) => inputState === 'ok', []);

  const disableSubmit = useMemo(() => {
    if (
      // isValid(password.state) &&
      (isValid(email.state) || userEmail) &&
      isValid(url.state) &&
      isValid(name.state)
    ) {
      return false;
    } else return true;
  }, [email.state, name.state, url.state]);

  const agreementState = useMemo(() => {
    if (!disableSubmit && !agreement) {
      return '약관에 동의해주세요.';
    }
    return 'ok';
  }, [disableSubmit, agreement]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('postData');
    request();
  };

  const onFieldChange = useCallback(
    (target) => {
      if (field.includes(target)) {
        setField(field.filter((item) => item !== target));
      } else {
        setField(field.concat(target));
      }
    },
    [field]
  );

  const fieldButtons = useMemo(
    () =>
      fieldList.map((item) => (
        <button
          type='button'
          key={item.id}
          css={[fieldButton, getColorByState(field, item.id)]}
          onClick={() => onFieldChange(item.id)}
        >
          {item.label}
        </button>
      )),
    [fieldList, field, onFieldChange]
  );

  return (
    <div css={Container}>
      <div css={PageInfos}>
        <div>
          <button type='button' onClick={() => history.goBack()}>
            되돌아가기 버튼
          </button>
          <span>
            새 계정 생성을 위한 <wbr />
            정보를 입력해
            <wbr />
            주세요.
          </span>
        </div>
        <h2>Onit</h2>
      </div>
      <form css={[InputList]} onSubmit={onSubmitHandler}>
        <div css={[InputItem]} id='narrow'>
          {' '}
          <label htmlFor='email'>이메일</label>
          <div css={InputItemContents}>
            <div css={Content}>
              <input
                id='email'
                type='email'
                {...email.input}
                placeholder={userEmail || ''}
                readOnly={type === 'kakao'}
              />
            </div>
            <p>{email.state === 'ok' ? '' : email.state}</p>
          </div>
        </div>

        {/* <div css={[InputItem]} id='narrow'>
          <label htmlFor='password'>비밀번호</label>
          <div css={InputItemContents}>
            <div css={Content}>
              <div id='passwordDiv'>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  {...password.input}
                />
                <button
                  id='showPasswordBtn'
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
                </button>
              </div>
            </div>
            <p>{password.state === 'ok' ? '' : password.state}</p>
          </div>
        </div> */}
        <div css={[InputItem]} id='narrow'>
          <label htmlFor='nickname'>닉네임</label>
          <div css={InputItemContents}>
            <div css={Content}>
              <input id='nickname' type='text' {...name.input} />
            </div>
            <p>{name.state === 'ok' ? '' : name.state}</p>
          </div>
        </div>
        <div css={[InputItem]} id='narrow'>
          <label htmlFor='url'>개인 url</label>
          <div css={InputItemContents}>
            <div css={Content}>
              <div id='urlDiv'>
                <p
                  style={{
                    margin: '6px',
                  }}
                >
                  iamonit.kr/
                </p>
                <input
                  id='url'
                  type='text'
                  {...url.input}
                  // placeholder={url}
                />
              </div>
            </div>
            <p>{url.state === 'ok' ? '' : url.state}</p>
          </div>
        </div>
        <div css={[InputItem]} id='wide'>
          <label htmlFor='field'>분야 선택</label>
          <div css={InputItemContents}>
            <div css={Content}>{fieldButtons}</div>
          </div>
        </div>
        <div css={InputConfirm}>
          <input
            type='checkbox'
            id='agreement'
            onChange={(event) => setAgreement(event.target.checked)}
          />
          <label htmlFor='agreement'>약관에 동의합니다.</label>
          <p>{agreementState === 'ok' ? '' : agreementState}</p>
          <button type='submit' disabled={disableSubmit}>
            생성 완료
          </button>
        </div>
      </form>
    </div>
  );
}

export default JoinPage;

const FocusedButton = css`
  background-color: ${COLOR_STYLE.orange};
  color: ${COLOR_STYLE.black};
`;
const NormalButton = css`
  background-color: ${COLOR_STYLE.white};
  color: ${COLOR_STYLE.grey};
`;

function getColorByState(field, id) {
  if (field.includes(id)) {
    return FocusedButton;
  } else {
    return NormalButton;
  }
}

const fieldButton = css`
  padding: 10px;
  margin: 10px;
  min-width: 100px;
  background-color: white;
  &:active {
    background-color: black;
    color: white;
  }
`;

const Container = css`
  width: 100vw;
  height: 100vh;
  ${FlexSpaceBetweenCenter}
`;

const PageInfos = css`
  height: 100vh;
  width: 35vw;
  margin: 5vw;
  ${FlexColSpaceAroundStart}
  div {
    ${FlexColSpaceAroundStart}
    height: 20vh;
    button {
    }
    span {
      width: 12vw;
      font-size: 1.4rem;
      word-break: keep-all;
      margin-top: 1vh;
    }
  }
`;

const InputList = css`
  ${FlexColCenter}
  background-color: ${COLOR_STYLE.lightGrey};
  height: 100vh;
  width: 65vw;
  border-radius: 70px 0px 0px 70px;
  #narrow {
    height: 7vh;
  }
  #wide {
    height: 20vh;
  }
`;

const InputItem = css`
  ${FlexSpaceBetweenStart}
  margin: 10px;
  width: 100%;
  height: 100%;
  label {
    font-weight: bold;
    font-size: 1rem;
    width: 15vw;
  }
`;

const InputItemContents = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 100%;
  ${'' /* border: 0.1rem solid; */}

  > p {
    font-size: 0.8rem;
    color: ${COLOR_STYLE.redOrange};
  }

  > div {
    background-color: ${COLOR_STYLE.white};
  }
`;

const Content = css`
  width: 100%;
  height: 50%;

  input {
    background-color: inherit;
    width: 100%;
    border: 0;
  }

  #showPasswordBtn {
    background-color: inherit;
    border: 0;
    outline: 0;
  }
  div {
    display: flex;
    align-items: center;
  }
  #urlDiv p {
    color: ${COLOR_STYLE.grey};
    font-weight: blod;
  }
  #passwordDiv button {
    width: 12vw;
    padding: 0;
    word-break: keep-all;
  }
`;

const InputConfirm = css`
  ${FlexSpaceAroundCenter}
  width: 100%;
  height: 10%;
  p {
    font-size: 0.8rem;
  }
  button {
    padding: 20px;
  }
`;
