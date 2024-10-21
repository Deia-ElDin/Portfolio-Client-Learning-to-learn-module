import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import { selectUserFormOpacity, setFormOpacity } from '../appSlice';
import { setLoginForm } from '../controls/controlsSlice';
import { formStyle } from '../helpers/functions/handleForms';
import OpacitySlider from '../helpers/components/form/slider/OpacitySlider';
import ByeByeIcon from '../helpers/components/form/icons/ByeByeIcon';
import General from '../helpers/components/form/General';
import LoadingComp from '../helpers/components/form/comp/LoadingComp';
import ErrComp from '../helpers/components/form/comp/ErrCom';
import GeneralBtn from '../helpers/components/form/btn/GeneralBtn';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState(null);
  const [usernameErr, setUsernameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [formErr, setFormErr] = useState(false);

  const errMsgRef = useRef(null);

  const userFormOpaicty = useSelector(selectUserFormOpacity);
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useLayoutEffect(() => {
    errMsgRef.current = errMsg;
  }, [errMsg]);

  useEffect(() => {
    // if there was an err and the user start typing, we reset everything
    if (errMsgRef.current) {
      dispatch(setFormOpacity(userFormOpaicty));
      resetErrs();
    }
  }, [username, password, errMsgRef, userFormOpaicty, dispatch]);

  const resetErrs = () => {
    setErrMsg(null);
    setUsernameErr(false);
    setPasswordErr(false);
    setFormErr(false);
  };

  const handleByeByeClick = () => {
    // if the user closed the form we reset everything
    if (errMsg) dispatch(setFormOpacity(userFormOpaicty));
    dispatch(setLoginForm(false));
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) handleByeByeClick();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ username, accessToken }));
      setUsername('');
      setPassword('');
      dispatch(setLoginForm(false));
    } catch (err) {
      dispatch(setFormOpacity(1));
      if (err?.data?.msg) {
        const loginErr = err.data.msg;
        setErrMsg(loginErr);
        if (loginErr === 'Must provide username') {
          setUsernameErr(true);
        } else if (loginErr === 'Must provide password') {
          setPasswordErr(true);
        } else if (loginErr === 'Must provide username and password') {
          setUsernameErr(true);
          setPasswordErr(true);
        } else if (loginErr === 'Invalid Credentials') {
          setFormErr(true);
        }
      } else {
        setErrMsg('No Server Response');
      }
    }
  };

  return (
    <form
      className={formErr ? 'login-form form-err' : 'login-form'}
      style={formStyle(errMsg, formErr, userFormOpaicty)}
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmit}
      aria-label="Login form"
    >
      <OpacitySlider />
      <ByeByeIcon handleClick={handleByeByeClick} />
      <General
        labelName="Username:"
        name="username"
        value={username}
        handleChange={(e) => setUsername(e.target.value)}
        autoFocus={true}
        inputErr={usernameErr}
      />
      <General
        labelName="Password:"
        name="password"
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
        inputErr={passwordErr}
        testId="password-input"
      />

      {isLoading && <LoadingComp />}
      {errMsg && <ErrComp errMsg={errMsg} />}

      <GeneralBtn btnName="Log In" />
    </form>
  );
};

export default Login;
