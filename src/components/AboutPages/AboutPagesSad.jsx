import './AboutPages.sass';
import Button from '../Button/ButtonMain';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useSelector } from 'react-redux';
import { Preloader } from '../Preloader/Preloader';
import { useState } from 'react';
import { useEffect } from 'react';
import { ButtonBackMobile } from '../ButtonBackMobile/ButtonBackMobile';

export const AboutPagesSad = () => {
  const aboutSadData = useSelector((state) => state.aboutSad.data);
  const aboutSadDataIsLoading = useSelector((state) => state.aboutSad.isLoading);
  const isTablet = useMediaQuery('(max-width: 1100px)');
  const isMobile = useMediaQuery('(max-width: 700px)');
  const navigate = useNavigate();

  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    if (aboutSadDataIsLoading && aboutSadData.texts.length > 0) {
      setIsPageReady(true);
    } else {
      setIsPageReady(false);
    }
  }, [aboutSadData, aboutSadDataIsLoading]);

  return (
    <section className={`aboutPages ${!isPageReady && 'aboutPages_status_preloader'}`}>
      {!isPageReady ? (
        <Preloader />
      ) : (
        <>
          <div className="aboutPages__header">
          {
            window.innerWidth < 850 ? <ButtonBackMobile action={() => navigate(-1)} /> : <Button title='Назад' size='73px' height='38px' action={() => navigate(-1)} />
          }
            <div className="aboutPages__header-title">
              <h1 className="aboutPage__title">
                {aboutSadDataIsLoading && aboutSadData.title.toUpperCase()}
              </h1>
            </div>
          </div>
          <div className="aboutPage__text-block">
            {isTablet ? (
              ''
            ) : (
              <img
                src={aboutSadDataIsLoading ? aboutSadData.image : ''}
                alt=""
                className="aboutPages__img"
              />
            )}
            <p className="aboutPage__paragraph aboutPages__paragraph_type_bold">
              {aboutSadDataIsLoading && aboutSadData.texts[0].text}
            </p>

            {isTablet ? (
              <img
                src={aboutSadDataIsLoading ? aboutSadData.image : ''}
                alt=""
                className="aboutPages__img"
              />
            ) : (
              ''
            )}

            {aboutSadDataIsLoading &&
              aboutSadData.texts.slice(1).map((el) => (
                <p className="aboutPage__paragraph" key={`aboutSadText-${el.id}`}>
                  {el.text}
                </p>
              ))}
          </div>
        </>
      )}
    </section>
  );
};
