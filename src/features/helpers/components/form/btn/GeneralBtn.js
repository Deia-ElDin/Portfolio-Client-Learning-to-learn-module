import PropTypes from 'prop-types';

// Note: this btn is designed to be used anywhere (create, update, delete, login, or logout)
const GeneralBtn = ({ btnName, handleClick, handleDoubleClick }) => {
  // in case it's deleteBtn we don't need to add e.preventDefault()
  const submitBtns = ['Log In', 'Create', 'Update', 'Fetch IT', 'Say Hello'];

  const btnType = submitBtns.includes(btnName) ? 'submit' : 'button';

  const btnClass = btnName === 'Delete' ? 'delete-btn' : 'general-btn';

  return (
    <button
      type={btnType}
      className={btnClass}
      aria-label={btnName}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {btnName}
    </button>
  );
};

GeneralBtn.propTypes = {
  btnName: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  handleDoubleClick: PropTypes.func,
};

export default GeneralBtn;
