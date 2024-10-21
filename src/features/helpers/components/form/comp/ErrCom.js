import PropTypes from 'prop-types';

const ErrComp = ({ errMsg }) => {
  return <p className="err-comp">{errMsg}</p>;
};

ErrComp.propTypes = {
  errMsg: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
};

export default ErrComp;
