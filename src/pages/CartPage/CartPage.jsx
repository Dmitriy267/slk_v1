import Button from '../../components/Button/ButtonMain';
import { useNavigate } from 'react-router-dom';
import { ButtonBackMobile } from '../../components/ButtonBackMobile/ButtonBackMobile';
import useMediaQuery from '../../utils/hooks/useMediaQuery';
import { payment } from '../../vendor/payWidget';
import './CartPage.sass';
import { cartTempData } from '../../tempdata/cart_temp_data';
import { CartItem } from '../../components/Cart/CartItem';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export const CartPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 850px)');

  const cartItems = useSelector(state => state.cart.data)

  const price = useMemo(() => cartItems.map(item => item.price).reduce((prev, next) => prev + next))
  // const cartPayment = (props) => {
  //     payment(props)
  // }

  return (
    <section className="cartPage">
      <div className="cartPage__btn-container">
        {isMobile ? (
          <ButtonBackMobile action={() => navigate(-1)} />
        ) : (
          <Button title="Назад" size="73px" height="38px" action={() => navigate(-1)} />
        )}
      </div>
      <h2 className="cartPage__title">КОРЗИНА</h2>

      <ul className="cartPage__list">
        {cartItems.map((el) => (
          <CartItem data={el} key={el.id} />
        ))}
      </ul>
      <div className="cartPage__result">
        <div className="cartPage__result-wrapper">
          <div className="cartPage__result-count">
            <p className="cartPage__result-text">Итого</p>
            <p className="cartPage__result-text">{price} &#8381;</p>
          </div>
          <div className="cartPage__result-count">
            <p className="cartPage__result-text">Самовывоз</p>
            <p className="cartPage__result-text">0 &#8381;</p>
          </div>
        </div>
      </div>
      <Button title="Оформить заказ" height="86px" size="326px" />

      <div className="cartPage__delivery">
        <input type="checkbox" id="delivery" className="cartPage__delivery-input" />
        <label for="delivery" className="cartPage__delivery-lable">
          Оформить доставку товара
        </label>
      </div>
    </section>
  );
};
