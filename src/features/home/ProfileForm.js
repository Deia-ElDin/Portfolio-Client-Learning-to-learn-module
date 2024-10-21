import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useCreateProfilePicMutation,
  useUpdateProfilePicMutation,
} from './profileApiSlice';
import { selectUserFormOpacity, setFormOpacity } from '../appSlice';
import { setProfileForm } from '../controls/controlsSlice';
import { selectProfilePicId } from './homeSlice';
import { profileInitialState } from '../helpers/functions/handleInitialState';
import { formStyle } from '../helpers/functions/handleForms';
import OpacitySlider from '../helpers/components/form/slider/OpacitySlider';
import ByeByeIcon from '../helpers/components/form/icons/ByeByeIcon';
import DropFile from '../helpers/components/form/DropFile';
import LoadingComp from '../helpers/components/form/comp/LoadingComp';
import ErrComp from '../helpers/components/form/comp/ErrCom';
import GeneralBtn from '../helpers/components/form/btn/GeneralBtn';

const ProfileForm = () => {
  const [profile, setProfile] = useState(profileInitialState);
  const [errMsg, setErrMsg] = useState(null);
  const [formErr, setFormErr] = useState(false);

  const errMsgRef = useRef(null);

  const profilePicId = useSelector(selectProfilePicId);
  const userFormOpaicty = useSelector(selectUserFormOpacity);
  const dispatch = useDispatch();

  const [createProfilePic, { isLoading: createLoading }] =
    useCreateProfilePicMutation();
  const [updateProfilePic, { isLoading: updateLoading }] =
    useUpdateProfilePicMutation();

  const isLoading = createLoading || updateLoading ? true : false;

  useLayoutEffect(() => {
    errMsgRef.current = errMsg;
  }, [errMsg]);

  useEffect(() => {
    // if there was an err and the user start typing, we reset everything
    if (errMsgRef.current) {
      dispatch(setFormOpacity(userFormOpaicty));
      setErrMsg(null);
      setFormErr(false);
    }
  }, [profile, errMsgRef, userFormOpaicty, dispatch]);

  useEffect(() => {
    setProfile((prev) => ({ ...prev, id: profilePicId ? profilePicId : '' }));
  }, [profilePicId]);

  const handleByeByeClick = () => {
    // reset everything
    if (errMsg) dispatch(setFormOpacity(userFormOpaicty));
    dispatch(setProfileForm(false));
    setProfile(profileInitialState);
    setErrMsg(null);
    setFormErr(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) handleByeByeClick();
  };

  const handleChange = (e) => {
    const { files } = e.target;
    setProfile((prev) => ({ ...prev, profilePic: files[0] }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profilePic', profile.profilePic);
    try {
      await createProfilePic(formData).unwrap();
      dispatch(setProfileForm(false));
      setProfile(profileInitialState);
    } catch (err) {
      handleErrors(err, 'create');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profilePic', profile.profilePic);
    formData.append('profileObj', JSON.stringify(profile));
    try {
      await updateProfilePic(formData).unwrap();
      dispatch(setProfileForm(false));
      setProfile(profileInitialState);
    } catch (err) {
      handleErrors(err, 'update');
    }
  };

  const handleErrors = (err, task) => {
    dispatch(setFormOpacity(1));
    if (err?.error?.includes('fetch')) {
      setErrMsg(`Failed to connect with the server`);
    } else if (err?.data?.msg) {
      const profileErr = err.data.msg;
      setErrMsg(profileErr);
      setFormErr(true);
    } else setErrMsg(`Failed to ${task} the profile pic`);
  };

  const createBtn = <GeneralBtn btnName="Create" handleClick={handleCreate} />;
  const updateBtn = <GeneralBtn btnName="Update" handleClick={handleUpdate} />;

  const formBtn = profilePicId ? updateBtn : createBtn;

  return (
    <form
      className={formErr ? 'profile-form form-err' : 'profile-form'}
      style={formStyle(errMsg, formErr, userFormOpaicty)}
      onKeyDown={handleKeyDown}
      encType="multipart/form-data"
      aria-label="Profile form"
    >
      <OpacitySlider />
      <ByeByeIcon handleClick={handleByeByeClick} />
      <fieldset className="img-fieldset">
        <DropFile
          name="profilePic"
          handleChange={handleChange}
          spanText={profile.profilePic.name}
          autoFocus={true}
        />
      </fieldset>

      {isLoading && <LoadingComp />}
      {errMsg && <ErrComp errMsg={errMsg} />}

      {formBtn}
    </form>
  );
};

export default ProfileForm;
