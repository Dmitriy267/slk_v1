import './Slider.sass';
import Slider from 'react-slick';
import { FundraisingCard } from '../FundraisingCard/FundraisingCard';
import { useState, useEffect } from 'react';

export const SliderElement = ({ data }) => {
  const [sliderRef, setSliderRef] = useState(null);
  const [slideToShow, setSLideToShow] = useState(2);

  const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  // Функция определения размера экрана и установки количества отображаемых слайдов
  // const checkWindowWidth = () => {
  //   const screenWidth = window.screen.width;
  //   if (screenWidth <= 1100) setSLideToShow(1);
  //   if (screenWidth > 1100) setSLideToShow(2);
  // };

  // // Определяю размер экрана при загрузке страницы
  // useEffect(() => {
  //   checkWindowWidth();
  // }, []);

  // // Следит за размерами экрана и запускат функцию checkWindowWidth с задержкой
  // window.onresize = (event) => {
  //   setTimeout(checkWindowWidth, 50);
  // };

  return (
    <div className="slider">
      {/* <button type="button" className="slider__prev-arrow" onClick={sliderRef?.slickPrev} /> */}
      <ul className="slider__list">
        <Slider ref={setSliderRef} {...settings}>
          {data.map((el) => (
            <FundraisingCard item={el} key={el.id} />
          ))}
        </Slider>
        {/* <button type="button" id="next" className="slider-next" /> */}
      </ul>
      {/* <button type="button" className="slider__next-arrow" onClick={sliderRef?.slickNext} /> */}
    </div>
  );
};
