import './Header.sass';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useMediaQuery from '../../utils/hooks/useMediaQuery';
import NavBar from './components/NavBar/NavBar';
import BurgerMenu from './components/BurgerMenu/BurgerMenu';
import logo from './assets/logo.svg';
import gerb from './assets/gerb.svg';
// import { ReactComponent as UserLogin } from './assets/user-account.svg';
// import { Tooltip } from 'react-tooltip';
// import UserLoginToolkit from './components/UserLoginToolkit/UserLoginToolkit';
import { useSelector } from 'react-redux';

const navItems = [
  {
    id: 1,
    title: 'О центре',
    dropdown: [
      { id: 11, title: 'Центр', link: '/about' },
      { id: 12, title: 'СРВ', link: '/about/srv' },
      { id: 13, title: 'Сад', link: '/about/sad' },
      { id: 14, title: 'Школа', link: '/about/school' },
      { id: 15, title: 'Мастерские', link: '/about/masterskie' },
      { id: 16, title: 'Специалисты', link: '/about/specialists' }
    ]
  },
  { id: 2, title: 'Помочь', link: '/help' },
  { id: 3, title: 'Проекты', link: '/projects' },
  // { id: 4, title: 'Территория успеха', link: '/shop' },
  { id: 5, title: 'Партнёры', link: '/partners' },
  { id: 6, title: 'Контакты', link: '/contacts' }
];

export const Header = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const isTablet = useMediaQuery('(max-width: 999px)');
  // Используются для определения главной страницы для изменения стилей
  const [isMain, setIsMain] = useState(false);
  const { pathname } = useLocation();

  // Для опредления открыто бургер меню или закрыто
  const [burgerOpened, setBurgerOpened] = useState(false);

  // Задаём по умолчанию activeLink = 0
  const [activeLink, setActiveLink] = useState(0);

  // По умолчанию вход в аккаунт не выполнен
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  // Имя Профиля если выполнен вход в аккаунт
  const profile = useSelector((state) => state.user.data);
  const [profileName, setProfileName] = useState('');

  // Временная функция для обработки клика по лого для возврата на главную страницу
  const handleClickLogo = () => {
    navigate('/');
    setActiveLink(0);
  };

  // При изменение роута меняет значение переменной isMain
  useEffect(() => {
    if (pathname === '/') {
      setIsMain(true);
    } else {
      setIsMain(false);
    }
  }, [pathname]);

  // При загрузке данных пользователя с бэка устанавливаем имя для профиля

  useEffect(() => {
    if (profile) {
      const name = `${profile.last_name[0]}${profile.first_name[0]}`;
      setProfileName(name);
    }
  }, [profile]);

  useEffect(() => {
    const userInfo = localStorage.getItem
  }, [])

  return (
    <div className="header__container">
      <header
        className={`header ${
          burgerOpened ? 'header_burger--opened' : ''
        }`}
      >
        {location.pathname == '/' ? (
          <img className="header__logo" src={logo} alt="логотип" />
        ) : (
          <img
            className="header__logo header__logo_type_link"
            src={logo}
            alt="логотип"
            onClick={handleClickLogo}
          />
        )}

        {!isTablet && (
          <NavBar
            navItems={navItems}
            handleActiveLink={setActiveLink}
            burgerOpened={burgerOpened}
            setBurgerOpened={setBurgerOpened}
            isMain={isMain}
          />
        )}

        {/* <button className="home__user-login" type="button">
          <UserLogin className="home__user-login-svg"></UserLogin>
          <p className="home__user-login-name">{isLoggedIn ? profileName : ''}</p>
          <UserLoginToolkit isLoged={isLoggedIn} />
        </button> */}

        <img className="home__hero-gerb" src={gerb} alt="герб Тольятти" />

        {isTablet && (
          <BurgerMenu
            navItems={navItems}
            burgerOpened={burgerOpened}
            setBurgerOpened={setBurgerOpened}
            handleActiveLink={setActiveLink}
            activeLink={activeLink}
            isMain={isMain}
          />
        )}
      </header>
    </div>
  );
};
