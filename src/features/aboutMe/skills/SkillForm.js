import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} from './skillsApiSlice';
import {
  selectEditId,
  selectEditTarget,
  setEditId,
  setEditTarget,
  selectUserFormOpacity,
  setFormOpacity,
} from '../../appSlice';
import { setSkillForm } from '../../controls/controlsSlice';
import { skillInitialState } from '../../helpers/functions/handleInitialState';
import { formStyle } from '../../helpers/functions/handleForms';
import OpacitySlider from '../../helpers/components/form/slider/OpacitySlider';
import ByeByeIcon from '../../helpers/components/form/icons/ByeByeIcon';
import General from '../../helpers/components/form/General';
import LoadingComp from '../../helpers/components/form/comp/LoadingComp';
import ErrComp from '../../helpers/components/form/comp/ErrCom';
import GeneralBtn from '../../helpers/components/form/btn/GeneralBtn';

const SkillForm = () => {
  const [skill, setSkill] = useState(skillInitialState);
  const [errMsg, setErrMsg] = useState(null);
  const [nameErr, setNameErr] = useState(false);
  const [svgLinkErr, setSvgLinkErr] = useState(false);
  const [percentageErr, setPercentageErr] = useState(false);
  const [formErr, setFormErr] = useState(false);

  const errMsgRef = useRef(null);

  const editId = useSelector(selectEditId);
  const editTarget = useSelector(selectEditTarget);
  const userFormOpaicty = useSelector(selectUserFormOpacity);
  const dispatch = useDispatch();

  const [createSkill, { isLoading: createLoading }] = useCreateSkillMutation();
  const [updateSkill, { isLoading: updateLoading }] = useUpdateSkillMutation();
  const [deleteSkill, { isLoading: deleteLoading }] = useDeleteSkillMutation();

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
  }, [skill, errMsgRef, userFormOpaicty, dispatch]);

  useEffect(() => {
    setSkill((prev) => ({ ...prev, id: editId ? editId : '' }));
  }, [editId]);

  const setErrs = (to) => {
    setNameErr(to);
    setSvgLinkErr(to);
    setPercentageErr(to);
    setFormErr(to);
  };

  const handleErrors = (err, task) => {
    dispatch(setFormOpacity(1));
    if (err?.error?.includes('fetch')) {
      setErrMsg(`Failed to connect with the server`);
    } else if (err?.data?.msg) {
      const skillErr = err.data.msg;
      setErrMsg(skillErr);
      if (skillErr.includes('technology name')) setNameErr(true);
      if (skillErr.includes('technology svg link')) setSvgLinkErr(true);
      if (skillErr.includes('percentage')) setPercentageErr(true);
      if (skillErr === "You can't submit an empty form!") setErrs(true);
      else setFormErr(true);
    } else setErrMsg(`Failed to ${task} the skill`);
  };

  const handleByeByeClick = () => {
    // reset everything
    if (editId) dispatch(setEditId(null));
    if (editTarget) dispatch(setEditTarget(null));
    if (errMsg) dispatch(setFormOpacity(userFormOpaicty));
    dispatch(setSkillForm(false));
    setSkill(skillInitialState);
    setErrMsg(null);
    setErrs(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) handleByeByeClick();
  };

  const handleChange = (e) => {
    let { name, type, value } = e.target;

    if (type === 'number') {
      if (value > 100) value = 100;
      else if (value < 0) value = '';
    }

    setSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createSkill({ ...skill }).unwrap();
      dispatch(setSkillForm(false));
      setSkill(skillInitialState);
    } catch (err) {
      handleErrors(err, 'create');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateSkill({ ...skill }).unwrap();
      dispatch(setSkillForm(false));
      dispatch(setEditId(null));
      dispatch(setEditTarget(null));
      setSkill(skillInitialState);
    } catch (err) {
      handleErrors(err, 'update');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSkill(editId).unwrap();
      dispatch(setEditId(null));
      dispatch(setEditTarget(null));
      dispatch(setSkillForm(false));
    } catch (err) {
      if (err?.data?.msg) setErrMsg(err.data.msg);
      else setErrMsg('Failed to delete the skill');
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
      className={formErr ? 'skill-form form-err' : 'skill-form'}
      style={formStyle(errMsg, formErr, userFormOpaicty)}
      onKeyDown={handleKeyDown}
      aria-label="Skill form"
    >
      <OpacitySlider />
      {editTarget && <h3 className="edit-target">{editTarget}</h3>}
      <ByeByeIcon handleClick={handleByeByeClick} />
      <General
        labelName="Skill Name:"
        name="name"
        value={skill.name}
        handleChange={handleChange}
        autoFocus={true}
        inputErr={nameErr}
      />
      <General
        labelName="SVG Link:"
        name="svgLink"
        value={skill.svgLink}
        handleChange={handleChange}
        inputErr={svgLinkErr}
      />
      <General
        labelName="Percentage:"
        type="number"
        name="percentage"
        value={skill.percentage}
        handleChange={handleChange}
        inputErr={percentageErr}
      />

      {isLoading && <LoadingComp />}
      {errMsg && <ErrComp errMsg={errMsg} />}

      {formBtn}
    </form>
  );
};

export default SkillForm;
