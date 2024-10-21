import PropTypes from 'prop-types';

const CheckBox = ({ labelName, name, checked, handleChange }) => {
  return (
    <section className="checkbox-section">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={name}>{labelName}</label>
    </section>
  );
};

CheckBox.propTypes = {
  labelName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};

export default CheckBox;
