import { MapYandex } from '../../components/MapYandex/MapYandex';
import './Contacts.sass';
import { employeesForHome } from '../../tempdata/employee/TEMP__EMPLOYEE_DATA';
import {SpecialistCardContacts} from '../../components/SpecialistCard/SpecialistCardContacts';
import useMediaQuery from '../../utils/hooks/useMediaQuery';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';

import { RegistrationSuccessForm } from '../../components/RegistrationSuccessForm/RegistrationSuccessForm';
import { SliderMobile } from '../../components/SliderMobile/SliderMobile';

export const Contacts = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: 'slick-dots contacts__slider-dots'
  };
  const isMobile = useMediaQuery('(max-width: 800px)');

  const contacts = useSelector((state) => state.contactsPage.data);
  const isDataLoading = useSelector((state) => state.contactsPage.isLoading);

  // Форматирует телефон для подстановки в атребут ссылки href
  const formatPhone = () => {
    if (!isDataLoading) return;
    return `+${contacts.phone.replace(/\D/g, '')}`;
  };

  return (
    <section className="contacts">

      <h1 className="contacts__title">КОНТАКТЫ</h1>
      <div className="contacts__info">
        <address className="adress">
          <div className="adress__item">
            <p className="adress__title">Адрес</p>
            <a className="adress__link">{contacts.address}</a>
          </div>
          <div className="adress__item">
            <p className="adress__title">Телефон</p>
            <a href={`tel:${formatPhone()}`} className="adress__link">
              {contacts.phone}
            </a>
          </div>
          <div className="adress__item">
            <p className="adress__title">Email</p>
            <a
              href={`mailto:${contacts.email}`}
              target="_blank"
              className="adress__link"
              rel="noreferrer"
            >
              {contacts.email}
            </a>
          </div>

          <div className="adress__item ">
            <a
              href="https://vk.com/slkrug"
              target="_blank"
              className="adress__social-link"
              rel="noreferrer"
            >
              <div className="adress__social"></div>
            </a>
          </div>
        </address>

        <div className="contacts__timeOfWork">
          <p className="contacts__workTime">{contacts.working_time}</p>
          <p className="contacts__workDays">{contacts.working_day}</p>
        </div>
      </div>
      <div className="contacts__map">
        <MapYandex width="100%" height="600px" />
      </div>

      <div className="contacts__specialists">
        <h2 className="contacts__specialists-title">К КОМУ ОБРАТИТЬСЯ</h2>
        <div className="contacts__specialists-list">
          {!isMobile ? (
            employeesForHome
              .slice(0, 6)
              .map((item) => <SpecialistCardContacts employee={item} key={item.id} />)
          ) : (
            <SliderMobile data={employeesForHome} type='SpecialistCardContacts' />
          )}
        </div>
      </div>
    </section>
  );
};
