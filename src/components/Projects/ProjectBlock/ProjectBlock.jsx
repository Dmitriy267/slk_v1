import './ProjectBlock.sass';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProjectBlock({ title, image, description, isOpen, slug }) {
  const navigate = useNavigate();

  return (
    <div className="project-block__card">
      <img
        src={image}
        alt={title}
        className={
          isOpen ? 'project-block__image' : 'project-block__image project-block__image_close'
        }
      />
      <div className="project-block__content">
        <h2 className="project-block__title">{title}</h2>
        <p className="project-block__description">{description}</p>
      </div>
      <button className="project-block__btn" onClick={() => navigate(`/projects/${slug}`)}>
        Подробнее
      </button>
      <div
        className={
          isOpen ? 'project-block__marker project-block__marker_hide' : 'project-block__marker'
        }
      >
        Проект закрыт
      </div>
    </div>
  );
}

export default ProjectBlock;
