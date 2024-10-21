import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllProjectsQuery } from "../projects/projectsApiSlice";
import { setFetchForm } from "../../controls/controlsSlice";
import {
  selectBaseUrl,
  selectUserFormOpacity,
  setFormOpacity,
} from "../../appSlice";
import { selectSkillsData } from "../../aboutMe/aboutMeSlice";
import {
  selectSymbolsData,
  selectBrowsersData,
  setProjectsData,
  setQueryBtns,
} from "../portfolioSlice";
import {
  displayQueriesInitialState,
  queriesInitialState,
  queriesBtnsInitialState,
  ratingAndDurationInitialState,
  queryTechInitialState,
  testInitialState,
} from "../../helpers/functions/handleInitialState";
import { formStyle } from "../../helpers/functions/handleForms";
import { convertQueryToDisplayQuery } from "../../helpers/functions/handleQueries";
import OpacitySlider from "../../helpers/components/form/slider/OpacitySlider";
import ByeByeIcon from "../../helpers/components/form/icons/ByeByeIcon";
import SortMultiInputs from "../../helpers/components/query/SortMultiInputs";
import Btns from "../../helpers/components/query/Btns";
import Btn from "../../helpers/components/query/Btn";
import MultiInputs from "../../helpers/components/query/MultiInputs";
import General from "../../helpers/components/query/General";
import LoadingComp from "../../helpers/components/form/comp/LoadingComp";
import ErrComp from "../../helpers/components/form/comp/ErrCom";
import GeneralBtn from "../../helpers/components/form/btn/GeneralBtn";

