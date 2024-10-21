import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setEditId, setEditTarget, setIsEdditting } from '../../../../appSlice';
import {
  selectSkillForm,
  setSkillForm,
  selectJobForm,
  setJobForm,
  setProjectForm,
  toggleProjectForm,
  selectContactForm,
  setContactForm,
  selectMediaForm,
  setMediaForm,
} from '../../../../controls/controlsSlice';
import { BsThreeDotsVertical } from 'react-icons/bs';
import PropTypes from 'prop-types';

const EditBtn = ({ id, editId, editTarget }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const displaySkillForm = useSelector(selectSkillForm);
  const displayJobForm = useSelector(selectJobForm);
  const displayContactForm = useSelector(selectContactForm);
  const displayMediaForm = useSelector(selectMediaForm);

  const handleClick = () => {
    dispatch(setEditId(editId));
    // with the projectForm we don't provide an edit target
    // because we navigate to (`/portfolio/${editId}`), so we are already in that project page
    // but with any other form we still in the related page so we need to provide an editTarget
    if (editTarget) dispatch(setEditTarget(editTarget));

    if (pathname === '/aboutMe') {
      if (id === 'skills') {
        if (!displaySkillForm) dispatch(setSkillForm(true));
        if (displayJobForm) dispatch(setJobForm(false));
      }
      if (id === 'jobs') {
        if (!displayJobForm) dispatch(setJobForm(true));
        if (displaySkillForm) dispatch(setSkillForm(false));
      }
    } else if (pathname.includes('/portfolio')) {
      if (pathname === '/portfolio') {
        navigate(editId);
        dispatch(setProjectForm(true));
        dispatch(setIsEdditting(true));
      } else {
        dispatch(toggleProjectForm());
        dispatch(setIsEdditting(true));
      }
    } else if (pathname === '/contactMe') {
      if (id === 'contacts' && !displayContactForm) {
        if (!displayContactForm) dispatch(setContactForm(true));
        if (displayMediaForm) dispatch(setMediaForm(false));
      }
      if (id === 'medias') {
        if (!displayMediaForm) dispatch(setMediaForm(true));
        if (displayContactForm) dispatch(setContactForm(false));
      }
    }
  };

  return (
    <button className="edit-btn" onClick={handleClick} aria-label="Edit button">
      <i>
        <BsThreeDotsVertical />
      </i>
    </button>
  );
};

EditBtn.propTypes = {
  id: PropTypes.string,
  editId: PropTypes.string.isRequired,
  editTarget: PropTypes.string,
};

export default EditBtn;
