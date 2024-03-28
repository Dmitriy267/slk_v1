import { Routes, Route } from 'react-router-dom';
import {PersonalAccountPagesInfo} from '../../components/PersonalAccountPages/PersonalAccountPagesInfo/PersonalAccountPagesInfo';
import {PersonalAccountPagesFavourites} from '../../components/PersonalAccountPages/PersonalAccountPagesFavourites/PersonalAccountPagesFavourites';
import {PersonalAccountPagesHistoryShop} from '../../components/PersonalAccountPages/PersonalAccountPagesHistoryShop/PersonalAccountPagesHistoryShop';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';

const PersonalAccount = () => {

  return (
    <>
      <Routes>
        <Route index element={<PersonalAccountPagesInfo />} />
        <Route path='favourites' element={<PersonalAccountPagesFavourites />} />
        <Route path='historyShop' element={<PersonalAccountPagesHistoryShop />} />
        <Route path='/*' element={<NotFoundPage/>} />
      </Routes>
    </>
  );
};

export default PersonalAccount;
