import PropTypes from 'prop-types';

const DropFile = ({ name, handleChange, spanText, autoFocus }) => {
  return (
    <section className="drop-file-section">
      <label htmlFor={name}>
        <img src={process.env.PUBLIC_URL + '/assets/upload.png'} alt="upload" />
        <input
          type="file"
          name={name}
          id={name}
          onChange={handleChange}
          autoFocus={autoFocus}
          data-testid="drop-box"
        />
        <span>
          {spanText
            ? spanText
            : name === 'projectImg'
            ? 'Drag & Drop your project image here'
            : 'Drag & Drop your profile picture here'}
        </span>
      </label>
    </section>
  );
};

DropFile.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  spanText: PropTypes.string,
  autoFocus: PropTypes.bool,
};

export default DropFile;
