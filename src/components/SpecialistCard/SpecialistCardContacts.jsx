import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SpecialistCard.sass';

export const SpecialistCardContacts = ({ employee }) => {
  let location = useLocation();
  const { image, first_name, last_name, middle_name, position, direction, tel, slug } = employee;

  return (
    <div className="employee-card">
      <img className="employee-card__foto" src={image} alt={position} />
      <p className="employee-card__name">{`${last_name} ${first_name} ${middle_name}`}</p>
      <p className="employee-card__position">{position}</p>
      <p className="employee-card__direction">{direction}</p>
      <a
        className="employee-card__tel"
        href={`tel:`+ tel}
        target="_blank"
        rel="noreferrer"
      >
        {tel}
      </a>
    </div>
  );
};
