import './EmailChangeModal.sass';
import Button from '../Button/ButtonMain';
import { useSelector, useDispatch } from 'react-redux';
import { closeEmailChangeModal, setEmailChange } from '../../store/emailChangeModalSlice';
import { useForm } from 'react-hook-form';
import { emailRegExp } from '../../utils/regExp';


// Состояние модального окна (открыто/закрыто) зависит от переменной в store EmailChangeModalIsOpened.
// Изменение состояния переменной делается через reducers.
export const EmailChangeModal = () => {
  const dispatch = useDispatch()

  // Достает из стора наш объект из modalSlice
  const EmailChangeModalIsOpened = useSelector((state) => state.emailChangeModal.EmailChangeModalIsOpened);
  const emailChange = useSelector((state) => state.emailChangeModal.email);

  // Необходимые данные для модального окна в двух состояниях
  const data = {
    title: 'Изменить e-mail',
    subtitle: `Укажите почту  на которую будет отправлено письмо со ссылкой для подтверждения регистрации.
Если вы не можете найти письмо, проверьте, пожалуйста, папку спам.`,
    btnTitle: 'Отправить письмо '
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
  });



  //Удаление пробелов из поля ввода
  const deleteSpaces = (value) => {
    return value.replace(/\s/g, '');
  };

  // Обработка Submit (загрузка картинки, закрытие попапа)
  const onSubmit = data => {
    // Сохранение e-mail
    dispatch(setEmailChange(data.email));
    //Закрытие модального окна
    dispatch(closeEmailChangeModal());
  }


  return (
    <div className={`emailChangeModal ${EmailChangeModalIsOpened && 'emailChangeModal_status_opened'}`}>
      <div className='emailChangeModal__modal'>
        <div className="emailChangeModal__text-content">
          <h2 className="emailChangeModal__title">{data.title}</h2>
          <p className="emailChangeModal__subtitle">{data.subtitle}</p>
          <form  className="emailChange__form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="emailChange_url" className="emailChange__label">
              <p className="emailChange__input-name">
                E-mail
              </p>
              <input
                name="email"
                defaultValue = {emailChange}
                maxLength="30"
                type="email"
                {...register('email', {
                  required: 'Обязательное поле',
                  maxLength: {
                    value: 30,
                    message: 'Не более 30 символов',
                  },
                  minLength: {
                    value: 2,
                    message: 'Не менее 2 символов',
                  },
                  pattern: {
                    value: emailRegExp,
                    message: 'Введите корректный email',
                  },
                  onChange: (event) => {
                    const { value } = event.target;
                    event.target.value = deleteSpaces(value);
                  },
                })}
                placeholder="E-mail"
                className="emailChange__input"
              />
              <p className="emailChange__text-error">{errors.url?.message}</p>
            </label>
            <Button title={data.btnTitle} size="387px" height="50px" type='submit'/>
          </form>
        </div>
      </div>
    </div>
  );
};
