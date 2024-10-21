import EditBtn from '../../helpers/components/form/btn/EditBtn';
import PropTypes from 'prop-types';

const MediasBlock = ({ id, name, svgLink, link }) => {
  return (
    <div className="btn-container" data-testid="btn-container">
      <EditBtn id="medias" editId={id} editTarget={name} />
      <button className="social-media-btn">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img src={svgLink} alt={name} />
        </a>
      </button>
    </div>
  );
};

MediasBlock.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  svgLink: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default MediasBlock;
