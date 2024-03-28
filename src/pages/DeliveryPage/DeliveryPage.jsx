import { ButtonBackMobile } from '../../components/ButtonBackMobile/ButtonBackMobile';
import Button from '../../components/Button/ButtonMain';
import useMediaQuery from '../../utils/hooks/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import './DeliveryPage.sass';

const DeliveryPage = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const navigate = useNavigate();

  return (
    <>
      <div className="delivery__top-block">
        {isMobile ? (
          <ButtonBackMobile action={() => navigate(-1)} />
        ) : (
          <Button
            title="Назад"
            size="73px"
            height="38px"
            action={ () => navigate(-1) }
          />
        )}
      </div>

      <section className="delivery">
        <h2 className="delivery__title">Доставка</h2>

        <p className="delivery__text">
          Мы свяжемся с вами для расчёта стоимости доставки в ближайшее время.
          <span className="red-star">*</span>
        </p>

        <small className="delivery__description">
          <span className="red-star">*</span>
          Обработка запросов по доставке осуществляется  с 8:00 до 17:00 </small>
      </section>
    </>
  )
}

export default DeliveryPage;
