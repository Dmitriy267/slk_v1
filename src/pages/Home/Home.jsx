import './Home.sass';
import React, { useState } from 'react';
import ButtonWithStar from '../../components/ButtonWithStar/ButtonWithStar';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { Hero } from './Hero/Hero';
import { RequisitesCard } from '../../components/RequisitesCard/RequisitesCard';
import { Documents } from '../../components/Documents/Documents';
import { NewsCard } from '../../components/News/NewsCard/NewsCard';
import SpecialistCard from '../../components/SpecialistCard/SpecialistCard';

import { PartnersCards } from '../../components/Partners/Partners';
import { SliderElement } from '../../components/Slider/Slider';
import { CenterNumbers } from '../../components/CenterNumbers/CenterNumbers';
// import useMediaQuery from '../../hooks/useMediaQuery';
import { payment } from '../../vendor/payWidget';
import { useNavigate } from 'react-router-dom';
import { employeesForHome } from '../../tempdata/employee/TEMP__EMPLOYEE_DATA';

// Временные данные
// import { employeesForHome } from '../../tempdata/employee/TEMP__EMPLOYEE_DATA';
// import ShopItemsGrid from '../../components/ShopItemsGrid/ShopItemsGrid';
// import { successItems } from '../../tempdata/success/TEMP_SUCCESS_DATA';
// import { fundraisingItems } from '../../tempdata/fundraising/TEMP_FUNDRAISING_DATA';

