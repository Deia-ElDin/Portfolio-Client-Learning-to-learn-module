import { useSelector } from 'react-redux';
import { selectSkillForm } from '../../controls/controlsSlice';
import MiniTitle from '../dependencies/MiniTitle';
import SkillForm from './SkillForm';
import SkillsList from './SkillsList';

const Skills = () => {
  const displaySkillForm = useSelector(selectSkillForm);
  return (
    <section className="skills" aria-label="Skills">
      <MiniTitle titleName="Skills" />
      {displaySkillForm && <SkillForm />}
      <SkillsList />
    </section>
  );
};

export default Skills;
