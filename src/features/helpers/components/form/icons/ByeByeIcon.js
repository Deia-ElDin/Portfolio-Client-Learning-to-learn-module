import { byeByeSvg } from '../../../srcs/handleImgsSrc';
import PropTypes from 'prop-types';

const ByeByeIcon = ({ handleClick }) => {
  return (
    <figure className="bye-icon" onClick={handleClick}>
      <img src={byeByeSvg} alt="close" />
    </figure>
  );
};

ByeByeIcon.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ByeByeIcon;
