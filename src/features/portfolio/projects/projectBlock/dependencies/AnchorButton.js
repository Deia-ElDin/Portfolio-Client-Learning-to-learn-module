import {
  liveDemoSvg,
  downloadSvg,
} from '../../../../helpers/srcs/handleImgsSrc';
import PropTypes from 'prop-types';

const AnchorButton = ({ link, ariaLabel }) => {
  return (
    <button aria-label={ariaLabel}>
      <figure className="anchor-btn-figure">
        <a href={link} target="_blank" rel="noreferrer noopener">
          <img
            src={ariaLabel.includes('live demo') ? liveDemoSvg : downloadSvg}
            alt={ariaLabel.includes('live demo') ? 'live demo' : 'download'}
          />
        </a>
      </figure>
    </button>
  );
};

AnchorButton.propTypes = {
  link: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

export default AnchorButton;
