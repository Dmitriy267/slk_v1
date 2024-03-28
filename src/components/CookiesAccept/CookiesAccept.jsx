import './CookiesAccept.sass';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { api } from '../../utils/api/api';
import uuid from 'react-uuid';

export const CookiesAccept = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [cookies, setCookie] = useCookies(['cookiesPolicy']);

  // Заголовок для идентификации пользователя для отправки согласие на куки
  let config = {
    headers: {
      Approval: `${uuid()}`
    }
  };

  // Обработчик закрытия модального окна: отправка запроса на сервер, если все ок, то сохраняется согласие в куки браузера
  const handleClosePopup = () => {
     api
      .post('/cookies/', null, config)
      .then(() => {
        setCookie('cookiesPolicy', 'true', { path: '/' });
        setIsOpened(false);
      })
      .catch((err) => console.log(err));
  };

  // Модальное окно появляется если у пользователя отсутсвует в браузере в куках согласие
  useEffect(() => {
    if (cookies.cookiesPolicy && cookies.cookiesPolicy.length > 0) return;
    setTimeout(() => {
      setIsOpened(true);
    }, 1000);
  }, []);

  return (
    <div className={`cookies ${isOpened && 'cookies_status_opened'} `}>
      <div className="cookies__icon" />
      <p className="cookies__text">
        Используя данный сайт, вы даете согласие на использование файлов cookie, помогающих нам
        сделать его удобнее для вас.{' '}
        <Link to="/cookies-policy" className="cookies__link" target='_black'>
          Подробнее
        </Link>
      </p>
      <div className="cookies__btn-wrapper">
        <button type="button" className='cookies__accept-button' onClick={() => handleClosePopup()}>
         Принять и закрыть
        </button>
      </div>
    </div>
  );
};
