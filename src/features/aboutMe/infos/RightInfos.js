import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectProjectsData } from '../../portfolio/portfolioSlice';
import { handleExperience } from '../../helpers/functions/handleAboutMe';
import {
  expSvg,
  clientsSvg,
  projectsSvg,
} from '../../helpers/srcs/handleImgsSrc';
import { selectTotalProjects } from '../../portfolio/portfolioSlice';
import InfoBlock from './InfoBlock';

const RightInfos = () => {
  const projectsData = useSelector(selectProjectsData);
  const totalProjects = useSelector(selectTotalProjects);
  const exp = handleExperience();
  const [clients, setClients] = useState(0);
  const [projects, setProjects] = useState(0);

  useEffect(() => {
    if (projectsData && projectsData.length > 0) {
      setClients(
        projectsData.filter((project) => project.commercial === true).length
      );
      setProjects(totalProjects);
    }
  }, [projectsData, totalProjects]);

  return (
    <article className="right-infos">
      <InfoBlock imgSrc={expSvg} title="Experience" info={exp} />
      <InfoBlock imgSrc={clientsSvg} title="Clients" info={clients} />
      <InfoBlock imgSrc={projectsSvg} title="Projects" info={projects} />
    </article>
  );
};

export default RightInfos;
