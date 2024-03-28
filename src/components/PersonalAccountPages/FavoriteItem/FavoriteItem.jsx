import './FavoriteItem.sass';
import Button from '../../Button/ButtonMain';

export const FavoriteItem = ({data}) => {
  const card = data;
  const { title, text, single, image, sum} = card;


  return (
    <article className='favoriteItem'>
      <button className='favoriteItem__like'></button>
      <div className='favoriteItem__block'>
        <img src={image} alt='good' className='favoriteItem__photo'></img>
        <div className='favoriteItem__block_info'>
          <div>
            <h3 className='favoriteItem__title'>{title}</h3>
            <p className='favoriteItem__text'>{text}</p>
          </div>
          {single? <p className='favoriteItem__single'>В единственном экземпляре</p> :  ''}
        </div>
        <div className='favoriteItem__block_sum'>
          <p className='favoriteItem__sum'>{sum} ₽</p>
          <Button title="Добавить в корзину" size="323px" height="50px"/>
        </div>
      </div>
    </article>
  );
};
