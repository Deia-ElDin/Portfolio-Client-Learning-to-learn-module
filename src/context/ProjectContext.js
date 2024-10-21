import { createContext } from 'react';

export const ProjectContext = createContext(null);

export const ProjectProvider = ({ children, values }) => {
  return (
    <ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
  );
};

export default ProjectProvider;
