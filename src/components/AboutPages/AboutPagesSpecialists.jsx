import './AboutPages.sass';
import Button from '../Button/ButtonMain';
import { Specialists } from '../Specialists/Specialists';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useSelector } from 'react-redux';
import { Preloader } from '../Preloader/Preloader';
import { ButtonBackMobile } from '../ButtonBackMobile/ButtonBackMobile';
import { useState, useEffect } from 'react';
import { checkWindowWidth } from '../../helpers/setQuantity';
import { api } from '../../utils/api/api';
import { Pagination } from '../Pagination/Pagination';

export const AboutPagesSpecialists = () => {
  const isTablet = useMediaQuery('(max-width: 1100px)');
  const isMobile = useMediaQuery('(max-width: 700px)');
  const navigate = useNavigate();
  // Использование store
  const isDataLoading = useSelector((state) => state.specialistsPage.isLoading);
  const pageContent = useSelector((state) => state.specialistsPage.data);
  // Для пагинации
  const [limit, setLimit] = useState(9);
  const [isItemsLoading, setItemsIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState();
  const [page, setPage] = useState(1);

  // Запрос списка специалистов для страницы
  const fetchNewsData = async () => {
    const limit = checkWindowWidth(3, 9);
    const response = await api.get(
      `/center/specialists/?limit=${limit}&offset=${(page - 1) * limit}`
    );
    setItemsIsLoading(true);
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


  return (
    <>
      <section className="aboutPages">
        {isDataLoading ? (
          <>
            <div className="aboutPages__header">
              {window.innerWidth < 850 ? (
                <ButtonBackMobile action={() => navigate(-1)} />
              ) : (
                <Button title="Назад" size="73px" height="38px" action={() => navigate(-1)} />
              )}
              <div className="aboutPages__header-title">
                <h1 className="aboutPage__title">{pageContent.title.toUpperCase()} </h1>
              </div>
            </div>
            <div className="aboutPage__text-block">
              {isTablet ? '' : <img src={pageContent.image} alt="" className="aboutPages__img" />}
              <p className="aboutPage__paragraph">{pageContent.description}</p>
              {isTablet ? <img src={pageContent.image} alt="" className="aboutPages__img" /> : ''}
            </div>

            {isItemsLoading && <Specialists data={data.results} />}
          </>
        ) : (
          <Preloader />
        )}
        {quantity >= limit && (
          <Pagination
            totalData={Math.ceil(data?.count / limit)}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </>
  );
};
