import { NewsCard } from '../NewsCard/NewsCard';
import './NewsPage.sass';
import useMediaQuery from '../../../utils/hooks/useMediaQuery';
import { api } from '../../../utils/api/api';
import { Preloader } from '../../Preloader/Preloader';
import { Pagination } from '../../Pagination/Pagination';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ButtonBackMobile } from '../../ButtonBackMobile/ButtonBackMobile';
import Button from '../../Button/ButtonMain';
import { useNavigate } from 'react-router-dom';

export const NewsPage = () => {
  const [pageData, setPageData] = useState({});
  // const newsData = useSelector((state) => state.news.data);
  // const isNewsDataLoading = useSelector((state) => state.news.isLoading);
  const { title, description, image } = pageData;
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 850px)');
  const [limit, setLimit] = useState(6);
  const [offset, setOffset] = useState(0);
  const [quantity, setQuantity] = useState();
  const [newsData, setNewsData] = useState({});
  const [isNewsDataLoading, setNewsDataIsLoading] = useState(false);
  const [totalData, setTotalData] = useState(null);
  const [page, setPage] = useState(1);

  const checkWindowWidth = () => {
    const screenWidth = window.screen.width;

    if (screenWidth <= 550) {
      return 3;
    } else {
      return 6;
    }
  };

  useEffect(() => {
    api
      .get('/news-page/')
      .then((res) => {
        setPageData(res.data[0]);
      })
      .catch((err) => console.log(err));

    api.get(`/news/`).then((res) => setTotalData(res.data.count, 'res'));
  }, []);

  const fetchNewsData = async () => {
    const limit = checkWindowWidth();
    const response = await api.get(`/news/?limit=${limit}&offset=${(page - 1) * limit}`);
    setNewsDataIsLoading(true);
    setNewsData(response.data);
    setQuantity(response.data.count);
    setLimit(limit);
  };

  useEffect(() => {
    fetchNewsData();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


  return (
    <section className="news">
      <div className="partners__buttonBack">
        {isMobile ? (
          <ButtonBackMobile action={() => navigate(-1)} />
        ) : (
          <Button title="Назад" size="73px" height="38px" action={() => navigate(-1)} />
        )}
      </div>
      {pageData.title ? (
        <>
          <h1 className="news__title">{title.toUpperCase()}</h1>
          <div className="news__description">
            <p className="news__text">{description}</p>
            <img src={image} alt="новости" className="news__img" />
          </div>
          {isNewsDataLoading ? (
            <div className="news__cards">
              {newsData.results &&
                newsData.results.map((el, index) => (
                  <NewsCard marginBottom="128px" item={el} key={index} />
                ))}
            </div>
          ) : (
            <Preloader />
          )}
        </>
      ) : (
        <Preloader />
      )}

      {quantity >= limit && (
        <Pagination
          totalData={Math.ceil(newsData?.count / limit)}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};
