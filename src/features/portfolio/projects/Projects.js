import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectProjectForm,
  selectFetchForm,
} from '../../controls/controlsSlice';
import { selectProjectsData } from '../portfolioSlice';
import ProjectForm from '../forms/ProjectForm';
import FetchForm from '../forms/FetchForm';
import ProjectBlock from './projectBlock/ProjectBlock';

const Projects = () => {
  const [renderProjects, setrenderProjects] = useState([]);
  const projectsData = useSelector(selectProjectsData);
  const displayProjectForm = useSelector(selectProjectForm);
  const displayFetchForm = useSelector(selectFetchForm);

  useEffect(() => {
    if (projectsData && projectsData.length > 0) {
      const projectsList = projectsData.map((project) => {
        return (
          <ProjectBlock
            key={project._id}
            project={project}
            activateDetailsBtn={true}
            activateHeaderLink={true}
          />
        );
      });

      setrenderProjects(projectsList);
    }
  }, [projectsData]);

  return (
    <section className="projects">
      <section className="projects-list" aria-label="Projects list">
        {renderProjects}
      </section>
      {displayProjectForm && <ProjectForm />}
      {displayFetchForm && <FetchForm />}
    </section>
  );
};

export default Projects;
