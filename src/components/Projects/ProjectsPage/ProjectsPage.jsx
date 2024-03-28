import './ProjectsPage.sass';
import ProjectBlock from '../ProjectBlock/ProjectBlock';
import ButtonU from '../../ButtonU/ButtonU';
import React, { useEffect, useState } from 'react';
import { Pagination } from '../../Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../../../utils/hooks/useMediaQuery';
import { v4 as uuidv4 } from 'uuid';
import { HelpBlock } from '../../HelpBlock/HelpBlock';
import { ButtonBackMobile } from '../../ButtonBackMobile/ButtonBackMobile';
import { Preloader } from '../../Preloader/Preloader';
import { api } from '../../../utils/api/api';
import { checkWindowWidth } from '../../../helpers/setQuantity';

export const ProjectsPage = () => {
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-width: 700px)');
  // const isTablet = useMediaQuery('(max-width: 1200px)');

  // Для пагинации
  const [limit, setLimit] = useState(6);
  const [isItemsLoading, setItemsIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState();
  const [page, setPage] = useState(1);

  // Запрос списка специалистов для страницы
  const fetchNewsData = async () => {
    const limit = checkWindowWidth(3, 6);
    const response = await api.get(
      `/projects/?limit=${limit}&offset=${(page - 1) * limit}`
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
  <section className="projects-page">
    <div className="project-page__top-block">
    {window.innerWidth < 850 ? (
      <ButtonBackMobile action={() => navigate(-1)} />
    ) : (
      <ButtonU
        title="Назад"
        size="73px"
        height="38px"
        action={() => navigate(-1)}
      />
    )}
  </div>
    <div className="container">
       <h2 className="projects-page__title">ВСЕ ПРОЕКТЫ</h2>
        <div className="project__items">
          <div className="help-main__projects-container">
            {isItemsLoading ? (
              data.results.map((item) => (
                <ProjectBlock
                  title={item.title}
                  image={item.image}
                  description={item.short_description}
                  isOpen={item.status}
                  key={uuidv4()}
                  slug={item.slug}
                />
              ))
            ) : (
              <Preloader />
            )}
          </div>
        </div>

        <div className="help-main__pagination">
          {quantity >= limit && (
            <Pagination
              totalData={Math.ceil(data?.count / limit)}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}
        </div>

        <HelpBlock marginBottom="128px" />
      </div>
    </section>
  );
};
