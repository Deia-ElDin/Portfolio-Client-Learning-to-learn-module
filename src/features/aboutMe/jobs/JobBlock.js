import { BsBriefcaseFill } from 'react-icons/bs';
import EditBtn from '../../helpers/components/form/btn/EditBtn';
import PropTypes from 'prop-types';

const JobBlock = (props) => {
  const {
    id,
    countryName,
    countrySVGLink,
    companyName,
    jobTitle,
    jobDescription,
    startingDate,
    finishingDate,
  } = props;

  return (
    <section className="job-block" id={id} aria-label="Job block">
      <i className="icon">
        <BsBriefcaseFill className="work-icon" data-testid="job-icon" />
      </i>
      <EditBtn id="jobs" editId={id} editTarget={jobTitle} />

      <article className="job-header">
        <p className="working-period">{`${startingDate} - ${finishingDate}`}</p>
        <article className="country">
          <p className="country-name">{countryName}</p>
          <figure className="country-image">
            <img src={countrySVGLink} alt={countryName} />
          </figure>
        </article>
      </article>

      <p className="job-details">
        <span className="title">{jobTitle}</span> - {companyName}
      </p>

      <p className="job-description">{jobDescription}</p>
    </section>
  );
};

JobBlock.propTypes = {
  id: PropTypes.string.isRequired,
  countryName: PropTypes.string.isRequired,
  countrySVGLink: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  jobDescription: PropTypes.string.isRequired,
  startingDate: PropTypes.string.isRequired,
  finishingDate: PropTypes.string.isRequired,
};

export default JobBlock;
