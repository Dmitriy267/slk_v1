import { Cart } from '../../components/Cart/Cart';
import './Shop.sass';
import { Routes, Route } from 'react-router-dom';
//import { ShopItemsGrid } from '../../components/ShopItemsGrid/ShopItemsGrid';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { ShopMain } from './ShopMain/ShopMain';
import { ProductItem } from '../../components/ProductItem/ProductItem';
import { PRODUCTS_DATA } from '../../tempdata/products/PRODUCTS';

export const Shop = () => {
  return (
    <>
      <Routes>
        <Route index element={<ShopMain />} />
        <Route exact path="/:id" element={<ProductItem data={PRODUCTS_DATA[0]} />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>

      <Cart />
    </>
  );
};
