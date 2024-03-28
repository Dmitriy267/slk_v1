import './SliderMobile.sass';
import Slider from 'react-slick';
import SpecialistCard from '../SpecialistCard/SpecialistCard';
import { SpecialistCardContacts } from '../SpecialistCard/SpecialistCardContacts';
import { FundraisingCard } from '../FundraisingCard/FundraisingCard';
import { useState, useEffect } from 'react';
import { AboutItemCard } from '../AboutItemCard/AboutItemCard';
import { ShopProduct } from '../Shop/ShopProduct';
import { v4 as uuidv4 } from 'uuid';

export const SliderMobile = ({ data, type = 'SpecialistCard' }) => {
  const [cardToShow, setCardToShow] = useState(data)

  const settings = {
    dots: true,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: 'slick-dots list-dots'
  };

  const setCardTypeToRender = (el) => {
    if (type === 'SpecialistCard') {
      return <SpecialistCard employee={el} key={uuidv4()}/>
    } else if (type === 'SpecialistCardContacts') {
      return <SpecialistCardContacts employee={el} key={uuidv4()}/>
    } else if (type === 'AboutItemCard') {
      return <AboutItemCard project={el} key={uuidv4()}/>
    } else if (type === 'FundraisingCard') {
      return <FundraisingCard item={el} key={uuidv4()}/>
    } else if (type === 'ProductItem') {
      return <ShopProduct item={el} key={uuidv4()}/>
    } else {
      return <h1>Установите тип карточки</h1>
    }
  }

useEffect(() => {
  if(data && data.length > 3 && type !== 'AboutItemCard' ) setCardToShow(data.slice(0, 6))
}, [data, type])

  return (
    <div className="slider-mobile">
      <ul className={`slider-mobile__list ${type === 'SpecialistCard' && 'slider-mobile__list_specialist'}`}>
          <Slider {...settings}>
            {cardToShow.map((el) => setCardTypeToRender(el))}
          </Slider>
      </ul>
    </div>
  );
};
