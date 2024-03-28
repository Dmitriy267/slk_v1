import './SingleProject.sass';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button/ButtonMain';
import { v4 as uuidv4 } from 'uuid';
import { HelpBlock } from '../../HelpBlock/HelpBlock';
import ProjectBlock from '../ProjectBlock/ProjectBlock';
import { useState, useEffect } from 'react';
import useMediaQuery from '../../../utils/hooks/useMediaQuery';
import { ButtonBackMobile } from '../../ButtonBackMobile/ButtonBackMobile';
import { api } from '../../../utils/api/api';
import { useLocation } from 'react-router-dom';
import { Preloader } from '../../Preloader/Preloader';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

export const SingleProject = () => {
  const { pathname } = useLocation();
  const [project, setProject] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const projects = useSelector((state) => state.projects.data);
  const isProjectsLoading = useSelector((state) => state.projects.isLoading);
  const [slug, setSlug] = useState('');

  const [othersProjects, setOthersProjects] = useState([]);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 1200px)');

  let navigate = useNavigate();

  // Создание объектов для карточек ДРУГИЕ ПРОЕКТЫ
  const createArrayAnotherProjects = (data) => {
    let firstProject = {};
    let secondProject = {};
    let thirdProject = {};

    if (data.length > 0) {
      // Удаляем из массива текущий проект
      const filteredArray = data.filter((item) => item.slug !== slug);
      // Первый проект
      firstProject = filteredArray[Math.floor(Math.random() * filteredArray.length)];
      // Второй проект
      secondProject = filteredArray[Math.floor(Math.random() * filteredArray.length)];
      // Второй проект
      thirdProject = filteredArray[Math.floor(Math.random() * filteredArray.length)];
    }

    return [firstProject, secondProject, thirdProject];
  };

  useEffect(() => {
    if (!isTablet && projects.length > 0) {
      setOthersProjects(createArrayAnotherProjects(projects).slice(1));
    } else {
      setOthersProjects(createArrayAnotherProjects(projects));
    }
  }, [isTablet, projects]);

  useEffect(() => {
    const slug = pathname.split('/')[2];
    setSlug(slug);
    api
      .get(`/projects/${slug}/`)
      .then((res) => {
        setIsDataLoaded(true);
        setProject(res.data);
      })
      .catch((err) => console.log(err));
  }, [pathname]);

  return (
    <>
      <Helmet>
        <title>{project.title}</title>
        <meta name="description" content={ project.texts && project.texts[0]?.text} />
      </Helmet>
      <section className="single-project">
        <div className="single-project__header">
          {window.innerWidth < 850 ? (
            <ButtonBackMobile action={() => navigate(-1)} />
          ) : (
            <Button title="Назад" size="73px" height="38px" action={() => navigate(-1)} />
          )}
        </div>

        {isDataLoaded ? (
          <>
            <h1 className="single-project__title">{project.title.toUpperCase()}</h1>
            <article className="single-project__article">
              <div className="single-project__image-container">
                <img
                  className={`single-project__image ${
                    !project.status ? 'single-project__image_type_closed' : ''
                  }`}
                  src={project.image}
                  alt={project.title}
                />
                <span
                  className={`single-project__marker ${
                    !project.status ? 'single-project__marker_type_showed' : ''
                  }`}
                >
                  Проект закрыт
                </span>
              </div>

              <p className="single-project__paragraph single-project__paragraph_type_bold">
                {project.texts[0].text}
              </p>
              {project.texts.slice(1).map((item) => (
                <p
                  className={`single-project__paragraph ${
                    project.texts.indexOf(item) === 1 ? 'single-project__paragraph_type_high' : ''
                  }`}
                  key={uuidv4()}
                >
                  {item.text}
                </p>
              ))}
            </article>
          </>
        ) : (
          <Preloader />
        )}

        <HelpBlock />
        <h1 className="single-project__title single-project__title_type_another">ДРУГИЕ ПРОЕКТЫ</h1>
        {isProjectsLoading && othersProjects.length > 0 ? (
          <div className="single-project__another-projects">
            {othersProjects.map((item) => (
              <ProjectBlock
                title={item.title}
                image={item.image}
                description={item.short_description}
                isOpen={item.status}
                key={uuidv4()}
                slug={item.slug}
              />
            ))}
          </div>
        ) : (
          <Preloader />
        )}
      </section>
    </>
  );
};
