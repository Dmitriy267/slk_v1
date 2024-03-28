import './RequisitesCard.sass';
import Button from '../../components/Button/ButtonMain';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from "../../hooks/useMediaQuery";

export const RequisitesCard = () => {
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(min-width: 320px)');

  return (
    <div className="requisites__container">
      <div className="requisites__data-container">
        <h2 className="requisites__title" style={{fontWeight: "bold"}}>Реквизиты</h2>
          <ul className="requisites__list">
            <li className="requisites__item">
                <span className="requisites__item-bold" style={{fontWeight: "bold"}}>ИНН</span>
                6382997402
            </li>
            <li className="requisites__item">
                <span className="requisites__item-bold" style={{fontWeight: "bold"}}>КПП</span>
                632101001
            </li>
            <li className="requisites__item">
                <span className="requisites__item-bold" style={{fontWeight: "bold"}}>ОГРН</span>
                1146300000571
            </li>
            <li className="requisites__item">
                <span className="requisites__item-bold" style={{fontWeight: "bold"}}>Р/С</span>
                40703810911240000417
            </li>
            <li className="requisites__item">
                <span className="requisites__item-bold" style={{fontWeight: "bold"}}>филиал Центральный банка ВТБ (ПАО)</span>
            </li>
            <li className="requisites__item">
                <span className="requisites__item-bold" style={{fontWeight: "bold"}}>К/СЧ</span>
                30101810145250000411
            </li>
            <li className="requisites__item">
                <span className="requisites__item-bold" style={{fontWeight: "bold"}}>БИК банка</span>
                044525411
            </li>
            <li className="requisites__item">
                <span className="requisites__item-bold" style={{fontWeight: "bold"}}>ЮР. АДРЕС</span>
                445040, Самарская обл., г. Тольятти, бульвар Туполева, дом 6.
            </li>
          </ul>
      </div>
      <div className='requisites__text-container'>
        <p className='requisites__description'> Узнайте, как стать волонтером в центре «Солнечный круг» </p>
        <Button title="Стать волонтером" size={isMobile ? "281px" : "100%"} action={() => navigate('/help/volunteering')}/>
      </div>

    </div>
  );
};

