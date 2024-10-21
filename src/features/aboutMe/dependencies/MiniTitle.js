import PropTypes from 'prop-types';

const MiniTitle = ({ titleName }) => {
  return (
    <div className="main-title">
      <h2>{titleName}</h2>
    </div>
  );
};

MiniTitle.propTypes = {
  titleName: PropTypes.string.isRequired,
};

export default MiniTitle;
