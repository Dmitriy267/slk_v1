import { NavLink } from 'react-router-dom';
import './ProjectCard.sass';

const ProjectCard = ({ project, index }) => {
  const { image, title, short_description, slug } = project;

  // Разворачиваю flex элемент в другую сторону в завивисимости от индекса элемента в массиве
  const reverseRowByIndex = (index) => {
    if (index === 0 || index % 2 === 0) return false;
    return true;
  };

  return (
    <div className={`project-card ${reverseRowByIndex(index) && 'project-card_type_reverse'}`}>
      <div className="project-card__img-container">
        <img className="project-card__img" src={image} alt={title} />
        <div className="project-card__title-wrapper">
          <p className="project-card__title-text">{title}</p>
        </div>
      </div>
      <div className="project-card__text-container">
        <p className="project-card__description">{short_description}</p>
        <NavLink to={`/projects/${slug}`} className="project-card__btn">
          Читать дальше
        </NavLink>
      </div>
    </div>
  );
};

export default ProjectCard;
