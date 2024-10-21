import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetAllProjectsQuery } from '../projects/projectsApiSlice';
import {
  selectQueryBtns,
  setQueryBtns,
  setProjectsData,
} from '../portfolioSlice';
import QueryBtn from './QueryBtn';
import ErrComp from '../../helpers/components/form/comp/ErrCom';
import LoadingComp from '../../helpers/components/form/comp/LoadingComp';

const Queries = () => {
  const queryBtns = useSelector(selectQueryBtns);
  const dispatch = useDispatch();

  const [queriesUrl, setQueriesUrl] = useState('');
  const [skip, setSkip] = useState(true);

  const PROJECTS_URL = '';
  const MERNSTACK_URL = `?technologies=["react js", "express js", "mongoDB"]`;
  const REACT_URL = `?frontEnd=true&technologies=["react js"]`;
  const JAVASCRIPT_URL = `?frontEnd=true&technologies=["javascript"]`;

  const {
    data: projects,
    isSuccess,
    isLoading,
    isError,
  } = useGetAllProjectsQuery(queriesUrl, { skip });

  useEffect(() => {
    if (isSuccess) dispatch(setProjectsData(projects.data));
  }, [projects, isSuccess, dispatch]);

  const handleClick = (e) => {
    const { id } = e.target;
    dispatch(setQueryBtns(id));

    if (id === 'allProjects') setQueriesUrl(PROJECTS_URL);
    else if (id === 'mernStack') setQueriesUrl(MERNSTACK_URL);
    else if (id === 'reactJs') setQueriesUrl(REACT_URL);
    else if (id === 'javascript') setQueriesUrl(JAVASCRIPT_URL);
    setSkip(false);
  };

  return (
    <section className="queries">
      <section className="btns">
        <QueryBtn
          btnName="All Projects"
          btnId="allProjects"
          className={queryBtns.allProjects}
          handleClick={handleClick}
        />
        <QueryBtn
          btnName="MERN Stack"
          btnId="mernStack"
          className={queryBtns.mernStack}
          handleClick={handleClick}
        />
        <QueryBtn
          btnName="React Js"
          btnId="reactJs"
          className={queryBtns.reactJs}
          handleClick={handleClick}
        />
        <QueryBtn
          btnName="Javascript"
          btnId="javascript"
          className={queryBtns.javascript}
          handleClick={handleClick}
        />
      </section>

      {isLoading && <LoadingComp />}
      {isError && <ErrComp errMsg="Failed to connect with the server" />}
    </section>
  );
};

export default Queries;
