import { Routes, Route } from 'react-router-dom';
import { HelpBlock } from '../../components/HelpBlock/HelpBlock';
import { NewsPage } from '../../components/News/NewsPage/NewsPage';
import { SingleNews } from '../../components/News/SingleNews/SingleNews';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
// import { tempNewsData } from '../../tempdata/TEMP_NEWS_DATA';

export const News = () => {
  return (
    <>
      <Routes>
        <Route index element={<NewsPage />} />
        <Route exact path='/:id' element={<SingleNews />} />
        <Route path='/*' element={<NotFoundPage/>} />
      </Routes>

      <HelpBlock marginBottom="128px" />
    </>
  );
};
