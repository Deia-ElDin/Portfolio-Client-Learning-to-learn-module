import { useSelector } from 'react-redux';
import { selectJobForm } from '../../controls/controlsSlice';
import MiniTitle from '../dependencies/MiniTitle';
import JobForm from './JobForm';
import JobsList from './JobsList';

const Jobs = () => {
  const displayJobForm = useSelector(selectJobForm);

  return (
    <section className="jobs" aria-label="Jobs">
      <MiniTitle titleName="Work Experience" />
      {displayJobForm && <JobForm />}
      <JobsList />
    </section>
  );
};

export default Jobs;
