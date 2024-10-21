import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';
import PropTypes from 'prop-types';

const PwIcon = ({ inputErr, labelName, showPassword, setShowPassword }) => {
  const handleClick = () => setShowPassword(!showPassword);

  const showIcon = (
    <AiFillEye
      className="password-icon"
      data-testid="show-password"
      onClick={handleClick}
    />
  );

  const hideIcon = (
    <AiFillEyeInvisible
      className="password-icon"
      data-testid="hide-password"
      onClick={handleClick}
    />
  );

  const displayPwIcon = showPassword ? hideIcon : showIcon;

  // in case there's an input err we don't display the pwIcon, we display the ErrIcon instead
  const displayComp = labelName === 'Password:' && !inputErr ? true : false;

  return displayComp && displayPwIcon;
};

PwIcon.propTypes = {
  inputErr: PropTypes.bool,
  labelName: PropTypes.string.isRequired,
  showPassword: PropTypes.bool.isRequired,
  setShowPassword: PropTypes.func.isRequired,
};

export default PwIcon;
