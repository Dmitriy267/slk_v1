import Button from '../Button/ButtonMain';
import './HelpBlock.sass';
import useMediaQuery from '../../utils/hooks/useMediaQuery';
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from '../Modal/modal';
import { CurrentDonation } from '../CurrentDonation/CurrentDonation';

export const HelpBlock = ({ titleBtn = 'Я хочу помочь', marginBottom = '0' }) => {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const [fundrasingModal, setFundrasingModal] = useState(false);

  return (
    <div className="helpBlock" style={{ marginBottom: `${marginBottom}` }}>
      {fundrasingModal ? (
        <Modal closePopup={() => setFundrasingModal(false)}>
          <CurrentDonation description={`Добровольное пожертвование`} />
        </Modal>
      ) : null}
      <h3 className="helpBlock__title">70 СЕМЕЙ ИЗ ТОЛЬЯТТИ КАЖДЫЙ ДЕНЬ ЗАВИСЯТ ОТ НАШЕЙ РАБОТЫ</h3>
      <div className="helpBlock__text">
        <p className="helpBlock__description">
          {'Центру требуется регулярная поддержка'.toUpperCase()}
        </p>
        <p className="helpBlock__description">{'благотворителей и волонтеров'.toUpperCase()}</p>
      </div>
      <Button
        size={isMobile ? '210px' : '281px'}
        title={titleBtn}
        action={() => setFundrasingModal(true)}
      />
    </div>
  );
};
