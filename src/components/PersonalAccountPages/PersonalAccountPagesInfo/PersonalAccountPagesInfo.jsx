import './PersonalAccountPagesInfo.sass';
import { useForm } from 'react-hook-form';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { PersonalAccountPagesMain } from '../PersonalAccountPagesMain/PersonalAccountPagesMain';
import { FormChangeInfoAccount } from './FormChangeInfoAccount';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../../../utils/api/api';
import { setUser } from '../../../store/DataSlices/userSLice';
import { useEffect, useState } from 'react';

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

export const PersonalAccountPagesInfo = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const token = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.user.data);
  const [userInfo, setUserInfo] = useState(null);

  const isMobile = useMediaQuery('(max-width: 415px)');

  const {
    register,
    setFocus,
    watch,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all'
    // начальные значения должны приходить с бэка
    //defaultValues: async () => await fetch('/api')
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  // Осуществление запроса на сервер для получения данных пользоватлея
  const getUserData = (token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    };

    // При успешном получении данных сохраняем данные пользователя в store и в local storage
    api
      .get('/account/data', config)
      .then((res) => {
        dispatch(setUser(res.data));
        localStorage.setItem('user', JSON.stringify(res.data));
      })
      .catch((err) => console.log(err));
  };

  // При загрузке страницы осуществляем запрос к серверу
  useEffect(() => {
    if (isLoggedIn && token) getUserData(token);
  }, []);

  // При обновлении получение данных из стор обновляем стейт с данными пользователя для отрисовки формы
  useEffect(() => {
    setUserInfo(userData);
  }, [userData]);

  return (
    <>
      <PersonalAccountPagesMain />
      <section className="account__section">
        {userInfo && <FormChangeInfoAccount userData={userData} />}

        {/* <form  className="accountInfo__form" onSubmit={handleSubmit(onSubmit)}>
          <div className='accountInfo__form__avatar-conteiner'>
            <input className="accountInfo__form__upload-input"
                   ref={filePicker}
                   type="file"
                   onChange={handleChangeAvatar}
                   accept="image/*,.png,.jpg,.jpeg,.web,"
            />
            <div className='accountInfo__form__avatar' >
              { (selectedFile !== null) && <img src={preview} alt='Ваша фотография' className='accountInfo__avatar'></img>}
            </div>
            <div className='accountInfo__form__avatar-change'>
              <button className='accountInfo__form__avatar-buttonDownload' onClick={handlePick}>
                Выбрать фото
              </button>
              { (selectedFile !== null) && <button className='accountInfo__form__avatar-buttonBusket' onClick={handleDeleteAvatar}> Удалить фото </button>}
            </div>
          </div>
          <label htmlFor="last_name" className="accountInfo__label">
            <p className="accountInfo__input-name">
              Фамилия
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
              className="accountInfo__input"
              type='text'
            />
            <p className="accountInfo__text-error">{errors.last_name?.message}</p>
          </label>
          <label htmlFor="first_name" className="accountInfo__label">
            <p className="accountInfo__input-name">
              Имя
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
              className="accountInfo__input"
              maxLength="30"
              type='text'
            />
            <p className="accountInfo__text-error">{errors.first_name?.message}</p>
          </label>
          <label htmlFor="middle_name" className="accountInfo__label">
            <p className="accountInfo__input-name">
              Отчество
            </p>
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
              className="accountInfo__input"
            />
            <p className="accountInfo__text-error">{errors.middle_name?.message}</p>
          </label>
          <label htmlFor="email" className="accountInfo__label">
            <p className="accountInfo__input-name">
              E-mail
            </p>
            <input
              name="email"
              defaultValue=""
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
              className="accountInfo__input accountInfo__input_type_middle"
            />
            <p className="accountInfo__text-error">{errors.email?.message}</p>
          </label>
          <label htmlFor="phone" className="accountInfo__label">
            <p className="accountInfo__input-name">
              Телефон
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
              className="accountInfo__input accountInfo__input_type_middle"
            />
            <p className="accountInfo__text-error">{errors.phone?.message}</p>
          </label>
          <div className="accountInfo__form__submit">
            <button type="submit" disabled={!isValid && true} className="accountInfo__button-submit">
              Сохранить
            </button>
          </div>
        </form> */}
        <form className="accountChangePassword__form">
          <h2 className="accountChangePassword__form__title">Смена пароля</h2>
          <label htmlFor="password" className="accountInfo__label">
            <p className="accountInfo__input-name">Текущий пароль</p>
            <input
              name="oldPassword"
              defaultValue=""
              maxLength="30"
              type="password"
              {...register('oldPassword', {
                required: 'Обязательное поле',
                maxLength: {
                  value: 30,
                  message: 'Не более 30 символов'
                },
                minLength: {
                  value: 8,
                  message: 'Не менее 8 символов'
                },
                onChange: (event) => {
                  const { value } = event.target;
                  event.target.value = deleteSpaces(value);
                }
              })}
              placeholder=""
              className="accountInfo__input accountInfo__input_type_middle"
            />
            <p className="accountInfo__text-error">{errors.oldPassword?.message}</p>
          </label>
          <div className="accountChangePassword__form__block">
            <label htmlFor="password" className="accountInfo__label">
              <p className="accountInfo__input-name">Новый пароль</p>
              <input
                name="newPassword"
                defaultValue=""
                maxLength="30"
                type="password"
                {...register('newPassword', {
                  required: 'Обязательное поле',
                  maxLength: {
                    value: 30,
                    message: 'Не более 30 символов'
                  },
                  minLength: {
                    value: 8,
                    message: 'Не менее 8 символов'
                  },
                  validate: (val) => {
                    if (watch('oldPassword') === val) {
                      return 'Старый и новый пароль не должны совпадать';
                    }
                  },
                  onChange: (event) => {
                    const { value } = event.target;
                    event.target.value = deleteSpaces(value);
                  }
                })}
                placeholder="Минимум 8 символов (Буквы, цифры, знаки)"
                className="accountInfo__input accountInfo__input_type_middle"
              />
              <p className="accountInfo__text-error">{errors.newPassword?.message}</p>
            </label>
            <label htmlFor="password" className="accountInfo__label">
              <p className="accountInfo__input-name">Повторите пароль</p>
              <input
                name="repeatPassword"
                defaultValue=""
                maxLength="30"
                type="password"
                {...register('repeatPassword', {
                  required: 'Обязательное поле',
                  maxLength: {
                    value: 30,
                    message: 'Не более 30 символов'
                  },
                  minLength: {
                    value: 8,
                    message: 'Не менее 8 символов'
                  },
                  validate: (val) => {
                    if (watch('newPassword') !== val) {
                      return 'Пароли должны совпадать';
                    }
                  },
                  onChange: (event) => {
                    const { value } = event.target;
                    event.target.value = deleteSpaces(value);
                  }
                })}
                placeholder=""
                className="accountInfo__input accountInfo__input_type_middle"
              />
              <p className="accountInfo__text-error">{errors.repeatPassword?.message}</p>
            </label>
          </div>
          <div className="accountInfo__form__submit">
            <button
              type="submit"
              disabled={!isValid && true}
              className="accountInfo__button-submit"
            >
              Сохранить
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
