import './SliderProductImage.sass';
import Slider from 'react-slick';
import { useState } from 'react';
import { ProductImages } from './ProductImages';

export const SliderImage = ({ data }) => {
    const [sliderRef, setSliderRef] = useState(null);

    const settings = {
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

  return (
    <div className="slider-images">
      <button type="button" className="slider-images__prev-arrow" onClick={sliderRef?.slickPrev} />
      <ul className="slider-images__list">
        <Slider ref={setSliderRef} {...settings}>
          {data.map((el) => (
            <ProductImages item={el} key={el.id}/>
          ))}
        </Slider>
        <button type="button" id="next" className="slider-images-next" />
      </ul>
      <button type="button" className="slider-images__next-arrow" onClick={sliderRef?.slickNext} />
    </div>
  );
};
