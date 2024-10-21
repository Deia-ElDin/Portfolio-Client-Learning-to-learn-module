import EditBtn from '../../helpers/components/form/btn/EditBtn';
import PropTypes from 'prop-types';

const SkillBlock = ({ id, name, svgLink, percentage }) => {
  const percentageDivStyle = {
    width: `${percentage}%`,
    height: '5px',
  };

  return (
    <section className="skill-block" id={id} aria-label="Skill block">
      <EditBtn id="skills" editId={id} editTarget={name} />
      <article className="name-container">
        <img src={svgLink} alt={name} />
        <h4>{name}</h4>
      </article>
      <article className="percentage-container">
        <p>{`${percentage} %`}</p>
        <div className="percentage-div">
          <div
            className="percentage-bar"
            style={percentageDivStyle}
            data-testid="bar"
          ></div>
        </div>
      </article>
    </section>
  );
};

SkillBlock.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  svgLink: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default SkillBlock;
