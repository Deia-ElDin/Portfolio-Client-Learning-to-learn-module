import ProjectProvider from '../../../../context/ProjectContext';
import EditBtn from '../../../helpers/components/form/btn/EditBtn';
import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';
import MoreDetailsBtn from './dependencies/MoreDetailsBtn';
import PropTypes from 'prop-types';

const ProjectBlock = (props) => {
  const { project, activateDetailsBtn, activateHeaderLink } = props;
  const values = { ...project, activateDetailsBtn, activateHeaderLink };

  return (
    <ProjectProvider values={values}>
      <section className="project-block" aria-label="Project">
        <EditBtn location="projects" editId={project._id} />
        <Top />
        <Middle />
        <Bottom />
        <MoreDetailsBtn />
      </section>
    </ProjectProvider>
  );
};

ProjectBlock.propTypes = {
  project: PropTypes.object.isRequired,
  activateDetailsBtn: PropTypes.bool.isRequired,
  activateHeaderLink: PropTypes.bool.isRequired,
};

export default ProjectBlock;
