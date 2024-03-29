import { MapYandex } from '../../components/MapYandex/MapYandex';
import './Contacts.sass';
import './Contacts.scss';
import { employeesForHome } from '../../tempdata/employee/TEMP__EMPLOYEE_DATA';
import { SpecialistCardContacts } from '../../components/SpecialistCard/SpecialistCardContacts';
import useMediaQuery from '../../utils/hooks/useMediaQuery';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';

import { RegistrationSuccessForm } from '../../components/RegistrationSuccessForm/RegistrationSuccessForm';
import { SliderMobile } from '../../components/SliderMobile/SliderMobile';
import { Recvicites } from '../../components/Recvicites/Recvicites';
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
      {/* То, что было изначально  с данными контактами*/}
      {/* <h1 className="contacts__title">КОНТАКТЫ</h1>
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
      </div> */}
      {/* Новый вид контакта с данными */}
      <div className="card-block">
        <h1 className="contacts__title_new">КОНТАКТЫ</h1>

        <address className="adress-contacts ">
          <div className="block-contacts-map__div">
            <div className="block-contacts__div_left">
              <div className="adress__item1">
                <p className="adress__title_bold">
                  <span>Адрес:</span> 445040, Самарская обл, Тольятти г, Туполева б-р, д. 6.
                </p>
                <p>Работаем понедельник-пятница с 8.00 до 17.30</p>
              </div>
              <p className="contacts-data__p_bold">
                <span>Телефон:</span> <a href="tel:+7 (927) 891-17-72">+7 (927) 891-17-72</a>
              </p>
              <p className="contacts-data__p_bold">
                <span>E-mail:</span> <a href="mailto:Slkrug@ya.ru">Slkrug@ya.ru</a>
              </p>
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
            </div>
            <div className="contacts__map_right">
              <MapYandex width="100%" height="300px" />
            </div>
          </div>
        </address>
      </div>
      {/* Добавляем реквизиты */}
      <Recvicites />
      {/* Убираем карту
      <div className="contacts__map">
        <MapYandex width="100%" height="600px" />
      </div>
  */}
      <div className="contacts__specialists">
        <h2 className="contacts__specialists-title">К КОМУ ОБРАТИТЬСЯ</h2>
        <div className="contacts__specialists-list">
          {!isMobile ? (
            employeesForHome
              .slice(0, 6)
              .map((item) => <SpecialistCardContacts employee={item} key={item.id} />)
          ) : (
            <SliderMobile data={employeesForHome} type="SpecialistCardContacts" />
          )}
        </div>
      </div>
    </section>
  );
};
