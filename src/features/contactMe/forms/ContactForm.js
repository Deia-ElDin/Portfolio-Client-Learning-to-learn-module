import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from './contactsApiSlice';
import {
  selectEditId,
  selectEditTarget,
  setEditId,
  setEditTarget,
  selectUserFormOpacity,
  setFormOpacity,
} from '../../appSlice';
import { setContactForm } from '../../controls/controlsSlice';
import { contactInitialState } from '../../helpers/functions/handleInitialState';
import { formStyle } from '../../helpers/functions/handleForms';
import OpacitySlider from '../../helpers/components/form/slider/OpacitySlider';
import ByeByeIcon from '../../helpers/components/form/icons/ByeByeIcon';
import General from '../../helpers/components/form/General';
import LoadingComp from '../../helpers/components/form/comp/LoadingComp';
import ErrComp from '../../helpers/components/form/comp/ErrCom';
import GeneralBtn from '../../helpers/components/form/btn/GeneralBtn';

const ContactForm = () => {
  const [contact, setContact] = useState(contactInitialState);
  const [errMsg, setErrMsg] = useState(null);
  const [contactNameErr, setContactNameErr] = useState(false);
  const [contactSVGLinkErr, setContactSVGLinkErr] = useState(false);
  const [infoErr, setInfoErr] = useState(false);
  const [formErr, setFormErr] = useState(false);

  const errMsgRef = useRef(null);

  const editId = useSelector(selectEditId);
  const editTarget = useSelector(selectEditTarget);
  const userFormOpaicty = useSelector(selectUserFormOpacity);
  const dispatch = useDispatch();

  const [createContact, { isLoading: createLoading }] =
    useCreateContactMutation();
  const [updateContact, { isLoading: updateLoading }] =
    useUpdateContactMutation();
  const [deleteContact, { isLoading: deleteLoading }] =
    useDeleteContactMutation();

  const isLoading =
    createLoading || updateLoading || deleteLoading ? true : false;

  useLayoutEffect(() => {
    errMsgRef.current = errMsg;
  }, [errMsg]);

  useEffect(() => {
    // if there was an err and the user start typing, we reset everything
    if (errMsgRef.current) {
      dispatch(setFormOpacity(userFormOpaicty));
      setErrMsg(null);
      setErrs(false);
    }
  }, [contact, errMsgRef, userFormOpaicty, dispatch]);

  useEffect(() => {
    setContact((prev) => ({ ...prev, id: editId ? editId : '' }));
  }, [editId]);

  const setErrs = (to) => {
    setContactNameErr(to);
    setContactSVGLinkErr(to);
    setInfoErr(to);
    setFormErr(to);
  };

  const handleErrors = (err, task) => {
    dispatch(setFormOpacity(1));
    if (err?.error?.includes('fetch')) {
      setErrMsg(`Failed to connect with the server`);
    } else if (err?.data?.msg) {
      const contactErr = err.data.msg;
      setErrMsg(contactErr);
      if (contactErr.includes('a contact')) setContactNameErr(true);
      if (contactErr.includes('contact svg link')) setContactSVGLinkErr(true);
      if (contactErr.includes('contact information')) setInfoErr(true);
      if (contactErr === "You can't submit an empty form!") setErrs(true);
      else setFormErr(true);
    } else setErrMsg(`Failed to ${task} the contact`);
  };

  const handleByeByeClick = () => {
    // reset everything
    if (editId) dispatch(setEditId(null));
    if (editTarget) dispatch(setEditTarget(null));
    if (errMsg) dispatch(setFormOpacity(userFormOpaicty));
    dispatch(setContactForm(false));
    setContact(contactInitialState);
    setErrMsg(null);
    setErrs(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) handleByeByeClick();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createContact({ ...contact }).unwrap();
      dispatch(setContactForm(false));
      setContact(contactInitialState);
    } catch (err) {
      handleErrors(err, 'create');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateContact({ ...contact }).unwrap();
      dispatch(setContactForm(false));
      dispatch(setEditId(null));
      dispatch(setEditTarget(null));
      setContact(contactInitialState);
    } catch (err) {
      handleErrors(err, 'update');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteContact(editId).unwrap();
      dispatch(setEditId(null));
      dispatch(setEditTarget(null));
      dispatch(setContactForm(false));
    } catch (err) {
      if (err?.data?.msg) setErrMsg(err.data.msg);
      else setErrMsg('Failed to delete the contact');
    }
  };

  const createBtn = <GeneralBtn btnName="Create" handleClick={handleCreate} />;
  const updateAndDeleteBtns = (
    <section className="update-delete-btns-section">
      <GeneralBtn btnName="Update" handleClick={handleUpdate} />
      <GeneralBtn btnName="Delete" handleDoubleClick={handleDelete} />
    </section>
  );

  const formBtn = editId && editTarget ? updateAndDeleteBtns : createBtn;

  return (
    <form
      className={formErr ? 'contact-form form-err' : 'contact-form'}
      style={formStyle(errMsg, formErr, userFormOpaicty)}
      onKeyDown={handleKeyDown}
      aria-label="Contact form"
    >
      <OpacitySlider />
      {editTarget && <h3 className="edit-target">{editTarget}</h3>}
      <ByeByeIcon handleClick={handleByeByeClick} />
      <General
        labelName="Contact:"
        name="name"
        value={contact.name}
        handleChange={handleChange}
        autoFocus={true}
        inputErr={contactNameErr}
      />
      <General
        labelName="SVG Link:"
        name="svgLink"
        value={contact.svgLink}
        handleChange={handleChange}
        inputErr={contactSVGLinkErr}
      />
      <General
        labelName="Info:"
        name="info"
        value={contact.info}
        handleChange={handleChange}
        inputErr={infoErr}
      />

      {isLoading && <LoadingComp />}
      {errMsg && <ErrComp errMsg={errMsg} />}

      {formBtn}
    </form>
  );
};

export default ContactForm;
