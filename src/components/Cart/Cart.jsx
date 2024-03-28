import { useNavigate } from 'react-router-dom';
import './Cart.sass';
import { useDispatch, useSelector } from 'react-redux';
import { setCartData, setCardDataLength } from '../../store/DataSlices/cartItemsSlice';

export const Cart = () => {
  const cartItems = useSelector(state => state.cart.data);
  const navigate = useNavigate()
  
  return (
    <>
    {cartItems.length >= 1 ? <button className="cart" type="button" onClick={() => navigate('/cart-page')}>
      <div className='cart__count-wpapper'>
       <span className="cart__count">{cartItems.length}</span>
        
      </div>
    </button> : ''}
    
    </>
  );
};
