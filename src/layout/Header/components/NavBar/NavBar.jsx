import Dropdown from '../Dropdown/Dropdown';
import NavBarItem from './NavBarItem';
import './NavBar.sass';

const NavBar = ({navItems, handleActiveLink, activeLink, isMain}) => {
  return (
    <nav className='nav'>
      <ul className="nav__list">
        {
          // Выводим всем элементы массива navItems
          navItems.map(item =>
            // Если в item есть массив dropdown то выводим список подпунктов Dropdown
            item.dropdown ?
              (
                <Dropdown
                  item={item}
                  dropdownList={item.dropdown}
                  handleActiveLink={handleActiveLink}
                  activeLink={activeLink}
                  isMain={isMain}
                  key={item.id}
                />
              ) : (
                <NavBarItem
                  item={item}
                  handleActiveLink={handleActiveLink}
                  activeLink={activeLink}
                  isMain={isMain}
                  key={item.id}
                />
              )
          )
        }
      </ul>
    </nav>
  );
};

export default NavBar;
