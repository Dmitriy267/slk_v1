import NavBarItem from '../NavBar/NavBarItem';
import Dropdown from '../Dropdown/Dropdown';
import './BurgerMenu.sass';
import { useEffect } from 'react';

const Burger = ({
  navItems,
  burgerOpened,
  setBurgerOpened,
  handleActiveLink,
  activeLink,
  isMain
}) => {
  useEffect(() => {
    const handleScroll = (event) => {
      if (burgerOpened) {
        event.preventDefault();
        setBurgerOpened(!burgerOpened);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: false });

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [burgerOpened]);
  return (
    <>
      <div className={burgerOpened ? 'overlay overlay--active' : 'overlay'}></div>
      <button
        onClick={() => setBurgerOpened(!burgerOpened)}
        className={burgerOpened ? 'burger burger--active' : 'burger'}
        aria-label="Открыть меню"
      >
        <span className="burger__line"></span>
      </button>
      <nav className={`burger__nav ${burgerOpened ? 'burger__nav--active' : ''}`}>
        <ul className="nav__list burger__nav-list">
          {navItems.map((item) =>
            item.dropdown ? (
              <Dropdown
                item={item}
                title={item.title}
                handleActiveLink={handleActiveLink}
                activeLink={activeLink}
                setBurgerOpened={setBurgerOpened}
                isBurger={true}
                isMain={isMain}
                key={item.id + Math.random() * 100}
              />
            ) : (
              <NavBarItem
                item={item}
                handleActiveLink={handleActiveLink}
                activeLink={activeLink}
                burgerOpened={burgerOpened}
                setBurgerOpened={setBurgerOpened}
                key={item.id + Math.random() * 100}
              />
            )
          )}
        </ul>
        <a
          className="burger__nav-link_vk"
          href="https://vk.com/slkrug"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            width="39"
            height="25"
            viewBox="0 0 39 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M37.2833 2.12514C37.5446 1.18914 37.2833 0.5 36.0315 0.5H31.8982C30.8464 0.5 30.3614 1.09486 30.0985 1.75143C30.0985 1.75143 27.9964 7.23029 25.0189 10.7891C24.0552 11.8211 23.6175 12.1486 23.0916 12.1486C22.8286 12.1486 22.4334 11.8211 22.4334 10.8834V2.12514C22.4334 1.00057 22.1437 0.5 21.2682 0.5H14.7683C14.1117 0.5 13.7165 1.02114 13.7165 1.51657C13.7165 2.58114 15.2061 2.828 15.3588 5.82457V12.3354C15.3588 13.7634 15.1179 14.0223 14.592 14.0223C13.1906 14.0223 9.78166 8.51771 7.75832 2.21943C7.36625 0.993714 6.96946 0.5 5.91292 0.5H1.7765C0.595562 0.5 0.359375 1.09486 0.359375 1.75143C0.359375 2.92057 1.76075 8.72857 6.88601 16.4103C10.3028 21.656 15.1132 24.5 19.4952 24.5C22.1232 24.5 22.4476 23.8691 22.4476 22.7806V18.8154C22.4476 17.552 22.6964 17.3 23.5293 17.3C24.1434 17.3 25.1936 17.6291 27.6468 20.1577C30.4496 23.156 30.9109 24.5 32.4887 24.5H36.6219C37.8029 24.5 38.3949 23.8691 38.0548 22.6211C37.6801 21.38 36.3417 19.5783 34.5671 17.4406C33.6035 16.2234 32.158 14.912 31.7187 14.2554C31.1062 13.4137 31.281 13.0383 31.7187 12.2891C31.7187 12.2891 36.7573 4.70171 37.2817 2.12514H37.2833Z"
              fill="#232323"
            />
          </svg>
        </a>
      </nav>
    </>
  );
};

export default Burger;
