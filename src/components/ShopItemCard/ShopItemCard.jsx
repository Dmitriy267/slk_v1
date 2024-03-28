import './ShopItemCard.sass';
import { formatNum } from '../../utils/formatNumToMoney';
import { useNavigate } from 'react-router-dom';

const ShopItemCard = ({item, style, isLarge }) => {
  const {files, title, price, short_description, slug} = item;
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/shop/${slug}`)
  }

  const handleLikeClick = (event) => {
    event.stopPropagation();
    alert('Добавлено в избранное')
  }

  return (
    <div className='shop-item-card' style={style} onClick={handleClick}>
      <img className={`shop-item-card__img ${!isLarge ? 'shop-item-card__img_small' : ''}`} src={files[0].file} alt={title} />
      <div className={`shop-item-card__text ${!isLarge ? 'shop-item-card__text_small' : ''}`}>
        <h3 className={isLarge ? 'shop-item-card__title' : 'shop-item-card__title_small'}>{title}</h3>
        <p className={isLarge ? 'shop-item-card__description' : 'shop-item-card__description_small'}>{short_description}</p>
        <div className="shop-item-card__price-content">
          <p className={isLarge ? 'shop-item-card__price' : 'shop-item-card__price_small'}>{formatNum(+ price)} &#x20bd;</p>
          <button className={isLarge ? 'shop-item-card__button' : 'shop-item-card__button_small'} onClick={(event) => handleLikeClick(event)}>
            <div className={isLarge ? 'shop-item-card__like-button' : 'shop-item-card__like-button_small'}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShopItemCard;
