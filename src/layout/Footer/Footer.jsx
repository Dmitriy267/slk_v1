import React from 'react';
import './Footer.sass';
import { MapYandex } from '../../components/MapYandex/MapYandex';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const contacts = useSelector((state) => state.contactsPage.data);
  const isDataLoading = useSelector((state) => state.contactsPage.isLoading);
  // Форматирует телефон для подстановки в атребут ссылки href
  const formatPhone = () => {
    if (!isDataLoading) return;
    return `+${contacts.phone.replace(/\D/g, '')}`;
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__logo">
            <div className="footer__logoi" />
          </div>
          <div className="footer__title">
            <p className="footer__titlet">центр для особых детей</p>
            <p className="footer__titleb">«солнечный круг»</p>
          </div>
          {/* Скроем логотип Тольятти
          <div className="footer__logo">
            <div className="footer__gerb" />
          </div> */}
        </div>
        <div className="footer__content">
          <nav className="footer__nav">
            <ul className="footer__list">
              <li className="footer__item">
                <a href="/about" className="footer__link">
                  О центре
                </a>
              </li>
              <li className="footer__item">
                <a href="/help" className="footer__link">
                  Способы помощи
                </a>
              </li>
              <li className="footer__item">
                <a href="/news" className="footer__link">
                  Новости
                </a>
              </li>
              <li className="footer__item">
                <a href="/projects" className="footer__link">
                  Проекты
                </a>
              </li>
              {/* <li className="footer__item">
                <a href="/shop" className="footer__link">
                  Территория успеха
                </a>
              </li> */}
              <li className="footer__item">
                {/* <a href="/partners" className="footer__link">
                  Партнеры
                </a> */}

                <a href="/help/reports" className="footer__link">
                  Отчеты
                </a>
              </li>
              <li className="footer__item">
                <a href="/contacts" className="footer__link">
                  Контакты
                </a>
              </li>
            </ul>
          </nav>
          <address className="footer__contacts">
            <ul className="footer__contactslist">
              <li className="footer__contactitem">
                <span className="footer__shadulew">
                  Работаем {contacts.working_day}
                  <br />
                  {contacts.working_time}
                </span>
              </li>
              <li className="footer__contactitem">
                <p className="footer__address">{contacts.address}</p>
                <p className="footer__tel">
                  <a className="footer__tela" href={`tel:${formatPhone()}`}>
                    {contacts.phone}
                  </a>
                </p>
              </li>
              <li className="footer__contactitem">
                <a
                  className="footer__mail"
                  href="mailto:slkrug@ya.ru"
                  target="_blank"
                  rel="noreferrer"
                >
                  {contacts.email}
                </a>
              </li>
              <li className="footer__contactitem">
                <a
                  href="https://vk.com/slkrug"
                  className="footer__vk"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="footer__vk"></div>
                </a>
              </li>
            </ul>
          </address>
          {/* Скроем карту, вместо нее форма подписки
           <div className="footer__maps">
            <MapYandex width="100%" height="100%" />
          </div>  */}
          {/* Тут форма подписки 
          {<div className={styles.formaDiv}></div>} */}
        </div>
        {/* //Добавляем информацию о политике безопасности и персональных данных */}
        <div className={styles.person__div}>
          <p>Политика безопасности</p>
          <div className={styles.infoPersonData}>
            <p className={styles.p}>
              Совершая пожертвование, пользователь принимает условия публичной{' '}
              <Link to="/offert" target="_blank" className={styles.link}>
                оферты
              </Link>
            </p>

            <Link to="/personalData" target="_blank" className={styles.link}>
              Политика обработки персональных данных
            </Link>
          </div>
        </div>
        {/* //Конец информации о политике безопасности и персональных данных */}
        <div className="footer__bottom">
          <ul className="footer__listcopyr">
            <li className="footer__copyritem">
              <a href="/agreement" className="footer__policy">
                Политика конфиденциальности
              </a>
            </li>
            <li className="footer__copyritem">
              <span className="footer__cr">{`© ${new Date().getFullYear()}, Солнечный круг`}</span>
            </li>
            <li className="footer__copyritem">
              <a
                className="footer__dev"
                href="https://guild-of-developers.ru/"
                target="_blank"
                rel="noreferrer"
              >
                Разработка сайта
              </a>
              <div className="footer__devico"></div>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
