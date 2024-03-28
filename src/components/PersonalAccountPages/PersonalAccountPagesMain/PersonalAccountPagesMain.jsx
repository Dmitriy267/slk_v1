import './PersonalAccountPagesMain.sass';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from '../../../components/Button/ButtonMain';

export const PersonalAccountPagesMain = () => {
  const navigate = useNavigate();

  return (
    <section className="accountMain">
      <h2 className='accountMain__title'>личный кабинет</h2>
      <div className="accountMain__how-buttons">
        <Button
          title="Стать волонтёром"
          size="281px"
          action={() => navigate('/help/volunteering')}
        />
        <Button
          title="Сделать пожертвование"
          size="281px"
          action={() => navigate('/help/volunteering')}
        />
        </div>
        <nav className="accountMain__nav">
          <li className="accountMain__nav_li">
            <NavLink to="/account" end className={({isActive}) => (isActive ? 'accountMain__link-active' : 'accountMain__link')}>
              Личная информация
            </NavLink>
          </li>
          <li className="accountMain__nav_li">
            <NavLink to="/account/favourites" end className={({isActive}) => (isActive ? 'accountMain__link-active' : 'accountMain__link')}>
              Избранное
            </NavLink>
          </li>
          <li className="accountMain__nav_li">
            <NavLink to="/account/historyShop" end className={({isActive}) => (isActive ? 'accountMain__link-active' : 'accountMain__link')}>
              История покупок
            </NavLink>
          </li>
        </nav>
    </section>
  );
};
