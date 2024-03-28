import './Partners.sass';
import { useState, useEffect } from 'react';
import useMediaQuery from '../../utils/hooks/useMediaQuery';

export const PartnersCards = ({ items }) => {
  const [itemsToShow, setItemsToShow] = useState(items.slice(0, 12));
  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    if (itemsToShow && !isMobile) setItemsToShow(itemsToShow.slice(0, 12));
    if (itemsToShow && isMobile) setItemsToShow(itemsToShow.slice(0, 6));
  }, [items, isMobile]);

  return (
    <div className="partnersCards">
      {itemsToShow.map((el) => (
        <div className="partnersCards__image-container" key={el.id}>
          <a target='_blank' href={el.url} rel="noreferrer">
            <img className="partnersCards__item" src={el.image} alt={el.name} />{' '}
          </a>
        </div>
      ))}
    </div>
  );
};
