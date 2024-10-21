import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from '../projects/projectsApiSlice';
import {
  selectEditId,
  setEditId,
  selectUserFormOpacity,
  setFormOpacity,
  selectIsEdditting,
  setIsEdditting,
} from '../../appSlice';
import { setProjectForm } from '../../controls/controlsSlice';
import { selectSkillsData } from '../../aboutMe/aboutMeSlice';
import { selectBrowsersData } from '../portfolioSlice';
import {
  projectInitialState,
  switchBtnsInitialState,
  techInitialState,
  testInitialState,
} from '../../helpers/functions/handleInitialState';
import { formStyle } from '../../helpers/functions/handleForms';
import OpacitySlider from '../../helpers/components/form/slider/OpacitySlider';
import ByeByeIcon from '../../helpers/components/form/icons/ByeByeIcon';
import SwitchBtns from '../../helpers/components/form/SwitchBtns';
import General from '../../helpers/components/form/General';
import CheckBox from '../../helpers/components/form/CheckBox';
import MultiInputs from '../../helpers/components/form/MultiInputs';
import DropFile from '../../helpers/components/form/DropFile';
import LoadingComp from '../../helpers/components/form/comp/LoadingComp';
import ErrComp from '../../helpers/components/form/comp/ErrCom';
import GeneralBtn from '../../helpers/components/form/btn/GeneralBtn';

