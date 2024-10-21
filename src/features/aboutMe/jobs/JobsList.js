import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectJobsData, setCountriesData } from '../aboutMeSlice';
import JobBlock from './JobBlock';

const JobsList = () => {
  const [renderJobs, setrenderJobs] = useState([]);
  const jobsData = useSelector(selectJobsData);
  const dispatch = useDispatch();

  useEffect(() => {
    const contriesList = [];

    if (jobsData && jobsData.length > 0) {
      const jobsList = jobsData.map((job) => {
        const {
          _id,
          countryName,
          countrySVGLink,
          companyName,
          jobTitle,
          jobDescription,
          startingDate,
          finishingDate,
        } = job;

        if (!contriesList.includes(countryName)) {
          contriesList.push({ countryName, countrySVGLink });
        }

        return (
          <JobBlock
            key={_id}
            id={_id}
            countryName={countryName}
            countrySVGLink={countrySVGLink}
            companyName={companyName}
            jobTitle={jobTitle}
            jobDescription={jobDescription}
            startingDate={startingDate}
            finishingDate={finishingDate}
          />
        );
      });

      dispatch(setCountriesData(contriesList));
      setrenderJobs(jobsList);
    }
  }, [jobsData, dispatch]);

  return (
    <section className="jobs-list" aria-label="Jobs list">
      {renderJobs}
    </section>
  );
};

export default JobsList;
