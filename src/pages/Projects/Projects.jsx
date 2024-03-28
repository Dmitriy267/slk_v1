import { Routes, Route } from 'react-router-dom';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { ProjectsPage } from '../../components/Projects/ProjectsPage/ProjectsPage';
import { SingleProject } from '../../components/Projects/SIngleProject/SingleProject';
// import { PROJECTS_DATA } from '../../tempdata/projects/PROJECTS';

export const Projects = () => {
  return (
    <>
      <Routes>
        <Route index element={<ProjectsPage />} />
        <Route exact path="/:id" element={<SingleProject />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
