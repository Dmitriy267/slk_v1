import './CenterNumbers.sass';
// import { aboutCentreData } from '../../utils/Constants/SectionAboutData';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import contractIcon from '../../assets/icons/free-icon-contract.svg';
import handIcon from '../../assets/icons/free-icon-helping-hand.svg';
import houseIcon from '../../assets/icons/free-icon-house.svg';

// Отрисовываю три блока данных со статистикой о Центре с использованием данных из constants
export const CenterNumbers = ({isFlexColumn = false}) => {
  const [data, setData] = useState({});

  const isDataLoading = useSelector(state => state.homeCenter.isLoading)
  const numbers = useSelector(state => state.homeCenter.data.center_page);

  useEffect(() => {
    if (isDataLoading) setData(numbers)
  }, [isDataLoading, numbers])

  return (
    <div className={`center-numbers ${isFlexColumn && 'center-numbers_type_column'}`}>
        <div className="center-numbers__data-item">
          <div className="center-numbers__data-item-icon" style={{ backgroundImage: `url(${contractIcon})` }} />
          <p className="center-numbers__data-item-numb">{data.opening_year}</p>
          <p className="center-numbers__data-item-text">год открытия АНОО «Солнечный круг»</p>
        </div>
        <div className="center-numbers__data-item">
          <div className="center-numbers__data-item-icon" style={{ backgroundImage: `url(${handIcon})` }} />
          <p className="center-numbers__data-item-numb">{data.children_number}</p>
          <p className="center-numbers__data-item-text">и более детей получают помощь прямо сейчас</p>
        </div>
        <div className="center-numbers__data-item">
          <div className="center-numbers__data-item-icon" style={{ backgroundImage: `url(${houseIcon})` }} />
          <p className="center-numbers__data-item-numb">{data.families_number}</p>
          <p className="center-numbers__data-item-text">и более семей получают консультации от центра</p>
        </div>
    </div>
  );
};
