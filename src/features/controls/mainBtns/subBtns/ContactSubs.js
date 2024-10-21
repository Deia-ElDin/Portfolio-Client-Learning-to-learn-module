import { useSelector, useDispatch } from 'react-redux';
import {
  selectEditId,
  setEditId,
  selectEditTarget,
  setEditTarget,
} from '../../../appSlice';
import {
  selectContactForm,
  toggleContactForm,
  setContactForm,
  selectMediaForm,
  toggleMediaForm,
  setMediaForm,
} from '../../controlsSlice';

const ContactSubs = () => {
  const displayContactForm = useSelector(selectContactForm);
  const displayMediaForm = useSelector(selectMediaForm);
  const editId = useSelector(selectEditId);
  const editTarget = useSelector(selectEditTarget);
  const dispatch = useDispatch();

  const resetEdits = () => {
    if (editId) dispatch(setEditId(null));
    if (editTarget) dispatch(setEditTarget(false));
  };

  const handleContactBtnClick = (e) => {
    e.stopPropagation();
    resetEdits();
    dispatch(toggleContactForm());
    if (displayMediaForm) dispatch(setMediaForm(false));
  };

  const handleMediaBtnClick = (e) => {
    e.stopPropagation();
    resetEdits();
    dispatch(toggleMediaForm());
    if (displayContactForm) dispatch(setContactForm(false));
  };

  return (
    <section>
      <div title="Contact Form" onClick={handleContactBtnClick}>
        C
      </div>
      <div title="Media Form" onClick={handleMediaBtnClick}>
        M
      </div>
    </section>
  );
};

export default ContactSubs;
