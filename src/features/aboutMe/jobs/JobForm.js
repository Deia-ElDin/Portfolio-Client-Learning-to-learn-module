import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} from './jobsApiSlice';
import {
  selectEditId,
  selectEditTarget,
  setEditId,
  setEditTarget,
  selectUserFormOpacity,
  setFormOpacity,
} from '../../appSlice';
import { setJobForm } from '../../controls/controlsSlice';
import { selectCountriesData } from '../aboutMeSlice';
import { jobInitialState } from '../../helpers/functions/handleInitialState';
import { formStyle } from '../../helpers/functions/handleForms';
import OpacitySlider from '../../helpers/components/form/slider/OpacitySlider';
import ByeByeIcon from '../../helpers/components/form/icons/ByeByeIcon';
import General from '../../helpers/components/form/General';
import LoadingComp from '../../helpers/components/form/comp/LoadingComp';
import ErrComp from '../../helpers/components/form/comp/ErrCom';
import GeneralBtn from '../../helpers/components/form/btn/GeneralBtn';

const JobForm = () => {
  const [job, setJob] = useState(jobInitialState);
  const [displayCountryFlagInput, setDisplayCountryFlagInput] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const [countryNameErr, setCountryNameErr] = useState(false);
  const [countrySVGLinkErr, setCountrySVGLinkErr] = useState(false);
  const [companyNameErr, setCompanyNameErr] = useState(false);
  const [jobTitleErr, setJobTitleErr] = useState(false);
  const [jobDescriptionErr, setJobDescriptionErr] = useState(false);
  const [startingDateErr, setStartingDateErr] = useState(false);
  const [finishingDateErr, setFinishingDateErr] = useState(false);
  const [formErr, setFormErr] = useState(false);

  const errMsgRef = useRef(null);

  const countries = useSelector(selectCountriesData);

  const editId = useSelector(selectEditId);
  const editTarget = useSelector(selectEditTarget);
  const userFormOpaicty = useSelector(selectUserFormOpacity);
  const dispatch = useDispatch();

  const [createJob, { isLoading: createLoading }] = useCreateJobMutation();
  const [updateJob, { isLoading: updateLoading }] = useUpdateJobMutation();
  const [deleteJob, { isLoading: deleteLoading }] = useDeleteJobMutation();

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
  }, [job, errMsgRef, userFormOpaicty, dispatch]);

  useEffect(() => {
    let gotAMatch = false;

    if (job.countryName && !job.countrySVGLink) {
      countries.forEach((country) => {
        const firstTerm = country.countryName.toLowerCase();
        const secondTerm = job.countryName.toLowerCase();

        if (firstTerm === secondTerm) {
          gotAMatch = true;
          setJob((prev) => ({
            ...prev,
            countrySVGLink: country.countrySVGLink,
          }));
        }

        gotAMatch
          ? setDisplayCountryFlagInput(false)
          : setDisplayCountryFlagInput(true);
      });
    }

    if (!job.countryName) {
      setJob((prev) => ({ ...prev, countrySVGLink: '' }));
      setDisplayCountryFlagInput(true);
    }
  }, [job.countryName, job.countrySVGLink, countries]);

  useEffect(() => {
    setJob((prev) => ({ ...prev, id: editId ? editId : '' }));
  }, [editId]);

  const setErrs = (to) => {
    setCountryNameErr(to);
    setCountrySVGLinkErr(to);
    setCompanyNameErr(to);
    setJobTitleErr(to);
    setJobDescriptionErr(to);
    setStartingDateErr(to);
    setFinishingDateErr(to);
    setFormErr(to);
  };

  const handleErrors = (err, task) => {
    dispatch(setFormOpacity(1));
    if (err?.error?.includes('fetch')) {
      setErrMsg(`Failed to connect with the server`);
    } else if (err?.data?.msg) {
      const jobErr = err.data.msg;
      setErrMsg(jobErr);
      if (jobErr.includes('country name')) setCountryNameErr(true);
      if (jobErr.includes('country flag')) setCountrySVGLinkErr(true);
      if (jobErr.includes('company name')) setCompanyNameErr(true);
      if (jobErr.includes('job title')) setJobTitleErr(true);
      if (jobErr.includes('job description')) setJobDescriptionErr(true);
      if (jobErr.includes('starting date')) setStartingDateErr(true);
      if (jobErr.includes('finishing date')) setFinishingDateErr(true);
      if (jobErr === "You can't submit an empty form!") setErrs(true);
      else setFormErr(true);
    } else setErrMsg(`Failed to ${task} the job`);
  };

  const handleByeByeClick = () => {
    // reset everything
    if (editId) dispatch(setEditId(null));
    if (editTarget) dispatch(setEditTarget(null));
    if (errMsg) dispatch(setFormOpacity(userFormOpaicty));
    dispatch(setJobForm(false));
    setJob(jobInitialState);
    setErrMsg(null);
    setErrs(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) handleByeByeClick();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createJob({ ...job }).unwrap();
      dispatch(setJobForm(false));
      setJob(jobInitialState);
    } catch (err) {
      handleErrors(err, 'create');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateJob({ ...job }).unwrap();
      dispatch(setJobForm(false));
      dispatch(setEditId(null));
      dispatch(setEditTarget(null));
      setJob(jobInitialState);
    } catch (err) {
      handleErrors(err, 'update');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteJob(editId).unwrap();
      dispatch(setEditId(null));
      dispatch(setEditTarget(null));
      dispatch(setJobForm(false));
    } catch (err) {
      if (err?.data?.msg) setErrMsg(err.data.msg);
      else setErrMsg('Failed to delete the job');
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
      className={formErr ? 'job-form form-err' : 'job-form'}
      style={formStyle(errMsg, formErr, userFormOpaicty)}
      onKeyDown={handleKeyDown}
      aria-label="Job form"
    >
      <OpacitySlider />
      {editTarget && <h3 className="edit-target">{editTarget}</h3>}
      <ByeByeIcon handleClick={handleByeByeClick} />
      <fieldset className="country-fieldset">
        <General
          labelName="Country Name:"
          name="countryName"
          value={job.countryName}
          handleChange={handleChange}
          autoFocus={true}
          inputErr={countryNameErr}
        />
        {displayCountryFlagInput && (
          <General
            labelName="Country Flag:"
            name="countrySVGLink"
            value={job.countrySVGLink}
            handleChange={handleChange}
            inputErr={countrySVGLinkErr}
          />
        )}
      </fieldset>

      <fieldset className="company-fieldset">
        <General
          labelName="Company Name:"
          name="companyName"
          value={job.companyName}
          handleChange={handleChange}
          inputErr={companyNameErr}
        />
        <General
          labelName="Job Title:"
          name="jobTitle"
          value={job.jobTitle}
          handleChange={handleChange}
          inputErr={jobTitleErr}
        />
      </fieldset>

      <General
        labelName="Job Description:"
        name="jobDescription"
        value={job.jobDescription}
        handleChange={handleChange}
        inputErr={jobDescriptionErr}
      />

      <fieldset className="date-fieldset">
        <General
          labelName="Starting Date:"
          name="startingDate"
          value={job.startingDate}
          handleChange={handleChange}
          inputErr={startingDateErr}
        />
        <General
          labelName="Finishing Date:"
          name="finishingDate"
          value={job.finishingDate}
          handleChange={handleChange}
          inputErr={finishingDateErr}
        />
      </fieldset>

      {isLoading && <LoadingComp />}
      {errMsg && <ErrComp errMsg={errMsg} />}

      {formBtn}
    </form>
  );
};

export default JobForm;
