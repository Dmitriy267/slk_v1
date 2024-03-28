import './Donation.sass';
import Button from '../../../components/Button/ButtonMain';
import logoSPB from '../../../assets/icons/logoSPB.svg';
import { DonationButton } from './components/DonationButton';
import { Modal } from '../../../components/Modal/modal';
import { DonationChoice } from '../../../components/DonationChoice/DonationChoice';
import { useState } from 'react';
import { CurrentDonation } from '../../../components/CurrentDonation/CurrentDonation';

const donationAmounts = [250, 500, 750, 1000];

export const Donation = ({
  handleClickPay,
  navigate,
  isDonationChoice,
  handleDonation,
  currentAmount,
  closeDonationModal
}) => {
  const [fundrasingModal, setFundrasingModal] = useState(false);
  return (
    <section className="home__section home__section-donation">
      {isDonationChoice && (
        <Modal closePopup={closeDonationModal}>
          <DonationChoice currentAmount={currentAmount} handleClickPay={handleClickPay} afterPay={closeDonationModal} />{' '}
        </Modal>
      )}
      {fundrasingModal ? (
        <Modal closePopup={() => setFundrasingModal(false)}>
          <CurrentDonation description={`Добровольное пожертвование`} afterPay={() => setFundrasingModal(false)} />
        </Modal>
      ) : null}
      <div className="home__button-wrapper">
        <p className="home__section-donation-text">
          Даже самый маленький взнос становится огромным, если поступает каждый месяц
        </p>
        <div className="home__donation-button-block">
          {donationAmounts.map((amount, index) => (
            <DonationButton
              key={index}
              handleDonation={handleDonation}
              amount={amount}
              // className={'home__button-donation'}
            >
              {' '}
            </DonationButton>
          ))}

          <button
            className="home__button-donation home__button-donation-other"
            type="button"
            style={{ width: `188px` }}
            onClick={() => setFundrasingModal(true)}
          >
            Другая сумма
          </button>

          <Button title="Я хочу помочь" size="281px" action={() => navigate('/help')} />
        </div>
        <div className="home__donation-span">
          <p className="home__donation-text">Пожертвование через</p>
          <img src={logoSPB} alt={'Лого СПБ'} />
        </div>
      </div>
    </section>
  );
};
