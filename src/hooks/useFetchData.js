import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetProfilePicQuery } from "../features/home/profileApiSlice";
import { useGetAllSkillsQuery } from "../features/aboutMe/skills/skillsApiSlice";
import { useGetAllJobsQuery } from "../features/aboutMe/jobs/jobsApiSlice";
import { useGetAllProjectsQuery } from "../features/portfolio/projects/projectsApiSlice";
import { useGetAllContactsQuery } from "../features/contactMe/forms/contactsApiSlice";
import { useGetAllMediasQuery } from "../features/contactMe/forms/mediasApiSlice";
import { setIsServerErr } from "../features/appSlice";
import { setProfilePicData } from "../features/home/homeSlice";
import { setSkillsData, setJobsData } from "../features/aboutMe/aboutMeSlice";
import {
  setProjectsData,
  setTotalProjects,
} from "../features/portfolio/portfolioSlice";
import {
  setContactsData,
  setMediasData,
} from "../features/contactMe/contactMeSlice";

const useFetchData = () => {
  const dispatch = useDispatch();

  const {
    data: profilePic,
    isSuccess: isProfilePicSuccess,
    isError: isProfilePicErr,
  } = useGetProfilePicQuery();

  const {
    data: skills,
    isSuccess: isSkillsSuccess,
    isError: isSkillsErr,
  } = useGetAllSkillsQuery();

  const {
    data: jobs,
    isSuccess: isJobsSuccess,
    isError: isJobsErr,
  } = useGetAllJobsQuery();


  const {
    data: projects,
    isSuccess: isProjectsSuccess,
    isError: isProjectsErr,
  } = useGetAllProjectsQuery("");

  const {
    data: contacts,
    isSuccess: isContactsSuccess,
    isError: isContactsErr,
  } = useGetAllContactsQuery();

  const {
    data: medias,
    isSuccess: isMediasSuccess,
    isError: isMediasErr,
  } = useGetAllMediasQuery();

  useEffect(() => {
    const successCondition =
      isProfilePicSuccess &&
      isSkillsSuccess &&
      isJobsSuccess &&
      isProjectsSuccess &&
      isContactsSuccess &&
      isMediasSuccess;

    const failureCondition =
      isProfilePicErr ||
      isSkillsErr ||
      isJobsErr ||
      isProjectsErr ||
      isContactsErr ||
      isMediasErr;

    if (successCondition) {
      dispatch(setProfilePicData(profilePic.data));
      dispatch(setSkillsData(skills.data));
      dispatch(setJobsData(jobs.data));
      dispatch(setProjectsData(projects.data));
      // incase the user fetchs data, the total projects in the aboutMe page will change
      // to avoid that we are getting the total projects from the first fetch request
      dispatch(setTotalProjects(projects.data.length));
      dispatch(setContactsData(contacts.data));
      dispatch(setMediasData(medias.data));
    } else if (failureCondition) {
      dispatch(setIsServerErr(true));
    }
  }, [
    profilePic,
    skills,
    jobs,
    projects,
    contacts,
    medias,
    isProfilePicSuccess,
    isSkillsSuccess,
    isJobsSuccess,
    isProjectsSuccess,
    isContactsSuccess,
    isMediasSuccess,
    isProfilePicErr,
    isSkillsErr,
    isJobsErr,
    isProjectsErr,
    isContactsErr,
    isMediasErr,
    dispatch,
  ]);
};

export default useFetchData;
