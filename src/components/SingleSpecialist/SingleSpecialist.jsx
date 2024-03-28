import { useNavigate } from 'react-router-dom';
//import { useParams } from 'react-router-dom';
import ButtonU from '../../components/ButtonU/ButtonU';
import { ButtonBackMobile } from '../../components/ButtonBackMobile/ButtonBackMobile';
import SpecialistCard from '../SpecialistCard/SpecialistCard';
import './SingleSpecialist.sass';
//import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Preloader } from '../Preloader/Preloader';
import { useLocation } from 'react-router-dom';
import useMediaQuery from '../../utils/hooks/useMediaQuery';
import { api } from '../../utils/api/api';
import { useSelector } from 'react-redux';

export const SingleSpecialist = () => {
  const { pathname } = useLocation();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 1100px)');
  let navigate = useNavigate();
  const [pageData, setPageData] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const specialists = useSelector(state => state.specialists.data);

  const filterOthers = (id) => {
    const filteredSpecs = specialists.others.filter(spec => spec.id !== id);
    return filteredSpecs;
  }

  useEffect(() => {
    const slug = pathname.split('/')[3];
    api
      .get(`center/specialists/${slug}`)
      .then((res) => {
        setPageData(res.data);
        setIsDataLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [pathname]);

  return (
    <>
      {isDataLoaded ? (
        <section className="singleEmployee">
          <div className="singleEmployee__header">
            {isMobile ? (
              <ButtonBackMobile action={() => navigate(-1)} />
            ) : (
              <ButtonU title="Назад" size="73px" height="38px" action={() => navigate(-1)} />
            )}
          </div>
          <div className="singleEmployee__content">
            <article className="singleEmployee__item">
              <h2 className="singleEmployee__item-title">{`${pageData.last_name} ${pageData.first_name} ${pageData.middle_name}`}</h2>
              <p className="singleEmployee__item-position">{pageData.position}</p>
              <p className="singleEmployee__item-text" key={uuidv4()}>
                {pageData.info} 
              </p>

              <img src={pageData.image} alt="" className="singleEmployee__item-img" />
            </article>
            <div className="singleEmployee__aditional">
              <h2 className="singleEmployee__aditional-title">Другие специалисты</h2>
              <div className="singleEmployee__aditional-cards">
                <SpecialistCard employee={filterOthers(pageData.id)[0]} />
                <SpecialistCard employee={filterOthers(pageData.id)[1]} />
                {
                  isTablet && <SpecialistCard employee={filterOthers(pageData.id)[2]} />
                }
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
