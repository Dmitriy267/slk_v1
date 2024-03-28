import { useEffect, useState } from 'react';
import Button from '../Button/ButtonMain';
import './FundraisingCard.sass';
import { FundraisingChart } from './FundraisingChart/FundraisingChart';
import { useNavigate } from 'react-router-dom';
import { CurrentDonation } from '../CurrentDonation/CurrentDonation';
import { Modal } from '../../components/Modal/modal';
import { useDispatch } from 'react-redux';
import { setActiveFund } from '../../store/DataSlices/activeFund';
// import { DonationChoice } from '../DonationChoice/DonationChoice';

export const FundraisingCard = ({ item, isHelpPage = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, image, description, id, collection, supports, slug } = item;
  const [amountCurrent, setAmountCurrent] = useState(0);
  const [nameSupporters, setNameSupporters] = useState('');
  const [allSupportersHidden, setAllSupportersHidden] = useState(true);
  const [fundrasingModal, setFundrasingModal] = useState(false);

  // Создание строки с именами тех, кто поддержал проект
  const createSupportersString = () => {
    let result = { names: '', else: '' };
    if (nameSupporters?.length === 0) return;
    if (nameSupporters?.length <= 3) result = { names: nameSupporters.join(', '), else: '' };
    if (nameSupporters?.length > 3)
      result = {
        names: nameSupporters?.slice(0, 3).join(', '),
        else: ` и еще ${nameSupporters?.length - 3}.`,
        others: `, ${nameSupporters?.slice(3).join(', ')}.`
      };
    return result;
  };

  const clickHandler = () => {
    setAllSupportersHidden(!allSupportersHidden);
  };

  const clickOpenPayModal = () => {
    dispatch(setActiveFund(id))
    setFundrasingModal(true);
  }

  useEffect(() => {
    let currentSum = 0;
    let names = [];
    supports?.forEach((el) => {
      currentSum = currentSum + el.sum;
      names.push(el.name);
    });
    setAmountCurrent(currentSum);
    setNameSupporters(names);
  }, [supports]);

  // const donateButttonHandler = () => {
  //   console.log(fundrasingModal);
  //   setFundrasingModal(true);
  // };

  return (
    <div className={`fund-card ${isHelpPage && 'fund-card_help-page'}`} key={id}>
      {fundrasingModal ? (
        <Modal closePopup={() => setFundrasingModal(false)}>
          <CurrentDonation description={`Добровольное пожертвование по сбору ${title}`} afterPay={() => setFundrasingModal(false) } />
        </Modal>
      ) : null}
      <div className={`fund-card__content ${isHelpPage && 'fund-card__content_help-page'}`}>
        <img className="fund-card__img" src={image} alt={title} />
        <div className="fund-card__title-block">
          <h3 className="fund-card__title">{title}</h3>
        </div>
      </div>
      <p className="fund-card__description">{description}</p>
      <button
        className="fund-card__details-btn"
        type="button"
        onClick={() => navigate(`/help/${slug}`)}
      >
        Подробнее
      </button>
      <FundraisingChart amountCurrent={amountCurrent} amountNeeded={collection} />
      <Button size="260px" title="Помочь сейчас" action={clickOpenPayModal} />
      <p
        className={`fund-card__support ${
          (nameSupporters?.length === 0 || !nameSupporters) && 'fund-card__support_status_hidden'
        }`}
      >
        <span className="fund-card__support-us">Нас поддержали: </span>
        {createSupportersString()?.names}
        {allSupportersHidden ? (
          <span className="fund-card__support-else" onClick={clickHandler}>
            {createSupportersString()?.else}
          </span>
        ) : (
          <span className="fund-card__support-others" onClick={clickHandler}>
            {createSupportersString()?.others}
          </span>
        )}
      </p>
    </div>
  );
};
