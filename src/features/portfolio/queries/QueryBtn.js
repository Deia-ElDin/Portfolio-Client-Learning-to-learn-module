import PropTypes from 'prop-types';

const QueryBtn = ({ btnName, btnId, className, handleClick, loading }) => {
  return (
    <button
      id={btnId}
      className={className}
      aria-label={btnName}
      onClick={handleClick}
    >
      {btnName}
    </button>
  );
};

QueryBtn.propTypes = {
  btnName: PropTypes.string,
  btnId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default QueryBtn;
