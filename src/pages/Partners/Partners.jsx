import './Partners.sass';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../../utils/hooks/useMediaQuery';
import { useState, useEffect } from 'react';
import Button from '../../components/Button/ButtonMain';
import { ButtonBackMobile } from '../../components/ButtonBackMobile/ButtonBackMobile';
import { Pagination } from '../../components/Pagination/Pagination';
import { HelpBlock } from '../../components/HelpBlock/HelpBlock';
import { api } from '../../utils/api/api';
import { Preloader } from '../../components/Preloader/Preloader';

export const Partners = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 850px)');
  const [dataPage, setDataPage] = useState({});
  const [limit, setLimit] = useState(6);
  const [isDataLoading, setDataIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState();

  const [page, setPage] = useState(1);

  const checkWindowWidth = () => {
    const screenWidth = window.screen.width;

    if (screenWidth <= 550) {
      return 8;
    } else {
      return 16;
    }
  };

  // Запрос списка партнеров для страницы
  const fetchNewsData = async () => {
    const limit = checkWindowWidth();
    const response = await api.get(`/partners/?limit=${limit}&offset=${(page - 1) * limit}`);
    setDataIsLoading(true);
    setData(response.data);
    setQuantity(response.data.count);
    setLimit(limit);
  };

  useEffect(() => {
    fetchNewsData();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Запрос данных для текста на странице
  useEffect(() => {
    api
      .get('/partners-page/')
      .then((res) => {
        setDataPage(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <section className="partners">
        <div className="partners__buttonBack">
          {isMobile ? (
            <ButtonBackMobile action={() => navigate(-1)} />
          ) : (
            <Button title="Назад" size="73px" height="38px" action={() => navigate(-1)} />
          )}
        </div>
        {dataPage && dataPage.title ? (
          <>
            <div className="partners__textBlock">
              <h2 className="partners__title">{dataPage.title.toUpperCase()}</h2>

              <p className="partners__subtitle">{dataPage.texts[0].text}</p>
              {dataPage.texts.slice(1).map((el) => (
                <p className="partners__text" key={`partners-text-${el.id}`}>
                  {el.text}
                </p>
              ))}
            </div>
          </>
        ) : (
          <Preloader />
        )}

        <div className="partners__contacts-container">
          {isDataLoading &&
            data.results.map((el, index) => (
              <a href={el.url} target='_blank' rel="noreferrer">
                <img className="partners__img" src={el.image} alt={el.text} key={index} />
              </a>
            ))}
        </div>
      </section>

      {quantity >= limit && (
        <Pagination
          totalData={Math.ceil(data?.count / limit)}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}

      <section className="partners__help-block">
        <HelpBlock title="Я хочу помочь" titleBtn="Я хочу помочь" />
      </section>
    </>
  );
};
