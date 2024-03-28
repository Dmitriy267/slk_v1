import { Routes, Route } from 'react-router-dom'
import { AboutPagesMasterskie } from '../../components/AboutPages/AboutPagesMasterskie';
import { AboutPagesSad } from '../../components/AboutPages/AboutPagesSad';
import { AboutPagesSchool } from '../../components/AboutPages/AboutPagesSchool';
import { AboutPagesSpecialists } from '../../components/AboutPages/AboutPagesSpecialists';
import { AboutPagesSrv } from '../../components/AboutPages/AboutPagesSrv';
import { HelpBlock } from '../../components/HelpBlock/HelpBlock';
import { AboutPagesCenter } from '../../components/AboutPages/AboutPagesCenter';
import './About.sass';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import useMediaQuery from '../../utils/hooks/useMediaQuery';
import { SingleSpecialist } from '../../components/SingleSpecialist/SingleSpecialist';
const About = () => {

  const isMobile = useMediaQuery('(max-width: 700px)');

  return (
    <>
      <Routes>
        <Route index element={<AboutPagesCenter />} />
        <Route path='sad' element={<AboutPagesSad />} />
        <Route path='masterskie' element={<AboutPagesMasterskie />} />
        <Route path='specialists' element={<AboutPagesSpecialists />} />
        <Route path='specialists/:id' element={<SingleSpecialist />} />
        <Route path='srv' element={<AboutPagesSrv />} />
        <Route path='school' element={<AboutPagesSchool /> } />
        <Route path='/*' element={<NotFoundPage/>} />
      </Routes>

      <HelpBlock marginBottom={isMobile ? '60px' :'128px'} />
    </>
  );
};

export default About;
