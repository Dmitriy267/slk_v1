import './AboutPages.sass';
import Button from '../Button/ButtonMain';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useSelector } from 'react-redux';
import { ButtonBackMobile } from '../ButtonBackMobile/ButtonBackMobile';

export const AboutPagesSchool = () => {
  const aboutSchoolData = useSelector((state) => state.aboutSchool.data);
  const isDataLoading = useSelector((state) => state.aboutSchool.isLoading);
  const isTablet = useMediaQuery('(max-width: 1100px)');
  const isMobile = useMediaQuery('(max-width: 700px)');
  const navigate = useNavigate();

  return (
    <section className="aboutPages">
      <div className="aboutPages__header">
      {
            window.innerWidth < 850 ? <ButtonBackMobile action={() => navigate(-1)} /> : <Button title='Назад' size='73px' height='38px' action={() => navigate(-1)} />
          }
        <div className="aboutPages__header-title">
          <h1 className="aboutPage__title">
            {isDataLoading && aboutSchoolData.title.toUpperCase()}
          </h1>
        </div>
      </div>
      <div className="aboutPage__text-block">
        {isTablet ? (
          ''
        ) : (
          <img
            src={isDataLoading ? aboutSchoolData.image : ''}
            alt=""
            className="aboutPages__img"
          />
        )}
        <p className="aboutPage__paragraph aboutPages__paragraph_type_bold">
          {isDataLoading && aboutSchoolData.texts[0].text}
        </p>
        {isTablet ? (
          <img
            src={isDataLoading ? aboutSchoolData.image : ''}
            alt=""
            className="aboutPages__img"
          />
        ) : (
          ''
        )}
        {isDataLoading &&
          aboutSchoolData.texts.slice(1).map((el) => (
            <p className="aboutPage__paragraph" key={`aboutSadText-${el.id}`}>
              {el.text}
            </p>
          ))}
      </div>
    </section>
  );
};