import { SliderMobile } from '../../components/SliderMobile/SliderMobile';
import { Preloader } from '../../components/Preloader/Preloader';
import { useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';
import { Donation } from './Donation/Donation';

export const Home = () => {

  // Секция О ЦЕНТРЕ
  const isAboutCenterLoading = useSelector((state) => state.homeCenter.isLoading);
  const aboutCenterData = useSelector((state) => state.homeCenter.data);

  // Секция ПРОЕКТЫ
  const projectsData = useSelector((state) => state.projects.data);
  const isProjectsLoading = useSelector((state) => state.projects.isLoading);

  // Секция ПОМОЩЬ ЦЕНТРУ
  // Секция НОВОСТИ
  const isNewsLoading = useSelector((state) => state.news.isLoading);
  const newsData = useSelector((state) => state.news.data);

  // Секция СПЕЦИАЛИСТЫ
  const isSpecialistsLoading = useSelector((state) => state.specialists.isLoading);
  const specialists = useSelector((state) => state.specialists.data);

  // Секция ТЕРРИТОРИЯ УСПЕХА
  // const [sliceIndex, setSliceIndex] = useState(5);
  // const isFourItems = useMediaQuery('(max-width: 990px)');
  // const isThreeItems = useMediaQuery('(max-width: 680px)');
  // const products = useSelector((state) => state.products.data);
  // const isProductsLoaded = useSelector((state) => state.products.isLoading);

  // Секция ПАРТНЕРЫ
  const isPartnersLoading = useSelector((state) => state.partners.isLoading);
  const partners = useSelector((state) => state.partners.data);

  // Секция СБОРЫ
  const fundraisings = useSelector((state) => state.fundraising.data);
  const isFundraisingSLoaded = useSelector((state) => state.fundraising.isLoading);

  const [otherDonation, setOtherDonation] = useState(true);
  const [donation, setDonation] = useState(2000);
  ///Модалка выбора пожертвования (единоразово/подписка)
  const [isDonationChoice, setDonationChoice] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(' ');

  // Обработчик платежа для пожертвования
  const handleClickPay = (amount) => {
    handleAnotherDonation();
    const data = {
      amount: Number(amount),
      description: 'Добровольное пожертвование'
    };
    payment(data);
  };

  const handleDonation = (amount) => {
    setDonationChoice(true);
    setCurrentAmount(amount);
  };

  const navigate = useNavigate();

  // Определяю индекс для обрезки данных для Магазина в зависимости от размеров экрана
  // useEffect(() => {
  //   if (isFourItems && !isThreeItems) {
  //     setSliceIndex(4);
  //   } else if (isFourItems && isThreeItems) {
  //     setSliceIndex(3);
  //   } else {
  //     setSliceIndex(5);
  //   }
  // }, [isFourItems, isThreeItems]);

  const handleAnotherDonation = () => {
    setOtherDonation((prev) => !prev);
  };

  const donationChange = (e) => {
    setDonation(e.target.value);
  };

  const closeDonationModal = () => {
    setDonationChoice(false);
  };

  return (
    <div className="home">
      <Hero />

      <Donation
        closeDonationModal={closeDonationModal}
        handleDonation={handleDonation}
        currentAmount={currentAmount}
        isDonationChoice={isDonationChoice}
        handleClickPay={handleClickPay}
        otherDonation={otherDonation}
        handleAnotherDonation={handleAnotherDonation}
        donation={donation}
        donationChange={donationChange}
        navigate={navigate}
      />

      <section className="home__section">
        {isAboutCenterLoading ? (
          <>
            <div className="home__about-content">
              <div className="home__about-block">
                <div className="home__title-block home__title-block-about">
                  <h2 className="home__title home__title_type_about">
                    {aboutCenterData.about_center_title.toUpperCase()}
                  </h2>
                  <div className="home__button-container_not-mobile">
                    <ButtonWithStar title="Подробнее" link="/about" />
                  </div>
                </div>
                <p className="home__paragraph">{aboutCenterData.about_center_description}</p>
              </div>
              <CenterNumbers />
            </div>
            <div className="home__button-container_mobile">
              <ButtonWithStar title="Подробнее" link="/about" />
            </div>
          </>
        ) : (
          <Preloader />
        )}
      </section>

      <section className="home__section">
        <div className="home__title-block">
          <h2 className="home__title">ПРОЕКТЫ</h2>
          <div className="home__button-container_not-mobile">
            <ButtonWithStar title="Все проекты" link="/projects" />
          </div>
        </div>
        {isProjectsLoading ? (
          projectsData
            .slice(0, 2)
            .map((project) => (
              <ProjectCard
                project={project}
                index={projectsData.indexOf(project)}
                key={project.title}
              />
            ))
        ) : (
          <Preloader />
        )}

        <div className="home__button-container_mobile">
          <ButtonWithStar title="Все проекты" link="/projects" />
        </div>
      </section>

      <section className="home__section home__section_type_slider">
        <div className="home__title-block">
          <h2 className="home__title">ПОМОЩЬ ЦЕНТРУ</h2>
          <div className="home__button-container_not-mobile">
            <ButtonWithStar title="Подробнее" link="/help" />
          </div>
        </div>
        {isFundraisingSLoaded ? (
          <>
            <SliderElement data={fundraisings} />
            <SliderMobile data={fundraisings} type="FundraisingCard" />
          </>
        ) : (
          <Preloader />
        )}

        <div className="home__button-container_mobile home__button-container_mobile-s">
          <ButtonWithStar title="Подробнее" link="/help" />
        </div>
      </section>

      <section className="home__section home__section-requisites">
        <div className="home__requisitesCards">
          <RequisitesCard />
        </div>
      </section>

      <section className="home__section">
        <div className="home__title-block">
          <h2 className="home__title">НОВОСТИ</h2>
          <div className="home__button-container_not-mobile">
            <ButtonWithStar title="Все новости" link="/news" />
          </div>
        </div>
        {isNewsLoading ? (
          <div className="home__newsCards">
            {newsData.results.slice(0, 3).map((el, index) => (
              <NewsCard item={el} key={index} />
            ))}
          </div>
        ) : (
          <Preloader />
        )}

        <div className="home__button-container_mobile">
          <ButtonWithStar title="Все новости" link="/news" />
        </div>
      </section>

      <section className="home__section">
        <div className="home__title-block">
          <h2 className="home__title">СПЕЦИАЛИСТЫ</h2>
          <div className="home__button-container_not-mobile">
            <ButtonWithStar title="Посмотреть всех" link="/about/specialists" />
          </div>
        </div>
        {isSpecialistsLoading ? (
          <>
            <div className="home__ceo">
              <picture className="home__ceo-picture">
                <img
                  src={employeesForHome[0].image}
                  alt={employeesForHome[0].position}
                  className="home__ceo-image"
                />
              </picture>
              <div className="home__ceo-text">
                <p className="home__ceo-name">{`${employeesForHome[0].last_name} ${employeesForHome[0].first_name} ${employeesForHome[0].middle_name} `}</p>
                <p className="home__ceo-position">{employeesForHome[0].position}</p>
              </div>
            </div>
            <div className="home__specialists">
              {/* НУЖНЫ НОРМАЛЬНЫЕ ID ДЛЯ КЛЮЧЕЙ */}

              {specialists.others.slice(0, 3).map((item) => (
                <SpecialistCard employee={item} key={uuidv4()} />
              ))}
            </div>
            <SliderMobile data={specialists.others.slice(0, 3)} />
            <div className="home__button-container_mobile home__button-container_mobile-s ">
              <ButtonWithStar title="Посмотреть всех" link="/about/specialists" />
            </div>
          </>
        ) : (
          <Preloader />
        )}
      </section>

      {/* <section className="home__section home__success">
        <div className="home__title-block">
          <h2 className="home__title">ТЕРРИТОРИЯ УСПЕХА</h2>
          <div className="home__button-container_not-mobile">
            <ButtonWithStar title="Все товары" link="/shop" />
          </div>
        </div>
        {isProductsLoaded ? <ShopItemsGrid items={products.slice(0, sliceIndex)} /> : <Preloader />}
        <div className="home__button-container_mobile">
          <ButtonWithStar title="Все товары" link="/shop" />
        </div>
      </section> */}

      <section className="home__partners">
        <div className="home__title-block">
          <h2 className="home__title">ПАРТНЕРЫ</h2>
          <div className="home__button-container_not-mobile">
            <ButtonWithStar title="Посмотреть всех" link="/partners" />
          </div>
        </div>
        {isPartnersLoading ? <PartnersCards items={partners.results} /> : <Preloader />}
        <div className="home__button-container_mobile">
          <ButtonWithStar title="Посмотреть всех" link="/partners" />
        </div>
      </section>

      <section className="home__documents">
        <h2 className="home__title">УСТАВНЫЕ ДОКУМЕНТЫ</h2>
        <Documents />
      </section>
    </div>
  );
};
