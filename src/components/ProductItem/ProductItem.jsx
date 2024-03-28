import './ProductItem.sass';
import ButtonU from '../../components/ButtonU/ButtonU';
import ButtonMain from '../../components/Button/ButtonMain';
import { ButtonBackMobile } from '../../components/ButtonBackMobile/ButtonBackMobile';
import React, { useEffect, useState } from 'react';
import useMediaQuery from '../../utils/hooks/useMediaQuery';
import { useNavigate } from 'react-router-dom';
//import { formatNum } from '../../utils/formatNumToMoney';
// import products from '../../tempdata/products/products_data';
//import ShopItemsGrid from '../../components/ShopItemsGrid/ShopItemsGrid';
//import { v4 as uuidv4 } from 'uuid';
import { SliderProduct } from '../../components/SliderProduct/SliderProduct';
import { SliderMobile } from '../../components/SliderMobile/SliderMobile';
import { SliderImage } from '../../components/SliderProductImage/SliderProductImage';
import { useLocation } from 'react-router-dom';
import { api } from '../../utils/api/api';
import { Preloader } from '../Preloader/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { addCartData } from '../../store/DataSlices/cartItemsSlice';

export const ProductItem = () => {
  const { pathname } = useLocation();
  //const [othersProducts, setOthersProducts] = useState([]);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 1200px)');
  let navigate = useNavigate();
  const [pageData, setPageData] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const products = useSelector((state) => state.products.data);
  const isProductsLoaded = useSelector((state) => state.products.isLoading);

  useEffect(() => {
    const slug = pathname.split('/')[2];
    api
      .get(`/products/${slug}`)
      .then((res) => {
        setPageData(res.data);
        setIsDataLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addCartData(pageData));
  };

  return (
    <section className="product-page">
      <div className="container product__container">
        <div className="product-page__top-block">
          {isMobile ? (
            <ButtonBackMobile action={() => navigate(-1)} />
          ) : (
            <ButtonU title="Назад" size="73px" height="38px" action={() => navigate(-1)} />
          )}
        </div>

        <div className="product__contain">
          {isDataLoaded ? (
            <>
              <div className="product__title-block">
                <h1 className="product__title">{pageData.title.toUpperCase()}</h1>
              </div>
              <div className="product__text-block">
                <div className="product__contain-main">
                  <article className="product__article">
                    <p className="product__price">{pageData.price} р.</p>
                    <p className="product__amount">В единственном экземпляре</p>
                    <p className="product__paragraph">{pageData.description}</p>
                  </article>
                </div>
              </div>
              <div className="product__contain-button">
                <ButtonMain
                  size={isMobile ? '256px' : '345px'}
                  title="Добавить в корзину"
                  height="50px"
                  action={addToCart}
                />
                <button className="product__button">
                  <div className="product__like-button" />
                </button>
              </div>

              <div className="product__image-block">
                <SliderImage data={pageData.files} />
              </div>
            </>
          ) : (
            <Preloader />
          )}
        </div>

        {/* {isProductsLoaded ? (
          <div className="product__another-products">
            <SliderProduct data={products} />
            <SliderMobile data={products} type="ProductItem" />
          </div>
        ) : (
          <Preloader />
        )} */}
      </div>
    </section>
  );
};

export default ProductItem;
