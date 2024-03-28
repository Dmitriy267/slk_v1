import './HelpReports.sass';
import Button from '../../../components/Button/ButtonMain';
import { ButtonBackMobile } from '../../../components/ButtonBackMobile/ButtonBackMobile';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../../../utils/hooks/useMediaQuery';
import { api } from '../../../utils/api/api';
import { useEffect, useState } from 'react';
import { Preloader } from '../../../components/Preloader/Preloader';

export const HelpReports = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 850px)');

  const [activeBtn, setActiveBtn] = useState(0);

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [reports, setReports] = useState([]);
  const [reportsToShow, setReportsToShow] = useState([]);

  //Запрос всех отчетов с бэка
  const getReports = () => {
    api
      .get('assistance/reports/')
      .then((res) => {
        setReports(res.data);
        setIsDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setIsDataLoaded(false);
      });
  };

  //Обработчик клика по типам отчетов
  const handleBtnReport = (key) => {
    setActiveBtn(key);
  };

  useEffect(() => {
    getReports();
  }, []);

  useEffect(() => {
    if (isDataLoaded) {
      setReportsToShow(reports[activeBtn].reports);
    }
  }, [reports, activeBtn, isDataLoaded]);

  return (
    <section className="helpreports">
      <div className="helpreports__container">
        <div className="helpreports__btn-container">
          {window.innerWidth < 850 ? (
            <ButtonBackMobile action={() => navigate(-1)} />
          ) : (
            <Button title="Назад" size="73px" height="38px" action={() => navigate(-1)} />
          )}
        </div>
        <h1 className="helpreports__header">отчеты</h1>
        <div className="helpreports__content">
          {isDataLoaded ? (
            <div className="helpreports__btn">
              {reports.map((report) => (
                <button
                  className={`helpreports__btn-report ${
                    activeBtn === reports.indexOf(report)
                      ? 'helpreports__btn-report_type_active'
                      : ''
                  }`}
                  onClick={() => handleBtnReport(reports.indexOf(report))}
                  key={`btn-${report.id}`}
                >
                  {report.name}
                </button>
              ))}
            </div>
          ) : (
            <Preloader />
          )}

          <Report posts={reportsToShow} />
        </div>
      </div>
    </section>
  );
};

function Report({ posts }) {
  let content;

  //Извлечь расширение файла
  const getExtension = (url, size) => {
    const str = url.toString();
    const index = str.lastIndexOf('.');
    return `${str.slice(index + 1)}, ${size}`;
  };
  if (posts.length !== 0) {
    content = posts.map((post) => (
      <div className="helpreports__line" key={post.id}>
        <div className="helpreports__date-and-size">
          <p className="helpreports__date">{post.name}</p>
          <p className="helpreports__size">{getExtension(post.file, post.filesize)}</p>
        </div>

        <div className="helpreports__actions">
          <a href={post.file} target="_blank" rel="noreferrer" className="helpreports__download">
            Скачать
          </a>
        </div>
      </div>
    ));
  } else {
    content = (
      <div className="helpreports__line">
        <h3 className="helpreports__line-empty">Отчеты еще не загружены.</h3>
      </div>
    );
  }

  return <div className="helpreports__repcontent">{content}</div>;
}