const FetchForm = () => {
  const BASE_URL = useSelector(selectBaseUrl);
  const PROJECTS_URL = `${BASE_URL}api/v1/projects`;
  const userFormOpaicty = useSelector(selectUserFormOpacity);
  const symbolsData = useSelector(selectSymbolsData);
  const skillsData = useSelector(selectSkillsData);
  const browsersData = useSelector(selectBrowsersData);
  const dispatch = useDispatch();

  const [fullUrl, setFullUrl] = useState("");
  const [queriesUrl, setQueriesUrl] = useState("");
  const [skip, setSkip] = useState(true);

  const [queries, setQueries] = useState(queriesInitialState);
  const [displayQueries, setDisplayQueries] = useState(
    displayQueriesInitialState
  );

  const [queriesBtns, setQueriesBtns] = useState(queriesBtnsInitialState);
  const [rating, setRating] = useState(ratingAndDurationInitialState);
  const [tech, setTech] = useState([]);
  const [testedWith, setTestedWith] = useState(testInitialState(browsersData));
  const [duration, setDuration] = useState(ratingAndDurationInitialState);

  const [errMsg, setErrMsg] = useState(null);
  const [formErr, setFormErr] = useState(false);

  const errMsgRef = useRef(null);

  const currentYear = new Date().getFullYear();

  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllProjectsQuery(queriesUrl, { skip });

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
    setSkip(true);

    Object.entries(queries).map(([query, value]) => {
      const displayQuery = convertQueryToDisplayQuery(query);
      if (!value) {
        setDisplayQueries((prev) => ({ ...prev, [displayQuery]: false }));
      }
      return null;
    });
  }, [queries, errMsgRef, userFormOpaicty, dispatch]);

  useEffect(() => {
    setTech(queryTechInitialState(skillsData));
  }, [skillsData]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setProjectsData(projects.data));
      dispatch(setFetchForm(false));
      // only to remove the active-query class from the queryBtns
      dispatch(setQueryBtns("off"));
    } else if (isError) setErrMsg(error.msg);
  }, [projects, isSuccess, isError, error, dispatch]);

  useEffect(() => {
    const queriesUrlArray = Object.entries(queries).map(
      ([query, value], index1) => {
        let queryString = "";
        if (value) {
          Object.values(displayQueries).map((checked, index2) => {
            if (index1 === index2 && checked) queryString = `${query}=${value}`;
            return queryString;
          });
        }

        return queryString;
      }
    );

    const queriesUrl = queriesUrlArray.filter((item) => item !== "").join("&");
    setQueriesUrl(queriesUrl ? `?${queriesUrl}` : "");
    setFullUrl(`${PROJECTS_URL}${queriesUrl ? `?${queriesUrl}` : ""}`);
  }, [queries, displayQueries, PROJECTS_URL]);

  const handleByeByeClick = () => {
    // reset everything
    if (errMsg) dispatch(setFormOpacity(userFormOpaicty));
    dispatch(setFetchForm(false));
    setQueriesUrl("");
    setQueries(queriesInitialState);
    setQueriesBtns(queriesBtnsInitialState);
    setRating(ratingAndDurationInitialState);
    setTech(queryTechInitialState(skillsData));
    setTestedWith(testInitialState(browsersData));
    setErrMsg(null);
    setFormErr(false);
    setSkip(true);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) handleByeByeClick();
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    const displayQuery = `display${name[0].toUpperCase()}${name.substring(1)}`;

    if (name === "year" && value > currentYear) value = currentYear;

    setQueries((prev) => ({ ...prev, [name]: value }));
    setDisplayQueries((prev) => ({ ...prev, [displayQuery]: true }));
  };

  const handleDisplay = (e) => {
    const { name, checked } = e.target;
    const queryName = `${name.slice(7)}`;

    // the user only allowed to check the checkbox only if the input field got a value
    Object.entries(queries).map(([query, value]) => {
      if (query.toLowerCase() === queryName.toLowerCase() && value) {
        setDisplayQueries((prev) => ({ ...prev, [name]: checked }));
      }
      return null;
    });
  };

  const handleFetch = (e) => {
    e.preventDefault();
    setSkip(false);
  };

  return (
    <form
      className={formErr ? "fetch-form form-err" : "fetch-form"}
      style={formStyle(errMsg, formErr, userFormOpaicty)}
      onKeyDown={handleKeyDown}
      aria-label="Fetch form"
    >
      <OpacitySlider />
      <ByeByeIcon handleClick={handleByeByeClick} />
      <article className="url-article">
        <p>URL:</p>
        <p className="full-url">{fullUrl}</p>
      </article>
      <SortMultiInputs
        checkBoxName="displaySort"
        checked={displayQueries.displaySort}
        handleDisplay={handleDisplay}
        labelName="Sort:"
        setQueries={setQueries}
        setDisplayQueries={setDisplayQueries}
      />
      <General
        checkBoxName="displayProjectName"
        checked={displayQueries.displayProjectName}
        handleDisplay={handleDisplay}
        labelName="Project Name:"
        inputName="projectName"
        placeholder="Project name with or without the version"
        value={queries.projectName}
        handleChange={handleChange}
        autoFocus={true}
      />
      <General
        checkBoxName="displayVersion"
        checked={displayQueries.displayVersion}
        handleDisplay={handleDisplay}
        labelName="Version:"
        inputName="version"
        placeholder="Vnumber, ex (V1 / v1), or leave empty to get all versions"
        value={queries.version}
        handleChange={handleChange}
      />
      <MultiInputs
        checkBoxName="displayRating"
        checked={displayQueries.displayRating}
        handleDisplay={handleDisplay}
        labelName="Rating (1-5):"
        target="rating"
        data={symbolsData}
        type="number"
        inputValues={rating}
        setInputValues={setRating}
        setQueries={setQueries}
        setDisplayQueries={setDisplayQueries}
        testId="rating"
      />
      <Btns
        checkBoxName="displayCommercial"
        checked={displayQueries.displayCommercial}
        handleDisplay={handleDisplay}
        labelName="Commercial:"
        btnObj={queriesBtns.commercial}
        setQueriesBtns={setQueriesBtns}
        setQueries={setQueries}
        setDisplayQueries={setDisplayQueries}
        testId="commercial"
      />
      <Btns
        checkBoxName="displayResponsive"
        checked={displayQueries.displayResponsive}
        handleDisplay={handleDisplay}
        labelName="Responsive:"
        btnObj={queriesBtns.responsive}
        setQueriesBtns={setQueriesBtns}
        setQueries={setQueries}
        setDisplayQueries={setDisplayQueries}
        testId="responsive"
      />
      <Btn
        checkBoxName="displayFrontEnd"
        checked={displayQueries.displayFrontEnd}
        handleDisplay={handleDisplay}
        labelName="Front-End:"
        btnObj={queriesBtns.frontEnd}
        setQueriesBtns={setQueriesBtns}
        setQueries={setQueries}
        setDisplayQueries={setDisplayQueries}
        testId="frontEnd"
      />
      <Btn
        checkBoxName="displayBackEnd"
        checked={displayQueries.displayBackEnd}
        handleDisplay={handleDisplay}
        labelName="Back-End:"
        btnObj={queriesBtns.backEnd}
        setQueriesBtns={setQueriesBtns}
        setQueries={setQueries}
        setDisplayQueries={setDisplayQueries}
        testId="backEnd"
      />
      <Btn
        checkBoxName="displayFullStack"
        checked={displayQueries.displayFullStack}
        handleDisplay={handleDisplay}
        labelName="Full Stack:"
        btnObj={queriesBtns.fullStack}
        setQueriesBtns={setQueriesBtns}
        setQueries={setQueries}
        setDisplayQueries={setDisplayQueries}
        testId="fullStack"
      />
      <MultiInputs
        checkBoxName="displayTechnologies"
        checked={displayQueries.displayTechnologies}
        handleDisplay={handleDisplay}
        labelName="Technologies:"
        target="technologies"
        data={skillsData}
        type="checkbox"
        inputValues={tech}
        setInputValues={setTech}
        setQueries={setQueries}
        setDisplayQueries={setDisplayQueries}
        testId="technologies"
      />
      <MultiInputs
        checkBoxName="displayTestedWith"
        checked={displayQueries.displayTestedWith}
        handleDisplay={handleDisplay}
        labelName="Tested With:"
        target="testedWith"
        data={browsersData}
        type="checkbox"
        inputValues={testedWith}
        setInputValues={setTestedWith}
        setQueries={setQueries}
        setDisplayQueries={setDisplayQueries}
        testId="testedWith"
      />
      <MultiInputs
        checkBoxName="displayDuration"
        checked={displayQueries.displayDuration}
        handleDisplay={handleDisplay}
        labelName="Duration (days):"
        target="duration"
        data={symbolsData}
        type="number"
        inputValues={duration}
        setInputValues={setDuration}
        setQueries={setQueries}
        setDisplayQueries={setDisplayQueries}
        testId="duration"
      />
      <General
        checkBoxName="displayYear"
        checked={displayQueries.displayYear}
        handleDisplay={handleDisplay}
        labelName="Year:"
        inputType="number"
        inputName="year"
        placeholder={`${currentYear > 2022 ? `2022 - ${currentYear}` : "2022"}`}
        value={queries.year}
        handleChange={handleChange}
      />

      {isLoading && <LoadingComp />}
      {errMsg && <ErrComp errMsg={errMsg} />}
      <GeneralBtn btnName="Fetch IT" handleClick={handleFetch} />
    </form>
  );
};

export default FetchForm;
