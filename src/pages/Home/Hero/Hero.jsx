import React from 'react';
import './Hero.sass';
import ButtonWithStar from '../../../components/ButtonWithStar/ButtonWithStar';
import age from './assets/age.svg';
import { useSelector } from 'react-redux';
// import poster from './assets/poster.jpg';
// import useMediaQuery from '../../../hooks/useMediaQuery'

export const Hero = () => {
  // const isMobile = useMediaQuery('(max-width: 500px)')
  // const video = useSelector((state) => state.homeCenter.data.video);
  const isDataLoading = useSelector((state) => state.homeCenter.isLoading);

  return (
    <section className="home__hero">
      <div className='home__hero-overlay'></div>
      {isDataLoading && (
        <>
          <div className="home__hero-container">
            {/* <video className="home__hero-video" autoPlay loop muted poster={poster}>
              {
                !isMobile && <source src={video} type="video/mp4" />
              }
            </video> */}

            <div className="home__hero-wrapper">
              <h1 className="home__hero-title">
                Центр для особых детей<span>{'\n'}«Солнечный круг»</span>
              </h1>
              <div className="button-wraper">
                <ButtonWithStar title="Подробнее о центре" link="/about" />
              </div>
            </div>

            <button className="home__hero-age">
              <img src={age} alt="возрастное ограничение 12+" />
            </button>
          </div>
        </>
      )}
    </section>
  );
};
