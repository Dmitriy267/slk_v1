import './AccountItem.sass';
import { v4 as uuidv4 } from 'uuid';

export const AccountItem = ({data}) => {
  const card = data;
  const { date, status, goods, sum} = card;


  return (
    <article className='accountItem'>
      <div>
        <p className='accountItem__date'>{date}</p>
        {!status? <p className='accountItem__status'>выполнено</p> : <p className='accountItem__status accountItem__status_red'>не выполнено</p>}
      </div>
      <div className='accountItem__goods'>
        {goods.map((item) => (
          <div className='accountItem__good' key={uuidv4()}>
            <img src={item.image} alt='goods'></img>
            <div className='accountItem__good_info  accountItem__good_info-wd'>
              <p className='accountItem__text'>{item.code}</p>
              <p className='accountItem__text'>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='accountItem__good_info  accountItem__good_info-end'>
        <p className='accountItem__text'>сумма</p>
        <p className='accountItem__text'>{sum}</p>
      </div>
    </article>
  );
};
