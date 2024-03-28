import { NavLink, useLocation } from 'react-router-dom';
import './NewsCard.sass';

export const NewsCard = ({ item }) => {
  // Дата с бэка приходит в качестве строки. Функция корректно обрабатывает дату с бэка и локализирует ее
  const formatDate = (string) => {
    const unixTime = Date.parse(string);
    const date = new Intl.DateTimeFormat('ru-RU').format(unixTime);
    return date;
  };

  return (
    <>
      <article className="newsCard" key={`news-${item.id}`}>
        <img src={item.files[0].file} alt="name" className="newsCard__img" />
        <div className="newsCard__text-block">
          <h2 className="newsCard__title">{item.title}</h2>
          <p className="newsCard__paragraph">{item.texts[0].text}</p>
          <div className="newsCard__footer">
            <p className="newsCard__date">{formatDate(item.created_at)}</p>
            <NavLink to={`/news/${item.slug}`} className="newsCard__button">
              Читать дальше
            </NavLink>
          </div>
        </div>
      </article>
    </>
  );
};
