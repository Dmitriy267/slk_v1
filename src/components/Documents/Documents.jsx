import Button from '../Button/ButtonMain';
import './Documents.sass';
import useMediaQuery from '../../utils/hooks/useMediaQuery';
import { Preloader } from '../Preloader/Preloader';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Documents = () => {
  const isMobile = useMediaQuery('(max-width: 650px)');
  const navigate = useNavigate();

  const documents = useSelector((state) => state.documents.data);
  const isDocumentsLoading = useSelector((state) => state.documents.isLoading);

  return (
    <>
      <ul className="documents">
        {isDocumentsLoading &&
          documents.map((el) => (
            <li className="documents__item" key={`docs-${Math.random()}`}>
              <div className="documents__item-content">
                <p className="documents__text">{el.statutory_document_type.name}</p>
                <a className="documents__download" href={el.file} target="_blank" rel="noreferrer">
                  <p className="documents__button">Скачать</p>
                  <div className="documents__button-download" />
                </a>
              </div>
            </li>
          ))}
      </ul>
      <div className="documents__help-button">
        <Button
          size={isMobile ? '256px' : '587px'}
          title={isMobile ? 'Помочь центру' : 'Помочь благотворительному центру'}
          action={() => navigate('/help')}
        />
      </div>
    </>
  );
};
