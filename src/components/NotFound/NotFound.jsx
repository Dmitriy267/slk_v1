import Button from '../Button/ButtonMain';
import './NotFound.sass';

import img from '../../assets/images/notFoundPage.png';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="notFound">
      <img src={img} alt="" className="notFound__img" />
      <h2 className="notFound__title">страница не найдена</h2>
      <div className="notFound__buttons">
        <Button
          title="Вернуться на главную"
          size="281px"
          action={() => navigate('/')}
        />
        <button
          className="notFound__button"
          onClick={() => navigate('/help')}
        >
          Помочь центру
        </button>
      </div>
    </section>
  );
};
