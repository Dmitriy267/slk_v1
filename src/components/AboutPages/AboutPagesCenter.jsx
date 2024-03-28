import './AboutPages.sass';
import Button from '../Button/ButtonMain';
import { CenterNumbers } from '../CenterNumbers/CenterNumbers';
import { AboutItemCard } from '../AboutItemCard/AboutItemCard';
import useMediaQuery from '../../utils/hooks/useMediaQuery';
import { SliderMobile } from '../SliderMobile/SliderMobile';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ButtonBackMobile } from '../ButtonBackMobile/ButtonBackMobile';
import { useEffect, useState } from 'react';

export const AboutPagesCenter = () => {
  const aboutCenterData = useSelector((state) => state.aboutCenter.data);
  const isLoading = useSelector((state) => state.aboutCenter.isLoading);
  const edSiteUrl = useSelector((state) => state.edSite.data);
  const isMobile = useMediaQuery('(max-width: 700px)');
  const navigate = useNavigate();
  const [keyParagraph, setKeyParagraph] = useState(0);
  const [centerItems, setCenterItems] = useState([]);
  const srv = useSelector((state) => state.aboutSrv.data);
  const sad = useSelector((state) => state.aboutSad.data);
  const school = useSelector((state) => state.aboutSchool.data);
  const masterskie = useSelector((state) => state.aboutWorkshop.data);
  const specialists = useSelector((state) => state.specialistsPage.data);

  // Считаем количество символов в параграфах и определям как разделить массив параграфов
  // Вынести в отдельный файл для оптимизации
  const countSymbols = (data) => {
    const paragraphs = data.texts.slice(1);
    let symbolsAmount = 0;
    for (let i = 0; i <= paragraphs.length; i++) {
      const paragraphSymbols = data.texts[i].text.length;
      symbolsAmount = paragraphSymbols + symbolsAmount;
      if (symbolsAmount <= 550) {
        setKeyParagraph(i);
      } else {
        return;
      }
    }
  };

  // Подготовка массива для отрисовки блока с кратким описанием центра по каждому направлению
  // Вынести в отдельный файл для оптимизации
  const createArray = (srv, sad, school, masterskie, specialists) => {
    // Массив с путями для кнопки Подробнее
    const nav = ['srv', 'sad', 'school', 'masterskie', 'specialists'];
    let array = [srv, sad, school, masterskie, specialists];
    array = array.map((item) =>
      item.description
        ? { ...item, block_description: item.description, id: 5, nav: nav[array.indexOf(item)] }
        : { ...item, nav: nav[array.indexOf(item)] }
    );

    return array;
  };

  // Используем функцию счета количества символов в параграфах
  useEffect(() => {
    if (!isLoading) return;
    countSymbols(aboutCenterData);
  }, [isLoading, aboutCenterData]);

  // Используем функцию для подготовки массива для отрисовки элементов страницы о центре карточки
  useEffect(() => {
    setCenterItems(createArray(srv, sad, school, masterskie, specialists));
  }, [srv, sad, school, masterskie, specialists]);

  return (
    <>
      <section className="aboutPages">
        <div className="aboutPages__btn-back-block">
          {window.innerWidth < 850 ? (
            <ButtonBackMobile action={() => navigate(-1)} />
          ) : (
            <Button title="Назад" size="73px" height="38px" action={() => navigate(-1)} />
          )}
        </div>

        <h1 className="aboutPage__title">{isLoading && aboutCenterData.title.toUpperCase()}</h1>
        <div className="aboutPage__text-block aboutPage__text-block_mobile">
          <div className="aboutPage__block-with-img">
            <div className="aboutPage__block-with-paragraphs">
              <p className="aboutPage__paragraph aboutPages__paragraph_type_bold">
                {isLoading && aboutCenterData.texts[0].text}
              </p>

              {isLoading &&
                aboutCenterData.texts.slice(1, keyParagraph + 2).map((el) => (
                  <p className="aboutPage__paragraph" key={`aboutCenter-${el.id}`}>
                    {el.text}
                  </p>
                ))}
            </div>
            <img
              src={isLoading ? aboutCenterData.image : ''}
              alt=""
              className="aboutPages__img_type_about-page"
            />
          </div>

          <div className="aboutPage__block">
            <div className="aboutPage__block-counts">
              <div className="aboutPage__counter_not-mobile">
                <CenterNumbers isFlexColumn={true} />
              </div>
              {isLoading &&
                aboutCenterData.texts.slice(keyParagraph + 2).map((el) => (
                  <p className="aboutPage__paragraph" key={`aboutCenter-${el.id}`}>
                    {el.text}
                  </p>
                ))}
              <div className="aboutPage__counter_mobile">
                <CenterNumbers isFlexColumn={true} />
              </div>
            </div>
          </div>

          <div className="aboutPage__btn-container">
            <Button
              title="Перейти на образовательный сайт"
              size="100%"
              action={() => (document.location = `${edSiteUrl.url}`)}
            />
          </div>
        </div>
      </section>
      <section className="about-page__cards">
        {!isMobile ? (
          centerItems?.map((item) => (
            <AboutItemCard project={item} index={centerItems.indexOf(item)} key={`item-card-${Math.random()}`} />
          ))
        ) : (
          <div className="about-page__slider-container">
            <SliderMobile data={centerItems} type="AboutItemCard" />
          </div>
        )}
      </section>
    </>
  );
};
