import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { selectProjectForm } from '../../controls/controlsSlice';
import { selectProjectsData } from '../portfolioSlice';
import Title from '../../helpers/components/title/Title';
import ProjectBlock from '../projects/projectBlock/ProjectBlock';
import ProjectForm from '../forms/ProjectForm';

const Project = () => {
  const displayProjectForm = useSelector(selectProjectForm);
  const projectsData = useSelector(selectProjectsData);
  const { id } = useParams();
  const navigate = useNavigate();

  const requiredProject =
    projectsData.length >= 1
      ? projectsData.find((project) => project._id === id)
      : null;

  useEffect(() => {
    if (!requiredProject) navigate('/');
  }, [requiredProject, navigate]);

  useEffect(() => {
    if (!displayProjectForm) window.scrollTo(window.scrollTo(0, 0));
  });

  return (
    requiredProject && (
      <section className="main-section project">
        <Title spanText={requiredProject.projectName} />
        <ProjectBlock
          project={requiredProject}
          activateDetailsBtn={false}
          activateHeaderLink={false}
        />
        {displayProjectForm && <ProjectForm />}
      </section>
    )
  );
};

export default Project;
