import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  btns,
  mirrors,
  mainBtnsInitialState,
  secondaryBtnsInitialState,
} from '../helpers/functions/handleInitialState';
import { selectUsername } from '../auth/authSlice';
import {
  selectEditId,
  setEditId,
  selectUserFormOpacity,
  setFormOpacity,
} from '../appSlice';
import {
  selectProfileForm,
  toggleProfileForm,
  setProfileForm,
  selectLoginForm,
  toggleLoginForm,
  setLoginForm,
  selectSkillForm,
  selectJobForm,
  setSkillForm,
  setJobForm,
  selectProjectForm,
  setProjectForm,
  selectFetchForm,
  setFetchForm,
  selectContactForm,
  setContactForm,
  selectMediaForm,
  setMediaForm,
} from './controlsSlice';
import ControlBtn from './mainBtns/ControlBtn';

const Controls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // in case the user refresh the page (NOT NAVIGATE) while he's on any other page but not home
  const { pathname } = location;
  const currentLocation = pathname.substring(1);
  const activeBtnInitialState = currentLocation ? currentLocation : 'home';

  const [userLoggedIn, setUserLoggedIn] = useState('pending');
  const [activeBtn, setActiveBtn] = useState(activeBtnInitialState);
  const [activateDetailSubs, setActivateDetailSubs] = useState(false);
  const [activateProjectSubs, setActivateProjectSubs] = useState(false);
  const [activateContactSubs, setActivateContactSubs] = useState(false);
  const [mainBtns, setMainBtns] = useState(mainBtnsInitialState);
  const [renderMainBtns, setRenderMainBtns] = useState([]);
  const [secondaryBtns, setSecondaryBtns] = useState(secondaryBtnsInitialState);
  const [renderSecondaryBtns, setRenderSecondaryBtns] = useState([]);

  const username = useSelector(selectUsername);
  const userFormOpacity = useSelector(selectUserFormOpacity);

  const displayLoginForm = useSelector(selectLoginForm);
  const displayProfileForm = useSelector(selectProfileForm);
  const displaySkillForm = useSelector(selectSkillForm);
  const displayJobForm = useSelector(selectJobForm);
  const displayProjectForm = useSelector(selectProjectForm);
  const displayFetchForm = useSelector(selectFetchForm);
  const displayContactForm = useSelector(selectContactForm);
  const displayMediaForm = useSelector(selectMediaForm);
  const editId = useSelector(selectEditId);

  const handleClick = (btnName) => {
    // ====================== Cleaning ====================== //
    // if the user clicked on any editBtn then clicked on any other section (without closing that form)
    if (editId) dispatch(setEditId(null));

    // if there was an err then clicked on any other section (without closing that form)
    dispatch(setFormOpacity(userFormOpacity));

    // ====================== Rearrange the lists ====================== //
    // step1: checking if the clickedBtn exist on the mainBtns, if not, do the following
    // step2: find that btn mirror (ex login => logout)
    // step3: switching positions of the 2 btns between the 2 different lists (main & secondary)
    const clickedBtn = btnName;
    if (!mainBtns.includes(clickedBtn)) {
      const mirrorBtn = mirrors
        .find((arr) => arr.includes(clickedBtn))
        .find((btn) => btn !== clickedBtn);

      setMainBtns((prev) =>
        prev.map((btn) => (btn === mirrorBtn ? clickedBtn : btn))
      );

      setSecondaryBtns((prev) =>
        prev.map((btn) => (btn === clickedBtn ? mirrorBtn : btn))
      );
    }

    const handleSubs = ({ detailSubs, projectSubs, contactSubs }) => {
      if (detailSubs && activateDetailSubs) setActivateDetailSubs(false);
      if (projectSubs && activateProjectSubs) setActivateProjectSubs(false);
      if (contactSubs && activateContactSubs) setActivateContactSubs(false);
    };

    const handleSets = (page, btn) => {
      navigate(page);
      setActiveBtn(btn);

      if (btn === 'details') {
        setActivateDetailSubs(!activateDetailSubs);
        handleSubs({ projectSubs: true, contactSubs: true });
      } else if (btn === 'project') {
        setActivateProjectSubs(!activateProjectSubs);
        handleSubs({ detailSubs: true, contactSubs: true });
      } else if (btn === 'contacts') {
        setActivateContactSubs(!activateContactSubs);
        handleSubs({ detailSubs: true, projectSubs: true });
      } else {
        handleSubs({
          detailSubs: true,
          projectSubs: true,
          contactSubs: true,
        });
      }
    };

    if (btnName === 'login') {
      navigate('home');
      setActiveBtn('home');
      dispatch(setProfileForm(false));
      dispatch(toggleLoginForm());
      handleSubs({
        detailSubs: true,
        projectSubs: true,
        contactSubs: true,
      });
    } else if (btnName === 'profile') {
      navigate('home');
      setActiveBtn('profile');
      dispatch(setLoginForm(false));
      dispatch(toggleProfileForm());
      handleSubs({
        detailSubs: true,
        projectSubs: true,
        contactSubs: true,
      });
    } else if (btnName === 'details') handleSets('aboutMe', 'details');
    else if (btnName === 'project') handleSets('portfolio', 'project');
    else if (btnName === 'contacts') handleSets('contactMe', 'contacts');
    else handleSets(btnName, btnName);
  };

  const renderControlBtn = (btnName, btnIcon) => (
    <ControlBtn
      key={btnName}
      btnName={btnName}
      btnIcon={btnIcon}
      activeBtn={activeBtn}
      username={username}
      displayLoginForm={displayLoginForm}
      handleClick={handleClick}
      activateDetailSubs={activateDetailSubs}
      activateProjectSubs={activateProjectSubs}
      activateContactSubs={activateContactSubs}
    />
  );

  useEffect(() => {
    if (pathname !== '/home') {
      if (displayLoginForm) dispatch(setLoginForm(false));
      if (displayProfileForm) dispatch(setProfileForm(false));
    }
    if (pathname === '/home' && activeBtn === 'home') {
      if (displayProfileForm) dispatch(setProfileForm(false));
    }
    if (pathname !== '/aboutMe') {
      if (displaySkillForm) dispatch(setSkillForm(false));
      if (displayJobForm) dispatch(setJobForm(false));
    }
    if (!pathname.includes('/portfolio')) {
      if (displayProjectForm) dispatch(setProjectForm(false));
      if (displayFetchForm) dispatch(setFetchForm(false));
    }
    if (pathname !== '/contactMe') {
      if (displayContactForm) dispatch(setContactForm(false));
      if (displayMediaForm) dispatch(setMediaForm(false));
    }
  }, [
    pathname,
    activeBtn,
    displayLoginForm,
    displayProfileForm,
    displaySkillForm,
    displayJobForm,
    displayProjectForm,
    displayFetchForm,
    displayContactForm,
    displayMediaForm,
    dispatch,
  ]);

  useEffect(() => {
    // Note: we need the userLoggedIn state as a reference,
    //       we CAN NOT use the username as the only reference,
    //       because initially we don't have a username

    // user logged in
    if (username) setUserLoggedIn('logged in');
    // user logged out
    else if (userLoggedIn === 'logged in' && !username) {
      setUserLoggedIn('pending');
      setActiveBtn('home');
      setMainBtns(mainBtnsInitialState);
      setSecondaryBtns(secondaryBtnsInitialState);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    //Note: 1- in login case we navigate to 'home' and we set the active btn also to 'home'
    //         here i'm checking (if the user clicked on any btn but login then we do the following)
    //      2- the login got it's own class (active-login)
    //      3- the goal is to give both active classes (active-btn) to home and (active-login) to
    //         login in case the use clicked on the login btn

    setRenderMainBtns(
      btns
        .filter((btn) => mainBtns.includes(btn.name))
        .map((btn) => renderControlBtn(btn.name, btn.icon))
    );

    setRenderSecondaryBtns(
      btns
        .filter((btn) => secondaryBtns.includes(btn.name))
        .map((btn) => renderControlBtn(btn.name, btn.icon))
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    username,
    userLoggedIn,
    pathname,
    activeBtn,
    mainBtns,
    displayLoginForm,
    activateDetailSubs,
    activateProjectSubs,
    activateContactSubs,
  ]);

  return (
    <section className="controls" aria-label="Control buttons">
      <section className="controls-main" aria-label="Main controls">
        {renderMainBtns}
      </section>
      <section className="controls-secondary" aria-label="Secondary controls">
        {renderSecondaryBtns}
      </section>
    </section>
  );
};

export default Controls;
