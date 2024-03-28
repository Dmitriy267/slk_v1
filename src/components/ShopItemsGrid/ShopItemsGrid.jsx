import './ShopItemsGrid.sass';
import ShopItemCard from '../ShopItemCard/ShopItemCard';
import useMediaQuery from '../../utils/hooks/useMediaQuery';

const ShopItemsGrid = ({ items, reverse = false }) => {
  // const isDesktop = useMediaQuery('(min-width: 1101px)')
  const is990px = useMediaQuery('(max-width: 990px)');
  const is680px = useMediaQuery('(max-width: 680px)');
  // const isMobile = useMediaQuery('(max-width: 850px)')

  const setStyle = (item) => {
    const num = items.indexOf(item) + 1;
    const controlIndex = is680px ? 1 : 2;
    if (num <= controlIndex) {
      return {
        gridArea: `item${num}`,
        flexDirection: 'column'
      };
    } else {
      return {
        gridArea: `item${num}`,
        flexDirection: 'row-reverse'
      };
    }
  };

  // Функция определения большая карточка товара или маленькая с учетом реверса гридов
  const setTypeItemCard = (items, item) => {
    if (!is680px) {
      return items.indexOf(item) < 2 ? true : false;
    } else {
      return items.indexOf(item) < 1 ? true : false;
    }
  };

  return (
    <div
      className={`shop-grid__success-grid ${reverse ? 'shop-grid__success-grid_type_reverse' : ''}`}
    >
      {items &&  items.map((item) => (
        <ShopItemCard
          style={setStyle(item)}
          item={item}
          isLarge={setTypeItemCard(items, item)}
          key={`item${items.indexOf(item)}`}
        />
      ))}
    </div>
  );
};

export default ShopItemsGrid;
