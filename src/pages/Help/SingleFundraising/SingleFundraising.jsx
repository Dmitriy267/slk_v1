import './SingleFundraising.sass';
import { useEffect, useState } from 'react';
import { FundraisingChart } from '../../../components/FundraisingCard/FundraisingChart/FundraisingChart';
import Button from '../../../components/Button/ButtonMain';
import { ButtonBackMobile } from '../../../components/ButtonBackMobile/ButtonBackMobile';
import { useLocation, useNavigate } from 'react-router-dom';
import useMediaQuery from '../../../utils/hooks/useMediaQuery';
import { FundraisingCard } from '../../../components/FundraisingCard/FundraisingCard';
import { v4 as uuidv4 } from 'uuid';
import usePagination from '../../../hooks/usePagination';
import { Pagination } from '../../../components/Pagination/Pagination';
import { api } from '../../../utils/api/api';
import { Preloader } from '../../../components/Preloader/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../../components/Modal/modal';
import { CurrentDonation } from '../../../components/CurrentDonation/CurrentDonation';
import { setActiveFund } from '../../../store/DataSlices/activeFund';

export const SingleFundraising = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [fundraising, setFundraising] = useState({});
  const [isFundLoaded, setIsFundLoeader] = useState(false);
  const [currentSum, setCurrentSum] = useState(0);
  const [supporters, setSupporters] = useState('');
  const allFundrisings = useSelector((state) => state.fundraising.data);
  const allFundLoaded = useSelector((state) => state.fundraising.isLoading);
  const [fundrasingModal, setFundrasingModal] = useState(false);
  const [allSupportersHidden, setAllSupportersHidden] = useState(true);

  const isMobile = useMediaQuery('(max-width: 850px)');
  const isPagination = useMediaQuery('(max-width: 600px)');

  // Создание строки с именами тех, кто поддержал проект
  const createSupportersString = () => {
    let result = { names: '', else: '' };
    if (supporters?.length === 0) return;
    if (supporters?.length <= 3) result = { names: supporters.join(', '), else: '' };
    if (supporters?.length > 3)
      result = {
        names: supporters.slice(0, 3).join(', '),
        else: ` и еще ${supporters?.length - 3}.`,
        others: `, ${supporters?.slice(3).join(', ')}.`
      };
    return result;
  };

  // Использование кастомного хука usePagination
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    gaps,
    setPage,
    totalPages
  } = usePagination({
    contentPerPage: 1,
    count: allFundrisings.length
  });

  const clickHandler = () => {
    setAllSupportersHidden(!allSupportersHidden);
  };

  const clickOpenPayModal = () => {
    dispatch(setActiveFund(fundraising.id))
    setFundrasingModal(true);
  }

  useEffect(() => {
    const slug = pathname.split('/')[2];
    api
      .get(`/assistance/collections/${slug}/`)
      .then((res) => {
        setFundraising(res.data);
        setIsFundLoeader(true);

        // Считаем сумму которую уже пожертвовали и имена
        let sum = 0;
        let names = [];
        res.data.supports?.forEach((el) => {
          sum = sum + el.sum;
          names.push(el.name);
        });
        setCurrentSum(sum);
        setSupporters(names);
      })
      .catch((err) => console.log(err));
  }, [pathname]);

  return (
    <section className="single-fundrising">
      {fundrasingModal ? (
        <Modal closePopup={() => setFundrasingModal(false)}>
          <CurrentDonation
            description={`Добровольное пожертвование по сбору ${fundraising.title}`}
          />
        </Modal>
      ) : null}
      <div className="single-fundrising__top-block">
        {window.innerWidth < 850 ? (
          <ButtonBackMobile action={() => navigate(-1)} />
        ) : (
          <Button title="Назад" size="73px" height="38px" action={() => navigate(-1)} />
        )}
      </div>

      {isFundLoaded ? (
        <div className="single-fundrising__proper-fundrising">
          <div className="single-fundrising__info">
            <div className="single-fundrising__img-container">
              <img className="single-fundrising__img" src={fundraising.image} alt={''} />
            </div>

            <h1 className="single-fundrising__title">{fundraising.title.toUpperCase()}</h1>
            <p className="single-fundrising__description">{fundraising.description}</p>
          </div>

          <FundraisingChart
            amountNeeded={fundraising.collection}
            amountCurrent={currentSum}
            isBig={true}
          />

          <div className="single-fundrising__btn-container">
            <Button title="Помочь сейчас" size="260px" action={clickOpenPayModal} />
          </div>
          <p
            className={`single-fundrising__support ${
              (supporters?.length === 0 || !supporters) &&
              'single-fundrising__support_status_hidden'
            }`}
          >
            <span className="single-fundrising__support-us">Нас поддержали: </span>
            {createSupportersString()?.names}
            {allSupportersHidden ? (
              <span className="single-fundrising__support-else" onClick={clickHandler}>
                {createSupportersString()?.else}
              </span>
            ) : (
              <span className="single-fundrising__support-others" onClick={clickHandler}>
                {createSupportersString()?.others}
              </span>
            )}
          </p>
        </div>
      ) : (
        <Preloader />
      )}

      <h2 className="single-fundrising__others-title">АКТУАЛЬНЫЕ БЛАГОТВОРИТЕЛЬНЫЕ СБОРЫ</h2>
      {allFundLoaded ? (
        <div className="single-fundrising__others-container">
          {isPagination
            ? allFundrisings.slice(firstContentIndex, lastContentIndex).map((item) => (
                <>
                  <FundraisingCard item={item} isHelpPage={true} key={uuidv4()} />
                  <Pagination options={{ nextPage, prevPage, page, gaps, setPage, totalPages }} />
                </>
              ))
            : allFundrisings
                .slice(0, 2)
                .map((item) => <FundraisingCard item={item} isHelpPage={true} key={uuidv4()} />)}
          {/* {fundraisingItems.slice(0, 2).map((item) => (
          <FundraisingCard item={item} isHelpPage={true} key={uuidv4()} />
        ))} */}
        </div>
      ) : (
        <Preloader />
      )}
    </section>
  );
};
