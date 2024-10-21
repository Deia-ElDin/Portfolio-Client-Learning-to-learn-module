import { useState } from 'react';
import PwIcon from './icons/PwIcon';
import ErrIcon from './icons/ErrIcon';
import PropTypes from 'prop-types';

// Note: this comp with its subs is designed to sever most of the forms inputs & labels
//       instead of making a huge long form everywhere
const General = (props) => {
  const {
    labelName,
    type,
    name,
    value,
    handleChange,
    autoFocus,
    inputErr,
    testId,
  } = props;

  // used with the login form only
  const [showPassword, setShowPassword] = useState(false);

  const pwInputType = showPassword ? 'text' : 'password';

  // Note: in case it's not a password input then the default type will be text (check line 65),
  //       unless we pass it on as a prop
  const inputType = name === 'password' ? pwInputType : type;

  return (
    <section className="general-section">
      <label htmlFor={name}>{labelName}</label>
      <div className="input-div">
        <input
          className={inputErr ? 'input-err' : null}
          type={inputType}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          autoFocus={autoFocus}
          autoComplete="off"
          spellCheck="false"
          data-testid={testId}
        />
        {/* Note: PwIcon used only within the login form */}
        <PwIcon
          inputErr={inputErr}
          labelName={labelName}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        {/* Note: ErrIcon used with every General to indicate an err*/}
        <ErrIcon inputErr={inputErr} />
      </div>
    </section>
  );
};

General.defaultProps = {
  byeBye: false,
  type: 'text',
  autoFocus: false,
};

General.propTypes = {
  byeBye: PropTypes.bool,
  labelName: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'password', 'number']),
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
  inputErr: PropTypes.bool,
  testId: PropTypes.string,
};

export default General;
