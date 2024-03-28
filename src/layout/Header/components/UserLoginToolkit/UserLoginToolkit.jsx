import { NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { userItemsIsLoged, userItemsNotLoged } from './toolkitItems';
import { useDispatch } from 'react-redux';
import { setLoggedOut, setToken } from '../../../../store/DataSlices/authSlice';
import { setUser } from '../../../../store/DataSlices/userSLice';

const UserLoginToolkit = ({ isLoged, items }) => {
  !isLoged ? (items = [...userItemsIsLoged]) : (items = [...userItemsNotLoged]);
  const dispatch = useDispatch();

  const handleClickLogOut = () => {
    dispatch(setLoggedOut());
    localStorage.removeItem('logIn');
    dispatch(setUser(null));
    localStorage.removeItem('user');
    dispatch(setToken(''));
    localStorage.removeItem('token');
  };

  return (
    <Tooltip
      anchorSelect=".home__user-login"
      className="home__tooltip"
      classNameArrow="home__tooltip-arrow"
      clickable={true}
      offset="0"
      place="bottom"
    >
      {items.map((item, index) =>
        item.name === 'Выйти' ? (
          <p
            key={item.name + index}
            className="home__user-login-btn"
            onClick={handleClickLogOut}
          >
            {item.name}
          </p>
        ) : (
          <NavLink
            key={item.name + index}
            className="home__user-login-btn"
            to={item.path ? item.path : '/'}
          >
            {item.name}
          </NavLink>
        )
      )}
    </Tooltip>
  );
};

export default UserLoginToolkit;
