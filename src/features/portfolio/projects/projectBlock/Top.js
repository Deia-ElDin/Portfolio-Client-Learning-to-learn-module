import { useContext } from 'react';
import { Buffer } from 'buffer';
import { ProjectContext } from '../../../../context/ProjectContext';

const Top = () => {
  const { projectName, projectImg, uiLiveDemoLink, serverLiveDemoLink } =
    useContext(ProjectContext);

  const link = uiLiveDemoLink
    ? uiLiveDemoLink
    : serverLiveDemoLink
    ? serverLiveDemoLink
    : null;

  const base64String = Buffer.from(projectImg.data.data, 'binary').toString(
    'base64'
  );

  return (
    <section className="top-section" aria-label="Project image">
      <a href={link} target="_blank" rel="noreferrer noopener">
        <figure>
          <img
            src={`data:${projectImg.contentType};base64, ${base64String}`}
            alt={projectName}
          />
        </figure>
      </a>
    </section>
  );
};

export default Top;
