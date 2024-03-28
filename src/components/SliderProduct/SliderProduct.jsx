import './SliderProduct.sass';
import Slider from 'react-slick';
import { ShopProduct } from '../Shop/ShopProduct';
import { useState, useEffect } from 'react';

export const SliderProduct = ({ data }) => {
  const [sliderRef, setSliderRef] = useState(null);
  const [slideToShow, setSLideToShow] = useState(2);

  const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    arrows: false
  };

  // Функция определения размера экрана и установки количества отображаемых слайдов
  const checkWindowWidth = () => {
    const screenWidth = window.screen.width;
    if (screenWidth <= 1200) setSLideToShow(2);
    if (screenWidth > 1200) setSLideToShow(3);
  };

  // Определяю размер экрана при загрузке страницы
  useEffect(() => {
    checkWindowWidth();
  }, []);

  // Следит за размерами экрана и запускат функцию checkWindowWidth с задержкой
  window.onresize = (event) => {
    setTimeout(checkWindowWidth, 50);
  };

  return (
    <div className="slider-products">
      <button type="button" className="slider-products__prev-arrow" onClick={sliderRef?.slickPrev} />
      <ul className="slider-products__list">
        <h2 className="product__title">ВЫ СМОТРЕЛИ</h2>
        <Slider ref={setSliderRef} {...settings}>
          {data.map((el) => (
            <ShopProduct item={el} key={el.id} isLarge={true}/>
          ))}
        </Slider>
        <button type="button" id="next" className="slider-products-next" />
      </ul>
      <button type="button" className="slider-products__next-arrow" onClick={sliderRef?.slickNext} />
    </div>
  );
};
