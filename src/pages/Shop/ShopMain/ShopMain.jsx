import './ShopMain.sass';
import Button from '../../../components/Button/ButtonMain';
import { ButtonBackMobile } from '../../../components/ButtonBackMobile/ButtonBackMobile';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../../../utils/hooks/useMediaQuery';
import mainFoto from '../../../tempdata/success/images/main.png';
import ShopItemsGrid from '../../../components/ShopItemsGrid/ShopItemsGrid';
import usePagination from '../../../hooks/usePagination';
import { Pagination } from '../../../components/Pagination/Pagination';
import { useEffect, useState } from 'react';
import { Cart } from '../../../components/Cart/Cart';
import { useSelector } from 'react-redux';
import { Preloader } from '../../../components/Preloader/Preloader';
import { api } from '../../../utils/api/api';

export const ShopMain = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isOneShopGrid = useMediaQuery('(max-width: 990px)');
  const isFourItems = useMediaQuery('(max-width: 990px)');
  const isThreeItems = useMediaQuery('(max-width: 680px)');
  const [indexSlice, setIndexSlice] = useState(5);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const products = useSelector((state) => state.products.data);
  const isProductsLoaded = useSelector((state) => state.products.isLoading);
  const [allItems, setAllItems] = useState(products);

  const [pageData, setPageData] = useState({});
  const [pageDataLoaded, setPageDataLoaded] = useState(false);

  // Использование кастомного хука usePagination
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    gaps,
    setPage,
    totalPages
  } = usePagination({
    contentPerPage: itemsPerPage,
    count: products.length
  });

  // В зависимости от размера экрана опеределяем количество элементов на странице и индекс обрезки
  useEffect(() => {
    if (isFourItems && !isThreeItems) {
      setItemsPerPage(4);
      setIndexSlice(4);
    } else if (isFourItems && isThreeItems) {
      setItemsPerPage(3);
      setIndexSlice(3);
    } else {
      setItemsPerPage(10);
      setIndexSlice(5);
    }
  }, [isFourItems, isThreeItems]);

  useEffect(() => {
    setAllItems(products);
  }, [products]);

  useEffect(() => {
    api
      .get('/success-territory/')
      .then((res) => {
        setPageData(res.data[0]);
        setPageDataLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="shop-main">
      <div className="shop-main__top-block">
        {isMobile ? (
          <ButtonBackMobile action={() => navigate(-1)} />
        ) : (
          <Button title="Назад" size="73px" height="38px" action={() => navigate(-1)} />
        )}
      </div>

      <article className="shop-main__article">
        {pageDataLoaded ? (
          <>
            <h1 className="shop-main__title">{pageData.title.toUpperCase()}</h1>
            <div className="shop-main__info">
              <img className="shop-main__main-foto" src={pageData.image} alt="" />
              <p className="shop-main__main-text">{pageData.description}</p>
            </div>
          </>
        ) : (
          <Preloader />
        )}
      </article>

      {isProductsLoaded && allItems.length > 0 ? (
        <div className="shop-main__shop-items">
          <ShopItemsGrid
            items={allItems.slice(firstContentIndex, lastContentIndex).slice(0, indexSlice)}
          />
          {!isOneShopGrid ? (
            <ShopItemsGrid
              items={allItems.slice(firstContentIndex, lastContentIndex).slice(5)}
              reverse={true}
            />
          ) : (
            ''
          )}
        </div>
      ) : (
        <Preloader />
      )}

      <div className="shop-main__pagination">
        <Pagination options={{ nextPage, prevPage, page, gaps, setPage, totalPages }} />
      </div>

      {/* <Cart /> */}
    </section>
  );
};
