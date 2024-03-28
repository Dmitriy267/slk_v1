import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../Button/ButtonMain';
import { NewsCard } from '../NewsCard/NewsCard';
import './SingleNews.sass';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Preloader } from '../../Preloader/Preloader';
import { api } from '../../../utils/api/api';
import useMediaQuery from '../../../utils/hooks/useMediaQuery';
import { ButtonBackMobile } from '../../ButtonBackMobile/ButtonBackMobile';

export const SingleNews = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const { id } = useParams();
  const newsData = useSelector((state) => state.news.data).results;
  const isNewsDataLoading = useSelector((state) => state.news.isLoading);
  const [isItemsLoading, setIsItemsLoading] = useState(false);
  const [card, setCard] = useState({});
  const isThree = useMediaQuery('(max-width: 1250px)');
  const [index, setIndex] = useState(2);
  let navigate = useNavigate();

  // Дата с бэка приходит в качестве строки. Функция корректно обрабатывает дату с бэка и локализирует ее
  const formatDate = (string) => {
    const unixTime = Date.parse(string);
    const date = new Intl.DateTimeFormat('ru-RU').format(unixTime);
    return date;
  };

  // Запрос данных новости
  const fetchData = async () => {
    const response = await api.get(`/news/${id}`);
    setCard(response.data);
    setIsItemsLoading(true);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (isThree) {
      setIndex(3);
    } else setIndex(2);
  }, [isThree]);

  //меняем индекс массива стрелочками:

  const imgIndexInсrement = () => {
    if (imgIndex > card?.files.length) {setImgIndex((prev) => prev + 1);}
  };

  const imgIndexDecrement = () => {
    if (imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      {isItemsLoading ? (
        <section className="singleNews">
        <div className="singleNews__btn-container">
          {window.innerWidth < 850 ? (
            <ButtonBackMobile action={() => navigate(-1)} />
          ) : (
            <Button title="Назад" size="73px" height="38px" action={() => navigate(-1)} />
          )}
        </div>
          <div className="singleNews__content">
            <article className="singleNews__item">
              <p className="singleNews__item-date">{formatDate(card.created_at)}</p>
              <h2 className="singleNews__item-title">{card.title}</h2>

              {card.texts.map((el) => (
                <p className="singleNews__item-text" key={uuidv4()}>
                  {el.text}
                </p>
              ))}
              <div className="singleNews__image-container">
                <div
                  className="singleNews__left-click-button"
                  onClick={() => imgIndexDecrement()}
                />
                <img src={card.files[imgIndex].file} alt="" className="singleNews__item-img" />
                <div
                  className="singleNews__right-click-button"
                  onClick={() => imgIndexInсrement()}
                />
              </div>
            </article>
            <div className="singleNews__aditional">
              <h2 className="singleNews__aditional-title">Другие новости</h2>
              <div className="singleNews__aditional-cards">
                {isNewsDataLoading &&
                  newsData.filter(item => item.id !== card.id).slice(0, index).map((el) => <NewsCard item={el} key={el.slug} />)}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Preloader />
      )}
    </>
  );
};
