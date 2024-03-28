import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './SpecialistCard.sass';

const SpecialistCard = ({ employee }) => {
  let location = useLocation();
  const { image, first_name, last_name, middle_name, position, direction, tel, slug } = employee;

  //Регулярное выражение для поиска и удаления из номера телефона лишних символов
  const telFormat = /[+ --()]/g;

  return (
    <div className="employee-card">
      <div className="employee-card__text">
        <img className="employee-card__foto" src={image} alt={position} />
        <p className="employee-card__name">{`${last_name} ${first_name} ${middle_name}`}</p>
        <p className="employee-card__position">{position}</p>
      </div>

      <NavLink to={`/about/specialists/${slug}`} className="employee-card__button">
        Подробнее
      </NavLink>

      {location.pathname === '/contacts' ? (
        <>
          <p className="employee-card__direction">{direction}</p>
          <a className="employee-card__tel" href={`tel:` + tel} target="_blank" rel="noreferrer">
            {tel}
          </a>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default SpecialistCard;
