import PropTypes from 'prop-types';

const SwitchBtn = ({ name, labelName, checked, handleChange }) => {
  return (
    <div className="switch-btn-container">
      <label htmlFor={name}>{labelName}</label>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={handleChange}
      />
    </div>
  );
};

SwitchBtn.propTypes = {
  name: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SwitchBtn;
