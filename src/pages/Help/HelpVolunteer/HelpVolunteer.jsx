import './HelpVolunteer.sass';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { nameRegExp, emailRegExp } from '../../../utils/regExp';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/ButtonMain';
import { ButtonBackMobile } from '../../../components/ButtonBackMobile/ButtonBackMobile';
import { ResponseModal } from '../../../components/ResponseModal/ResponseModal';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../store/modalSlice';
import { api } from '../../../utils/api/api';

//Удаление пробелов из поля ввода
const deleteSpaces = (value) => {
  return value.replace(/\s/g, '');
};

//Удаление пробелов и цифр из поля ввода
const deleteSpacesAndFigures = (value) => {
  return value.replace(/\s/g, '').replace(/\d/g, '');
};

// Маска для ввода номера телефона
const phoneMask = (event) => {
  var x = event.target.value
    .replace(/\D/g, '')
    .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  return (event.target.value = !x[2]
    ? x[1]
    : x[1] +
      (x[2] && x[3] ? ' (' + x[2] + ') ' + x[3] : x[2]) +
      (x[4] ? '-' + x[4] : '') +
      (x[5] ? '-' + x[5] : ''));
};

export const HelpVolunteer = () => {
  const dispatch = useDispatch();
  // Виды работ с бэка
  const jobsType = useSelector((state) => state.jobs.data);
  const jobsTypeIsLoading = useSelector((state) => state.jobs.isLoading);

  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 415px)');

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [Message, setMessage] = useState('');

  // Обработка Submit (отправка данных формы на почту)
  const onSubmit = async (data, e) => {
     const dataToSend = {
      ...data,
      jobs: [+data.jobs]
    }
    api
      .post('/center/volunteers/', dataToSend)
      .then(async (res) => {
        await fetch(process.env.REACT_APP_WEB3FORM, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(data, null, 2)
        })
          .then(async (response) => {
            let json = await response.json();
            if (json.success) {
              setMessage('');
              setIsSuccess(true);
              e.target.reset();
              reset();
              // Открытие модального окна
              dispatch(openModal());
            } else {
              setMessage(json.message);
              setIsSuccess(false);
              //Открытие модального окна
              dispatch(openModal());
            }
          })
          .catch((error) => {
            setMessage('Client Error. Please check the console.log for more info');
            setIsSuccess(false);
            console.log(error);
            //Открытие модального окна
            dispatch(openModal());
          });
      })
      .catch((err) => {
        let errData = err.response.data;
        let errMessage = '';
        if (errData.hasOwnProperty('email'))
          errMessage += `Электронная почта ${data.email} уже существует в базе данных`;
        if (errData.hasOwnProperty('phone'))
          errMessage += `\n \t Телефон ${data.phone} уже существует в базе данных`;
        setMessage(errMessage);
        setIsSuccess(false);
        //Открытие модального окна
        dispatch(openModal());
      });
  };

  useEffect(() => {
    setFocus("first_name");
  }, [setFocus]);

  return (
    <>
      <ResponseModal isSaccess={isSuccess} Message={Message} />
      <section className="vol__section">
        <div className="vol__block-title">
          <div className='vol__block-title-btn'>
                      {window.innerWidth < 850 ? (
            <ButtonBackMobile action={() => navigate(-1)} />
          ) : (
            <Button title="Назад" size="73px" height="38px" action={() => navigate(-1)} />
          )}
          </div>

          <h2 className="vol__title">
            {window.innerWidth < 850 ? 'АНКЕТА ДЛЯ ЗАПИСИ ВОЛОНТЕРОМ' : 'Анкета для записи волонтером'}
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="vol__form">
          {/* Скрытый imput для отправки почты на форму через сервис web3forms.com */}
          <input
            type="hidden"
            value="97b5667f-f768-4293-b0ee-fa45e3d7e050"
            {...register('access_key')}
          />
          <label htmlFor="first_name" className="vol__label">
            <p>
              Имя<span className="vol__label_required">*</span>
            </p>
            <input
              {...register('first_name', {
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
                  value: nameRegExp,
                  message: 'Допустимы только русские или английские буквы',
                },
                onChange: (event) => {
                  const { value } = event.target;
                  event.target.value = deleteSpacesAndFigures(value);
                },
              })}
              name="first_name"
              defaultValue=""
              placeholder="Имя"
              className="vol__input"
              maxLength="30"
              type='text'
            />
            <p className="vol__text-error">{errors.first_name?.message}</p>
          </label>
          <label htmlFor="last_name" className="vol__label">
            <p>
              Фамилия<span className="vol__label_required">*</span>
            </p>
            <input
              name="last_name"
              defaultValue=""
              maxLength="30"
              {...register('last_name', {
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
                  value: nameRegExp,
                  message: 'Допустимы только русские или английские буквы',
                },
                onChange: (event) => {
                  const { value } = event.target;
                  event.target.value = deleteSpacesAndFigures(value);
                },
              })}
              placeholder="Фамилия"
              className="vol__input"
              type='text'
            />
            <p className="vol__text-error">{errors.last_name?.message}</p>
          </label>
          <label htmlFor="middle_name" className="vol__label">
            Отчество
            <input
              name="middle_name"
              defaultValue=""
              maxLength="30"
              type='text'
              {...register('middle_name', {
                required: false,
                maxLength: {
                  value: 30,
                  message: 'Не более 30 символов',
                },
                minLength: {
                  value: 2,
                  message: 'Не менее 2 символов',
                },
                pattern: {
                  value: nameRegExp,
                  message: 'Допустимы только русские или английские буквы',
                },
                onChange: (event) => {
                  const { value } = event.target;
                  event.target.value = deleteSpacesAndFigures(value);
                },
              })}
              placeholder="Отчество"
              className="vol__input"
            />
            <p className="vol__text-error">{errors.middle_name?.message}</p>
          </label>
          <label htmlFor="email" className="vol__label">
            <p>
              E-mail<span className="vol__label_required">*</span>
            </p>
            <input
              name="email"
              defaultValue=""
              maxLength="64"
              type="email"
              {...register('email', {
                required: 'Обязательное поле',
                maxLength: {
                  value: 64,
                  message: 'Не более 64 символов',
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
              className="vol__input vol__input_type_middle"
            />
            <p className="vol__text-error">{errors.email?.message}</p>
          </label>
          <label htmlFor="phone" className="vol__label">
            <p>
              Телефон<span className="vol__label_required">*</span>
            </p>
            <input
              name="phone"
              type="tel"
              defaultValue=""
              {...register('phone', {
                required: 'Обязательное поле',
                maxLength: {
                  value: 30,
                  message: 'Не более 30 символов',
                },
                minLength: {
                  value: 17,
                  message: 'Телефон состоит из 11 цифр',
                },
                onChange: (event) => phoneMask(event),
              })}
              placeholder="8 (000) 000-00-00"
              className="vol__input vol__input_type_middle"
            />
            <p className="vol__text-error">{errors.phone?.message}</p>
          </label>
          <label htmlFor="jobs" className="vol__label">
            <p>
              Чем я могу помочь?<span className="vol__label_required">*</span>
            </p>
            <div className="select-wrapper">
              <select
                {...register('jobs', { required: true })}
                className="vol__input vol__input_type_big"
              >
                {jobsTypeIsLoading &&
                  jobsType.map((item) => (
                    <option value={item.id} className="vol__form__option" key={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </label>
          <div className="vol__form__submit">
            <p className="vol__form__text">
              Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь
              &nbsp;
              <NavLink to="/agreement" className="vol__form__link" target='_blank'>
                с политикой конфиденциальности
              </NavLink>
            </p>
            <button type="submit" disabled={!isValid && true} className="vol__button-submit">
              Отправить
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
