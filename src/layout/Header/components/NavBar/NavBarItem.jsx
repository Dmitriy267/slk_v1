import { NavLink } from 'react-router-dom';
import './NavBar.sass';

const NavBarItem = ({item, handleActiveLink, activeLink, setBurgerOpened, burgerOpened, isMain}) => {
  const hideBurger = (id) => {
    if (burgerOpened) {
      handleActiveLink(id);
      setBurgerOpened(false);
    }

    handleActiveLink(id);
  }

  return (
    <li
      key={`${item.title}_${item.id}_${Date.now()}`}
      className={`nav__list-item ${isMain && 'nav__list-item_status_main'}`}
    >
      <NavLink
        // По клику присваиваем activeLink = item.id
        onClick={() => hideBurger(item.id)}
        // меняем класс на active если activeLink === item.id
        //className={`nav-list__item-link ${activeLink === item.id ? "active" : ""}`}
        className={({isActive}) => (isActive ? 'nav__list-item_active nav-list__item-link' : 'nav-list__item-link')}
        // Если ссылки нет то по умолчанию '/'
        to={item.link ? item.link : '/'}
      >
        {item.title}
      </NavLink>
    </li>
  );
};

export default NavBarItem;
