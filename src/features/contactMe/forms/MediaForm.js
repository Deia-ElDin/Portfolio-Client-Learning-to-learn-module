import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useCreateMediaMutation,
  useUpdateMediaMutation,
  useDeleteMediaMutation,
} from './mediasApiSlice';
import {
  selectEditId,
  selectEditTarget,
  setEditId,
  setEditTarget,
  selectUserFormOpacity,
  setFormOpacity,
} from '../../appSlice';
import { setMediaForm } from '../../controls/controlsSlice';
import { mediaInitialState } from '../../helpers/functions/handleInitialState';
import { formStyle } from '../../helpers/functions/handleForms';
import OpacitySlider from '../../helpers/components/form/slider/OpacitySlider';
import ByeByeIcon from '../../helpers/components/form/icons/ByeByeIcon';
import General from '../../helpers/components/form/General';
import LoadingComp from '../../helpers/components/form/comp/LoadingComp';
import ErrComp from '../../helpers/components/form/comp/ErrCom';
import GeneralBtn from '../../helpers/components/form/btn/GeneralBtn';

const MediaForm = () => {
  const [media, setMedia] = useState(mediaInitialState);
  const [errMsg, setErrMsg] = useState(null);
  const [mediaNameErr, setMediaNameErr] = useState(false);
  const [mediaSVGLinkErr, setMediaSVGLinkErr] = useState(false);
  const [linkErr, setLinkErr] = useState(false);
  const [formErr, setFormErr] = useState(false);

  const errMsgRef = useRef(null);

  const editId = useSelector(selectEditId);
  const editTarget = useSelector(selectEditTarget);
  const userFormOpaicty = useSelector(selectUserFormOpacity);
  const dispatch = useDispatch();

  const [createMedia, { isLoading: createLoading }] = useCreateMediaMutation();
  const [updateMedia, { isLoading: updateLoading }] = useUpdateMediaMutation();
  const [deleteMedia, { isLoading: deleteLoading }] = useDeleteMediaMutation();

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
  }, [media, errMsgRef, userFormOpaicty, dispatch]);

  useEffect(() => {
    setMedia((prev) => ({ ...prev, id: editId ? editId : '' }));
  }, [editId]);

  const setErrs = (to) => {
    setMediaNameErr(to);
    setMediaSVGLinkErr(to);
    setLinkErr(to);
    setFormErr(to);
  };

  const handleErrors = (err, task) => {
    dispatch(setFormOpacity(1));
    if (err?.error?.includes('fetch')) {
      setErrMsg(`Failed to connect with the server`);
    } else if (err?.data?.msg) {
      const mediaErr = err.data.msg;
      setErrMsg(mediaErr);
      if (mediaErr.includes('provide a social media')) setMediaNameErr(true);
      if (mediaErr.includes('media svg link')) setMediaSVGLinkErr(true);
      if (mediaErr.includes('media link')) setLinkErr(true);
      if (mediaErr === "You can't submit an empty form!") setErrs(true);
      else setFormErr(true);
    } else setErrMsg(`Failed to ${task} the scoial media`);
  };

  const handleByeByeClick = () => {
    // reset everything
    if (editId) dispatch(setEditId(null));
    if (editTarget) dispatch(setEditTarget(null));
    if (errMsg) dispatch(setFormOpacity(userFormOpaicty));
    dispatch(setMediaForm(false));
    setMedia(mediaInitialState);
    setErrMsg(null);
    setErrs(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) handleByeByeClick();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedia((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createMedia({ ...media }).unwrap();
      dispatch(setMediaForm(false));
      setMedia(mediaInitialState);
    } catch (err) {
      handleErrors(err, 'create');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateMedia({ ...media }).unwrap();
      dispatch(setMediaForm(false));
      dispatch(setEditId(null));
      dispatch(setEditTarget(null));
      setMedia(mediaInitialState);
    } catch (err) {
      handleErrors(err, 'update');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMedia(editId).unwrap();
      dispatch(setEditId(null));
      dispatch(setEditTarget(null));
      dispatch(setMediaForm(false));
    } catch (err) {
      if (err?.data?.msg) setErrMsg(err.data.msg);
      else setErrMsg('Failed to delete the social media');
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
      className={formErr ? 'media-form form-err' : 'media-form'}
      style={formStyle(errMsg, formErr, userFormOpaicty)}
      onKeyDown={handleKeyDown}
      aria-label="Media form"
    >
      <OpacitySlider />
      {editTarget && <h3 className="edit-target">{editTarget}</h3>}
      <ByeByeIcon handleClick={handleByeByeClick} />
      <General
        labelName="Social Media:"
        name="name"
        value={media.name}
        handleChange={handleChange}
        autoFocus={true}
        inputErr={mediaNameErr}
      />
      <General
        labelName="SVG Link:"
        name="svgLink"
        value={media.svgLink}
        handleChange={handleChange}
        inputErr={mediaSVGLinkErr}
      />
      <General
        labelName="Link:"
        name="link"
        value={media.link}
        handleChange={handleChange}
        inputErr={linkErr}
      />

      {isLoading && <LoadingComp />}
      {errMsg && <ErrComp errMsg={errMsg} />}

      {formBtn}
    </form>
  );
};

export default MediaForm;
