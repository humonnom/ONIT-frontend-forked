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
  PageTitleMQ,
  SHADOW_STYLE,
  mq,
} from '../styles/GlobalStyles';
import { useInput } from '../hooks/useInput';
import useRequestJoin from '../hooks/useRequestJoin';
import { logo } from '../asset/index';
import { getFieldList, getSelectedFieldData } from '../utils/util';

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
    id: 'email',
    type: 'email',
    label: '이메일',
    overlapCheckRequired: true,
  });

  const password = useInput({
    inputType: 'password',
    id: 'password',
    type: showPassword ? 'text' : 'password',
    button: (
      <button type='button' onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
      </button>
    ),
  });

  const name = useInput({
    inputType: 'nickname',
    id: 'nickname',
    type: 'text',
    label: '닉네임',
    overlapCheckRequired: true,
  });

  const url = useInput({
    inputType: 'url',
    id: 'url',
    type: 'text',
    prefix: <p>iamonit.kr/</p>,
    label: 'URL',
    overlapCheckRequired: true,
  });

  const getPostData = () => {
    if (joinType === 'kakao') {
      return {
        email: userEmail,
        nickname: name.value,
        url: url.value,
        field: getSelectedFieldData(field),
      };
    } else {
      return {
        email: email.value,
        password: password.value,
        nickname: name.value,
        url: url.value,
        field: getSelectedFieldData(field),
      };
    }
  };

  const { res, request } = useRequestJoin({
    endpoint,
    method: 'post',
    data: getPostData(),
  });

  // event handler
  const onSubmitHandler = (event) => {
    event.preventDefault();
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

  // post result
  useEffect(() => {
    if (res && res.data) {
      if (res.data.code === 'ok') {
        // TODO: login 시키기는 나중에
        history.push('/login');
        // history.push(`/${url.value}`);
      } else {
        alert('전송에 실패했습니다. 다시 시도해주세요.');
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
    <div css={[Container, ContainerMQ()]}>
      <div css={[PageInfos, PageInfosMQ()]}>
        <div css={[PageInfo]}>
          <button
            type='button'
            css={BackButton}
            onClick={() => history.push('/login')}
          >
            첫화면으로 돌아가기
          </button>
          <span css={[PageGuideMessage, PageTitleMQ(), PageGuideMessageMQ()]}>
            새 계정 생성을 위한 <wbr />
            정보를 입력해
            <wbr />
            주세요.
          </span>
        </div>
        <div>
          <img src={logo} width='110' />
        </div>
      </div>
      <div css={[InputListWrapper, InputListWrapperMQ()]}>
        <form css={[InputList, InputListMQ()]} onSubmit={onSubmitHandler}>
          <div css={[InputItem, InputItemMQ(), getDisplay(joinType)]}>
            <label css={[InputLabel, InputLabelMQ()]} htmlFor='email'>
              이메일
            </label>
            {email.component}
          </div>
          <div css={[InputItem, InputItemMQ(), getDisplay(joinType)]}>
            <label css={[InputLabel, InputLabelMQ()]} htmlFor='password'>
              비밀번호
            </label>
            {password.component}
          </div>
          <div css={[InputItem, InputItemMQ()]}>
            <label css={[InputLabel, InputLabelMQ()]} htmlFor='nickname'>
              닉네임
            </label>
            {name.component}
          </div>
          <div css={[InputItem, InputItemMQ()]}>
            <label css={[InputLabel, InputLabelMQ()]} htmlFor='url'>
              개인 url
            </label>
            {url.component}
          </div>
          <div css={[[InputItem, InputItemMQ()]]} id='field'>
            <label css={[InputLabel, InputLabelMQ()]} htmlFor='field'>
              분야 선택
            </label>
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
  ${FlexSpaceBetweenCenter}
`;

export const ContainerMQ = () => {
  const narrow = 'auto';
  const normal = '100vh';

  return mq({
    flexDirection: ['column', 'column', 'row', 'row'],
    height: [narrow, narrow, normal, normal],
  });
};

const PageInfos = css`
  height: inherit;
  ${FlexColSpaceAroundStart}
`;

export const PageInfosMQ = () => {
  const normal = '35vw';
  const narrow = '35vw';
  const normalMargin = '5vh 5vw 5vh 10vw';
  const narrowMargin = '5vh 5vw 3vh 5vw';
  return mq({
    width: [narrow, narrow, normal, normal],
    alignItems: ['center', 'center', 'start', 'start'],
    margin: [narrowMargin, narrowMargin, normalMargin, normalMargin],
  });
};

const PageInfo = css`
  ${FlexColSpaceAroundStart}
  height: 20vh;
  width: 100%;
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
  font-size: 1rem;
  word-break: keep-all;
  margin-top: 1vh;
  font-weight: bold;
`;

export const PageGuideMessageMQ = () => {
  const normal = '20vw';
  const narrow = '40vw';
  return mq({
    width: [narrow, narrow, normal, normal],
  });
};

const InputListWrapper = css`
  background-color: ${COLOR_STYLE.lightGrey};
  border-radius: 100px 0px 0px 100px;
  height: inherit;
  ${FlexCenter}
`;

export const InputListWrapperMQ = () => {
  const normal = '100px 0px 0px 100px';
  const narrow = '100px 100px 0px 0px';
  const normalWidth = '65vw';
  const narrowWidth = '100vw';
  return mq({
    width: [narrowWidth, narrowWidth, normalWidth, normalWidth],
    borderRadius: [narrow, narrow, normal, normal],
  });
};

const InputList = css`
  ${FlexColCenter}
  margin: 5vh 3.5vw 2vh 2.5vw;
`;

export const InputListMQ = () => {
  const normalHeight = '70vh';
  const narrowHeight = 'auto';
  const normalWidth = '35vw';
  const narrowWidth = '70%';

  return mq({
    height: [narrowHeight, narrowHeight, normalHeight, normalHeight],
    width: [narrowWidth, narrowWidth, normalWidth, normalWidth],
  });
};

const InputItem = css`
  ${FlexSpaceBetweenStart}
  margin: 10px;
  width: 100%;
  height: 100%;
`;

export const InputItemMQ = () => {
  return mq({
    flexDirection: ['column', 'column', 'row', 'row'],
  });
};

const InputLabel = css`
  font-weight: bold;
  font-size: 1rem;
  word-break: keep-all;
  margin-top: 1vh;
  margin-right: 1vw;
`;

const InputLabelMQ = () => {
  return mq({
    width: ['15vw', '15vw', '7vw', '7vw'],
    marginBottom: ['2vh', '2vh', '0', '0'],
  });
};

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
