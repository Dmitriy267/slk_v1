import './HelpMain.sass';
import { HelpBlock } from '../../../components/HelpBlock/HelpBlock';
import Button from '../../../components/Button/ButtonMain';
import { FundraisingCard } from '../../../components/FundraisingCard/FundraisingCard';
import { Pagination } from '../../../components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../../../utils/hooks/useMediaQuery';
import { useState, useEffect } from 'react';
import { ButtonBackMobile } from '../../../components/ButtonBackMobile/ButtonBackMobile';
import { Preloader } from '../../../components/Preloader/Preloader';
import { api } from '../../../utils/api/api';
import { checkWindowWidth } from '../../../helpers/setQuantity';

const HelpMain = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 850px)');

  // Для пагинации
  const [limit, setLimit] = useState(6);
  const [isItemsLoading, setItemsIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState();
  const [page, setPage] = useState(1);

  // Запрос списка специалистов для страницы
  const fetchNewsData = async () => {
    const limit = checkWindowWidth(1, 6);
    const response = await api.get(
      `/assistance/collections/?limit=${limit}&offset=${(page - 1) * limit}`
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
      <section className="help-main__section help-main__section_type_how">
        <div className="help-main__btn-container">
          {window.innerWidth < 850 ? (
            <ButtonBackMobile action={() => navigate(-1)} />
          ) : (
            <Button title="Назад" size="73px" height="38px" action={() => navigate(-1)} />
          )}
        </div>

        <h2 className="help-main__title">КАК ПОМОЧЬ</h2>

        <div className="help-main__how-buttons">
          {window.innerWidth < 850 ? (
            <Button
              title="Стать волонтёром"
              size="256px"
              height="48px"
              action={() => navigate('/help/volunteering')}
            />
          ) : (
            <Button
              title="Стать волонтёром"
              size="281px"
              action={() => navigate('/help/volunteering')}
            />
          )}  
          {window.innerWidth < 850? (
            <Button title="Посмотреть отчёты" size="256px" height="48px" action={() => navigate('/help/reports')} />
          ) : (
            <Button title="Посмотреть отчёты" size="281px" action={() => navigate('/help/reports')} />
          )} 
        </div>
      </section>
      <section className="help-main__help-block">
        <HelpBlock title="Сделать пожертвование" titleBtn="Сделать пожертвование" />
      </section>

      <section className="help-main__section help-main__section_type_projects">
        <h2 className="help-main__title">АКТУАЛЬНЫЕ БЛАГОТВОРИТЕЛЬНЫЕ СБОРЫ</h2>
        <div className="help-main__projects-container">
          {isItemsLoading ? (
            data.results.map((item) => (
              <FundraisingCard item={item} isHelpPage={true} key={item.id} />
            ))
          ) : (
            <Preloader />
          )}
        </div>
      </section>

      {quantity >= limit && (
        <div className="help-main__pagination">
          <Pagination
            totalData={Math.ceil(data?.count / limit)}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default HelpMain;
