import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSkillsData } from '../aboutMeSlice';
import SkillBlock from './SkillBlock';

const FetchProjects = () => {
  const [renderSkills, setrenderSkills] = useState([]);
  const skillsData = useSelector(selectSkillsData);

  useEffect(() => {
    if (skillsData && skillsData.length > 0) {
      const skillsList = skillsData.map((skill) => {
        const { _id, name, svgLink, percentage } = skill;

        return (
          <SkillBlock
            key={_id}
            id={_id}
            name={name}
            svgLink={svgLink}
            percentage={percentage}
          />
        );
      });

      setrenderSkills(skillsList);
    }
  }, [skillsData]);

  return (
    <section className="skills-list" aria-label="Skills list">
      {renderSkills}
    </section>
  );
};

export default FetchProjects;
