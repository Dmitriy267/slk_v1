import './ResponseModal.sass';
import saccessImg from '../../assets/images/modal-saccess.svg';
import errorImg from '../../assets/images/modal-error.svg';
import Button from '../Button/ButtonMain';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../store/modalSlice';


// Состояние модального окна (открыто/закрыто) зависит от переменной в store modalIsOpened.
// Изменение состояния переменной делается через reducers.
export const ResponseModal = ({ isSaccess = false, Message = '' }) => {
  const dispatch = useDispatch()

  const [modalData, setModalData] = useState({});

  // Достает из стора наш объект из modalSlice
  const modalIsOpened = useSelector((state) => state.modal.modalIsOpened);

  // Необходимые данные для модального окна в двух состояниях
  const data = {
    saccess: {
      title: 'Спасибо! Заявка отправлена.',
      subtitle: 'В ближайшее время мы с Вами свяжемся!',
      image: saccessImg,
      btnTitle: 'Хорошо'
    },  
    error: {
      title: 'Что-то пошло не так...',
      subtitle: 'Анкету не удалось отправить',
      image: errorImg,
      btnTitle: 'Попробовать снова'
    }
  };

  // Обработчик нажатия на кнопку
  const handleClick = () => {
    dispatch(closeModal())
  };

  // В зависимости от статуса ответа от сервера устанавливаем определенный тип сообщийний из объекта data
  useEffect(() => {
    if (isSaccess) {
      setModalData(data.saccess);
    } else {
      setModalData(data.error);
    }
  }, [isSaccess]);

  return (
    <div className={`response ${modalIsOpened && 'response_status_opened'}`}>
      <div
        className={`response__modal ${
          isSaccess ? 'response__modal_type_saccess' : 'response__modal_type_error'
        }`}
      >
        <img className="response__img" src={modalData.image} alt={modalData.title} />
        <div className="response__text-content">
          <h2 className="response__title">{(!Message) ? modalData.title : Message}</h2>
          <p className="response__subtitle">{modalData.subtitle}</p>
          <Button title={modalData.btnTitle} height="38px" action={handleClick} />
        </div>
      </div>
    </div>
  );
};
