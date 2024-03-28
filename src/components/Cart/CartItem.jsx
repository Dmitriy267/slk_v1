import './CartItem.sass';
import useMediaQuery from '../../utils/hooks/useMediaQuery';

export const CartItem = ({ data }) => {
  const { title, description, files, id, price, short_description } = data;
  const isMobile = useMediaQuery('(max-width: 850px)');
  // let countString;
  // if (count == 1) {
  //   countString = 'В единственном экземпляре';
  // } else if (count == 0) {
  //   countString = 'Закончились';
  // } else countString = 'Несколько штук';
  return (
    <li className="cartItem" id={id}>
      <div className="cartItem__wrapper">
        <div className="cartItem__img-container">
          <img src={files[0].file} alt="" className="cartItem__img" />
          {isMobile && <p className="cartItem__count">В единственном экземпляре</p>}
        </div>
        <div className="cartItem__about-item">
          <h3 className="cartItem__title">{title}</h3>
          <p className="cartItem__description">{short_description}</p>
          {isMobile ?  <p className="cartItem__price">{price} &#8381;</p> : <p className="cartItem__count">В единственном экземпляре</p>} 
        </div>
       {!isMobile && <p className="cartItem__price">{price} &#8381;</p>} 
      </div>
    </li>
  );
};
