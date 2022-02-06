/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { useHistory, useLocation } from 'react-router';
import {
  COLOR_STYLE,
  DisplayNone,
  FlexCenter,
  FlexColCenter,
  FlexColSpaceAroundStart,
  FlexSpaceBetweenCenter,
  FlexSpaceBetweenStart,
  InitButtonStyle,
  SHADOW_STYLE,
} from '../styles/GlobalStyles';
import { useInput } from '../hooks/useInput';
import useRequestJoin from '../hooks/useRequestJoin';
import { logo } from '../asset/index';
import { getFieldList } from '../utils/util';

function JoinPage() {
  const [field, setField] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [agreement, setAgreement] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const fieldList = getFieldList();

  const { endpoint, joinType, userEmail } = location.state;

  // TODO: 필드 index => string
  // field: “design,digital_art”

  // create inputs
  const email = useInput({
    inputType: 'email',
    // label: '이메일',
    id: 'email',
    type: 'email',
  });

  console.log(joinType);

  const password = useInput({
    inputType: 'password',
    // label: '비밀번호',
    id: 'password',
    type: showPassword ? 'text' : 'password',
    button: (
      <button type='button' onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
      </button>
    ),
  });

  const name = useInput({
    inputType: 'name',
    // label: '닉네임',
    id: 'nickname',
    type: 'text',
  });
  const url = useInput({
    inputType: 'url',
    // label: '개인 url',
    id: 'url',
    type: 'text',
    prefix: <p>iamonit.kr/</p>,
  });

  const { res, request } = useRequestJoin({
    endpoint,
    method: 'post',
    data: {
      email: email.value,
      password: password.value,
      nickname: name.value,
      url: url.value,
      field: 'painting',
    },
  });

  console.log(userEmail);

  // event handler
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

  useEffect(() => {
    if (res && res.data) {
      console.log(res);
      if (res.data.code === 'ok') {
        history.push(`/${localStorage.getItem('user_seq')}`);
      } else {
        alert('로그인에 실패했습니다.');
      }
    }
  }, [res]);

  const isInvalid = useCallback((inputState) => inputState !== 'ok', []);

  const disableSubmit = useMemo(() => {
    if (
      (joinType === 'local' && isInvalid(password.state)) ||
      (joinType === 'local' && isInvalid(email.state)) ||
      isInvalid(url.state) ||
      isInvalid(name.state)
    )
      return true;
    else return false;
  }, [email.state, password.state, name.state, url.state]);

  const agreementState = useMemo(() => {
    if (!disableSubmit && !agreement) {
      return '약관에 동의해주세요.';
    }
    return 'ok';
  }, [disableSubmit, agreement]);

  const fieldButtons = useMemo(
    () =>
      fieldList.map((item) => (
        <button
          type='button'
          key={item.id}
          css={[FieldButtonStyle, getColorByState(field, item.id)]}
          onClick={() => onFieldChange(item.id)}
        >
          <p css={FieldButtonLabel}>{item.label}</p>
        </button>
      )),
    [fieldList, field, onFieldChange]
  );

  return (
    <div css={Container}>
      <div css={PageInfos}>
        <div>
          <button
            type='button'
            css={BackButton}
            onClick={() => history.push('/')}
          >
            첫화면으로 돌아가기
          </button>
          <span css={PageGuideMessage}>
            새 계정 생성을 위한 <wbr />
            정보를 입력해
            <wbr />
            주세요.
          </span>
        </div>
        <div>
          <img src={logo} width='100' />
        </div>
      </div>
      <div css={InputListWrapper}>
        <form css={[InputList]} onSubmit={onSubmitHandler}>
          <div css={[InputItem, getDisplay(joinType)]}>
            <label htmlFor='email'>이메일</label>
            {email.component}
          </div>
          <div css={[InputItem, getDisplay(joinType)]}>
            <label htmlFor='password'>비밀번호</label>
            {password.component}
          </div>
          <div css={InputItem}>
            <label htmlFor='nickname'>닉네임</label>
            {name.component}
          </div>
          <div css={InputItem}>
            <label htmlFor='url'>개인 url</label>
            {url.component}
          </div>
          <div css={[InputItem]} id='field'>
            <label htmlFor='field'>분야 선택</label>
            <div css={FieldContainer}>{fieldButtons}</div>
          </div>
          {field.component}
          <div css={InputConfirm}>
            <div>
              <input
                type='checkbox'
                id='agreement'
                onChange={(event) => setAgreement(event.target.checked)}
              />
              <label htmlFor='agreement'>약관에 동의합니다.</label>
              <p>{agreementState === 'ok' ? '' : agreementState}</p>
            </div>
            <button type='submit' disabled={disableSubmit}>
              생성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JoinPage;

const FocusedButton = css`
  background-color: ${COLOR_STYLE.orange};
  color: ${COLOR_STYLE.white};
`;
const NormalButton = css`
  background-color: ${COLOR_STYLE.white};
  color: ${COLOR_STYLE.brownishGrey};
`;

function getColorByState(field, id) {
  if (field.includes(id)) {
    return FocusedButton;
  } else {
    return NormalButton;
  }
}

function getDisplay(joinType) {
  if (joinType === 'kakao') return DisplayNone;
  return css``;
}

const Container = css`
  width: 100vw;
  height: 100vh;
  ${FlexSpaceBetweenCenter}
`;

const PageInfos = css`
  height: inherit;
  width: 35vw;
  margin: 5vh 5vw 5vh 10vw;
  ${FlexColSpaceAroundStart}
  div {
    ${FlexColSpaceAroundStart}
    height: 20vh;
  }
`;

const BackButton = css`
  ${InitButtonStyle}
  font-size: 1.2rem;
  color: ${COLOR_STYLE.brownishGrey};
  margin-bottom: 3vh;
  font-weight: bold;
`;

const PageGuideMessage = css`
  width: 20vw;
  font-size: 2.5rem;
  word-break: keep-all;
  margin-top: 1vh;
  font-weight: bold;
`;

const InputListWrapper = css`
  background-color: ${COLOR_STYLE.lightGrey};
  border-radius: 100px 0px 0px 100px;
  height: inherit;
  width: 65vw;
  ${FlexCenter}
`;

const InputList = css`
  ${FlexColCenter}
  width: 35vw;
  height: 70vh;
  margin: 5vh 3.5vw 2vh 2.5vw;
`;

const InputItem = css`
  ${FlexSpaceBetweenStart}
  margin: 10px;
  width: 100%;
  height: 100%;
  label {
    font-weight: bold;
    font-size: 1rem;
    width: 7vw;
    word-break: keep-all;
    margin-top: 1vh;
    margin-right: 1vw;
  }
`;

const FieldContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
`;

const FieldButtonStyle = css`
  ${InitButtonStyle}

  width: 23%;
  height: 4vh;
  margin-bottom: 1.25em;
  border-radius: 20px;
  box-shadow: ${SHADOW_STYLE.pale};
`;

const FieldButtonLabel = css`
  font-size: 0.8rem;
  color: ${COLOR_STYLE.brownishGrey};
`;

const InputConfirm = css`
  ${FlexSpaceBetweenCenter}
  width: 100%;
  height: 10%;
  p {
    font-size: 0.8rem;
  }
  button {
    ${InitButtonStyle}
    padding: 1.5vh 4vw;
    background-color: ${COLOR_STYLE.orange};
    border-radius: 30px;
    color: ${COLOR_STYLE.white};
  }
`;
