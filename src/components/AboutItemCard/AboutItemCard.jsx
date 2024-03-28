import './AboutItemCard.sass';
import Button from '../Button/ButtonMain';
import { useNavigate } from "react-router-dom";
import useMediaQuery from '../../utils/hooks/useMediaQuery';

export const AboutItemCard = ({ project, index }) => {
  const { image, title, block_description
    , nav, id } = project;
  const isMobile = useMediaQuery('(max-width: 500px)');

  const navigate = useNavigate();
  // Разворачиваю flex элемент в другую сторону в завивисимости от индекса элемента в массиве
  const reverseRowByIndex = (index) => {
    // В мобильное версии не требуется разворачивать flex. Поэтому делаем проверку на Mobile
    if (isMobile) return;
    if (index === 0 || index % 2 === 0) return false;
    return true;
  };
  
  console.log(nav)

  return (
    <div className={`about-card ${reverseRowByIndex(index) ? 'about-card_type_reverse' : ''}`} key={`about-card-itm-${id}`} >
      <div className="about-card__text-container">
        <h2 className="about-card__title">{title?.toUpperCase()}</h2>
        <p className="about-card__description">{block_description
}</p>
        <div className='about-card__btn-container' >
          <Button type={"button"} title="Подробнее" size={isMobile ? '256px' : '281px'} action={() => navigate(nav)} />
        </div>

      </div>

      <div className="about-card__img-container">
        <img className="about-card__img" src={image} alt={title} />
      </div>
    </div>
  );
};
