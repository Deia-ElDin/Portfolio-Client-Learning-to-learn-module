import { useSelector, useDispatch } from 'react-redux';
import {
  selectSkillForm,
  toggleSkillForm,
  setSkillForm,
  selectJobForm,
  toggleJobForm,
  setJobForm,
} from '../../controlsSlice';
import {
  selectEditId,
  setEditId,
  selectEditTarget,
  setEditTarget,
} from '../../../appSlice';

const DetailSubs = () => {
  const displaySkillForm = useSelector(selectSkillForm);
  const displayJobForm = useSelector(selectJobForm);
  const editId = useSelector(selectEditId);
  const editTarget = useSelector(selectEditTarget);
  const dispatch = useDispatch();

  const resetEdits = () => {
    if (editId) dispatch(setEditId(null));
    if (editTarget) dispatch(setEditTarget(false));
  };

  const handleSkillBtnClick = (e) => {
    e.stopPropagation();
    resetEdits();
    dispatch(toggleSkillForm());
    if (displayJobForm) dispatch(setJobForm(false));
  };

  const handleJobBtnClick = (e) => {
    e.stopPropagation();
    resetEdits();
    dispatch(toggleJobForm());
    if (displaySkillForm) dispatch(setSkillForm(false));
  };

  return (
    <section>
      <div title="Skill Form" onClick={handleSkillBtnClick}>
        S
      </div>
      <div title="Job Form" onClick={handleJobBtnClick}>
        J
      </div>
    </section>
  );
};

export default DetailSubs;
