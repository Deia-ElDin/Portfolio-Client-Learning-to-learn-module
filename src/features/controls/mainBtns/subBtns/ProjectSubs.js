import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectProjectForm,
  toggleProjectForm,
  setProjectForm,
  selectFetchForm,
  toggleFetchForm,
  setFetchForm,
} from '../../controlsSlice';

const ProjectSubs = () => {
  const displayProjectForm = useSelector(selectProjectForm);
  const displayFetchForm = useSelector(selectFetchForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProjectBtnClick = (e) => {
    e.stopPropagation();
    dispatch(toggleProjectForm());
    if (displayFetchForm) dispatch(setFetchForm(false));
  };

  const handleFetchBtnClick = (e) => {
    e.stopPropagation();
    navigate('portfolio');
    dispatch(toggleFetchForm());
    if (displayProjectForm) dispatch(setProjectForm(false));
  };

  return (
    <section>
      <div title="Project Form" onClick={handleProjectBtnClick}>
        P
      </div>
      <div title="Fetch Form" onClick={handleFetchBtnClick}>
        F
      </div>
    </section>
  );
};

export default ProjectSubs;
