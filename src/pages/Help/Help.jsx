import './Help.sass';
import { Routes, Route } from 'react-router-dom';
import HelpMain from './HelpMain/HelpMain';
import { HelpVolunteer } from './HelpVolunteer/HelpVolunteer';
import { HelpReports } from './HelpReports/HelpReports';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { SingleFundraising } from './SingleFundraising/SingleFundraising';

const Help = () => {
  return (
    <>
      <Routes>
        <Route index element={<HelpMain />} />
        <Route path="volunteering" element={<HelpVolunteer />} />
        <Route path="reports" element={<HelpReports />} />
        <Route path=":id" element={<SingleFundraising />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default Help;
