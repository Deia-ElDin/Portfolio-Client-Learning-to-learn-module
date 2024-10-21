import PropTypes from 'prop-types';

const InfoBlock = ({ imgSrc, title, info }) => {
  return (
    <section className="info-block" aria-label="My stats">
      <figure>
        <img src={imgSrc} alt={title.toLowerCase()} />
      </figure>
      <article className="details">
        <h4>{title}</h4>
        <p>{info}</p>
      </article>
    </section>
  );
};

InfoBlock.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default InfoBlock;
