import './ButtonWithStar.sass';
import { Link } from 'react-router-dom';

const ButtonWithStar = ({ title = "Подробнее", link = "/" }) => {
  return (
    <div className="button">
      <Link to={link} className='button-with-star'>{title}</Link>
      <div className="star"/>
    </div>
  );
};

export default ButtonWithStar;
