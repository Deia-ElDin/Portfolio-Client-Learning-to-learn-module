import { BiError } from 'react-icons/bi';
import PropTypes from 'prop-types';

const ErrIcon = ({ inputErr }) => {
  const icon = <BiError className="err-icon" data-testid="err-icon" />;

  const displayComnp = inputErr ? true : false;

  return displayComnp && icon;
};

ErrIcon.propTypes = {
  inputErr: PropTypes.bool,
};

export default ErrIcon;