const ProjectForm = () => {
  const editId = useSelector(selectEditId);

  const [project, setProject] = useState(() => projectInitialState(editId));
  const [switchBtns, setSwitchBtns] = useState(switchBtnsInitialState);
  const [techValues, setTechValues] = useState([]);
  const [testValues, setTestValues] = useState([]);
  const [errMsg, setErrMsg] = useState(null);
  const [projectNameErr, setProjectNameErr] = useState(false);
  const [ratingErr, setRatingErr] = useState(false);
  const [technologiesErr, setTechnologiesErr] = useState(false);
  const [startingDateErr, setStartingDateErr] = useState(false);
  const [finishingDateErr, setFinishingDateErr] = useState(false);
  const [formErr, setFormErr] = useState(false);

  const errMsgRef = useRef(null);

  const isEdditting = useSelector(selectIsEdditting);
  const userFormOpaicty = useSelector(selectUserFormOpacity);
  const skillsData = useSelector(selectSkillsData);
  const browserData = useSelector(selectBrowsersData);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [createProject, { isLoading: createLoading }] =
    useCreateProjectMutation();
  const [updateProject, { isLoading: updateLoading }] =
    useUpdateProjectMutation();
  const [deleteProject, { isLoading: deleteLoading }] =
    useDeleteProjectMutation();

  const isLoading =
    createLoading || updateLoading || deleteLoading ? true : false;

  useLayoutEffect(() => {
    errMsgRef.current = errMsg ? true : false;
  }, [errMsg]);

  useEffect(() => {
    // if there was an err and the user start typing, we reset everything
    if (errMsgRef.current) {
      dispatch(setFormOpacity(userFormOpaicty));
      setErrMsg(null);
      setErrs(false);
    }
  }, [project, errMsgRef, userFormOpaicty, dispatch]);

  useEffect(() => {
    setTechValues(techInitialState(skillsData));
    setTestValues(testInitialState(browserData));
  }, [skillsData, browserData]);

  useEffect(() => {
    if (pathname === '/portfolio' && isEdditting) {
      dispatch(setProjectForm(false));
      dispatch(setIsEdditting(false));
      dispatch(setEditId(null));
    }
  }, [pathname, isEdditting, editId, dispatch]);

  useEffect(() => {
    setProject((prev) => ({ ...prev, id: editId ? editId : '' }));
  }, [editId]);

  const setErrs = (to) => {
    setProjectNameErr(to);
    setRatingErr(to);
    setTechnologiesErr(to);
    setStartingDateErr(to);
    setFinishingDateErr(to);
    setFormErr(to);
  };

  const handleErrors = (err, task) => {
    dispatch(setFormOpacity(1));
    if (err?.error?.includes('fetch')) {
      setErrMsg(`Failed to connect with the server`);
    } else if (err?.data?.msg) {
      const projectErr = err.data.msg;
      setErrMsg(projectErr);
      if (projectErr.includes('project name')) setProjectNameErr(true);
      if (projectErr.includes('project rating')) setRatingErr(true);
      if (projectErr.includes('project technologies')) setTechnologiesErr(true);
      if (projectErr.includes('Must be a number')) setTechnologiesErr(true);
      if (projectErr.includes('starting date')) setStartingDateErr(true);
      if (projectErr.includes('finishing date')) setFinishingDateErr(true);
      if (projectErr === "You can't submit an empty form!") setErrs(true);
      else setFormErr(true);
    } else setErrMsg(`Failed to ${task} the project`);
  };

  const handleByeByeClick = () => {
    // reset everything
    if (errMsg) dispatch(setFormOpacity(userFormOpaicty));
    dispatch(setProjectForm(false));
    setProject(projectInitialState(editId));
    setSwitchBtns(switchBtnsInitialState);
    setTechValues(techInitialState(skillsData));
    setTestValues(testInitialState(browserData));
    setErrMsg(null);
    setErrs(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) handleByeByeClick();
  };

  const handleSwitchBtnsChange = (e) => {
    const { name, checked } = e.target;
    setSwitchBtns({
      img: false,
      tech: false,
      ui: false,
      server: false,
      test: false,
      [name]: checked,
    });
  };

  const handleChange = (e) => {
    let { type, name, value, checked, files } = e.target;

    if (type === 'number') {
      if (value > 5) value = 5;
      else if (value < 0) value = '';
    }

    setProject((prev) => {
      return {
        ...prev,
        [name]:
          type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
      };
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('projectImg', project.projectImg);
    formData.append('projectObj', JSON.stringify(project));
    try {
      await createProject(formData).unwrap();
      setProject(projectInitialState);
      setSwitchBtns(switchBtnsInitialState);
      setTechValues(techInitialState(skillsData));
      setTestValues(testInitialState(browserData));
      dispatch(setProjectForm(false));
    } catch (err) {
      handleErrors(err, 'create');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (project.projectImg) formData.append('projectImg', project.projectImg);
    formData.append('projectObj', JSON.stringify(project));
    try {
      await updateProject(formData).unwrap();
      dispatch(setProjectForm(false));
      setProject(projectInitialState(editId));
      setSwitchBtns(switchBtnsInitialState);
      setTechValues(techInitialState(skillsData));
      setTestValues(testInitialState(browserData));
    } catch (err) {
      handleErrors(err, 'update');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProject(editId).unwrap();
      dispatch(setProjectForm(false));
      navigate('/portfolio');
    } catch (err) {
      if (err?.data?.msg) setErrMsg(err.data.msg);
      else setErrMsg('Failed to delete the project');
    }
  };

  const createBtn = <GeneralBtn btnName="Create" handleClick={handleCreate} />;
  const updateAndDeleteBtns = (
    <section className="update-delete-btns-section">
      <GeneralBtn btnName="Update" handleClick={handleUpdate} />
      <GeneralBtn btnName="Delete" handleDoubleClick={handleDelete} />
    </section>
  );

  const formBtn = editId ? updateAndDeleteBtns : createBtn;

  return (
    <form
      className={formErr ? 'project-form form-err' : 'project-form'}
      style={formStyle(errMsg, formErr, userFormOpaicty)}
      onKeyDown={handleKeyDown}
      encType="multipart/form-data"
      aria-label="Project form"
    >
      <OpacitySlider />
      <ByeByeIcon handleClick={handleByeByeClick} />
      <General
        labelName="Project Name:"
        name="projectName"
        value={project.projectName}
        handleChange={handleChange}
        autoFocus={true}
        inputErr={projectNameErr}
      />
      <fieldset className="details-fieldset">
        <CheckBox
          labelName="Commercial"
          type="checkbox"
          name="commercial"
          checked={project.commercial}
          handleChange={handleChange}
        />
        <CheckBox
          labelName="Responsive"
          type="checkbox"
          name="responsive"
          checked={project.responsive}
          handleChange={handleChange}
        />
        <General
          labelName="Rating:"
          type="number"
          name="rating"
          value={project.rating}
          handleChange={handleChange}
          inputErr={ratingErr}
        />
      </fieldset>
      <fieldset className="date-fieldset">
        <General
          labelName="Starting Date:"
          name="startingDate"
          value={project.startingDate}
          handleChange={handleChange}
          inputErr={startingDateErr}
        />
        <General
          labelName="Finishing Date:"
          name="finishingDate"
          value={project.finishingDate}
          handleChange={handleChange}
          inputErr={finishingDateErr}
        />
      </fieldset>
      <SwitchBtns
        switchBtns={switchBtns}
        handleSwitchBtnsChange={handleSwitchBtnsChange}
      />
      {switchBtns.img && (
        <fieldset className="img-fieldset">
          <DropFile
            name="projectImg"
            handleChange={handleChange}
            spanText={project.projectImg.name}
          />
        </fieldset>
      )}
      {switchBtns.tech && (
        <fieldset className="tech-fieldset">
          <MultiInputs
            target="technologies"
            data={skillsData}
            type="number"
            inputValues={techValues}
            setInputValues={setTechValues}
            setTheState={setProject}
            inputErr={technologiesErr}
          />
        </fieldset>
      )}
      {switchBtns.ui && (
        <fieldset className="ui-fieldset">
          <General
            labelName="Live Demo Link:"
            name="uiLiveDemoLink"
            value={project.uiLiveDemoLink}
            handleChange={handleChange}
          />
          <General
            labelName="Download Link:"
            name="uiDownloadLink"
            value={project.uiDownloadLink}
            handleChange={handleChange}
          />
          <General
            labelName="Package Json:"
            name="uiPackageJson"
            value={project.uiPackageJson}
            handleChange={handleChange}
          />
        </fieldset>
      )}
      {switchBtns.server && (
        <fieldset className="server-fieldset">
          <General
            labelName="Live Demo Link:"
            name="serverLiveDemoLink"
            value={project.serverLiveDemoLink}
            handleChange={handleChange}
          />
          <General
            labelName="Download Link:"
            name="serverDownloadLink"
            value={project.serverDownloadLink}
            handleChange={handleChange}
          />
          <General
            labelName="Package Json:"
            name="serverPackageJson"
            value={project.serverPackageJson}
            handleChange={handleChange}
          />
        </fieldset>
      )}
      {switchBtns.test && (
        <fieldset className="test-fieldset">
          <MultiInputs
            target="testedWith"
            data={browserData}
            type="checkbox"
            inputValues={testValues}
            setInputValues={setTestValues}
            setTheState={setProject}
          />
        </fieldset>
      )}
      {isLoading && <LoadingComp />}
      {errMsg && <ErrComp errMsg={errMsg} />}
      {formBtn}
    </form>
  );
};

export default ProjectForm;
