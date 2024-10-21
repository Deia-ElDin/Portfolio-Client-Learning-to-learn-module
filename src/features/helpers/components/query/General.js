import PropTypes from 'prop-types';

const General = (props) => {
  const {
    checkBoxName,
    checked,
    handleDisplay,
    labelName,
    inputType,
    inputName,
    placeholder,
    autoFocus,
    value,
    handleChange,
  } = props;

  return (
    <fieldset className="query-fieldset">
      <input
        className={checked ? 'on' : 'off'}
        type="checkbox"
        id={checkBoxName}
        name={checkBoxName}
        checked={checked}
        onChange={handleDisplay}
      />
      <label htmlFor={checkBoxName} className={checked ? 'on' : 'off'}>
        {labelName}
      </label>

      <div className="input-div">
        <input
          className={checked ? 'on' : 'off'}
          type={inputType}
          id={inputName}
          name={inputName}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </fieldset>
  );
};

General.defaultProps = {
  type: 'text',
};

General.propTypes = {
  checkBoxName: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleDisplay: PropTypes.func.isRequired,
  labelName: PropTypes.string.isRequired,
  inputType: PropTypes.oneOf(['text', 'number']),
  inputName: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default General;
