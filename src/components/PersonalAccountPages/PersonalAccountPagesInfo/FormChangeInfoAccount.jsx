import './PersonalAccountPagesInfo.sass';
import { useForm } from 'react-hook-form';
import { nameRegExp, emailRegExp } from '../../../utils/regExp';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { useEffect, useRef, useState } from 'react';
import { EmailChangeModal } from '../../EmailChangeModal/EmailChangeModal';
import { useDispatch, useSelector } from 'react-redux';
import { openEmailChangeModal, setEmailChange } from '../../../store/emailChangeModalSlice';
import { Tooltip } from 'react-tooltip';

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

export const FormChangeInfoAccount = ({userData}) => {
  const isMobile = useMediaQuery('(max-width: 415px)');

  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.user.data);
  //const emailChange = useSelector((state) => state.emailChangeModal.email);

  const filePicker = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Обработчик загрузки картинки
  const handlePick = (e) => {
    e.preventDefault();
    filePicker.current.click();
  };

  const {
    register,
    setFocus,
    watch,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    // начальные значения должны приходить с бэка
    //defaultValues: async () => await fetch('/api')
    defaultValues: {
      first_name: userData.first_name,
      last_name: userData.last_name,
      middle_name: userData.middle_name,
      email: userData.email,
      phone: userData.phone
    }
  });

  // Обработчик отображения привью загруженной картинки
  useEffect(() => {
    if (selectedFile !== null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  }, [selectedFile]);

  // Обработчик нажатия на кнопку загрузки аватара
  const handleChangeAvatar = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Обработчик нажатия на кнопку удаления аватара
  const handleDeleteAvatar = (e) => {
    e.preventDefault();
    setSelectedFile(null);
  };

  const onSubmit = (data) => {
    // должны сравнивать с емайлом, пришедшим с бэка - if (data.email !== defaultValues.email)
    // пока заглушка
    dispatch(setEmailChange(data.email));
    if (data.email !== '') dispatch(openEmailChangeModal());
  };

  return (
    <>
      <EmailChangeModal />
      <form className="accountInfo__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="accountInfo__form__avatar-conteiner">
          <input
            className="accountInfo__form__upload-input"
            ref={filePicker}
            type="file"
            onChange={handleChangeAvatar}
            accept="image/*,.png,.jpg,.jpeg,.web,"
          />
          <div className="accountInfo__form__avatar">
            {selectedFile !== null && (
              <img src={preview} alt="Ваша фотография" className="accountInfo__avatar" />
            )}
          </div>
          <Tooltip
            anchorSelect=".accountInfo__form__avatar"
            className={`
              accountInfo__form__avatar-tooltip
              ${!selectedFile && "accountInfo__form__avatar_not-selected"}
            `}
            classNameArrow="accountInfo__form__avatar-tooltip-arrow"
            clickable={true}
            offset="0"
            place="right"
          >
            {selectedFile ? (
              <>
                <button
                  className="accountInfo__form__avatar-buttonDownload"
                  onClick={handlePick}
                >
                  Выбрать фото
                </button>
                <button
                  className="accountInfo__form__avatar-buttonBusket"
                  onClick={handleDeleteAvatar}
                >
                  {' '}
                  Удалить фото{' '}
                </button>
              </>
            ) : (
              <button className="accountInfo__form__avatar-buttonDownload" onClick={handlePick}>
                Выбрать фото
              </button>
            )}
          </Tooltip>
        </div>
        <label htmlFor="last_name" className="accountInfo__label">
          <p className="accountInfo__input-name">Фамилия</p>
          <input
            name="last_name"
            maxLength="30"
            {...register('last_name', {
              required: 'Обязательное поле',
              maxLength: {
                value: 30,
                message: 'Не более 30 символов'
              },
              minLength: {
                value: 2,
                message: 'Не менее 2 символов'
              },
              pattern: {
                value: nameRegExp,
                message: 'Допустимы только русские или английские буквы'
              },
              onChange: (event) => {
                const { value } = event.target;
                event.target.value = deleteSpacesAndFigures(value);
              }
            })}
            placeholder="Фамилия"
            className="accountInfo__input"
            type="text"
          />
          <p className="accountInfo__text-error">{errors.last_name?.message}</p>
        </label>
        <label htmlFor="first_name" className="accountInfo__label">
          <p className="accountInfo__input-name">Имя</p>
          <input
            {...register('first_name', {
              required: 'Обязательное поле',
              maxLength: {
                value: 30,
                message: 'Не более 30 символов'
              },
              minLength: {
                value: 2,
                message: 'Не менее 2 символов'
              },
              pattern: {
                value: nameRegExp,
                message: 'Допустимы только русские или английские буквы'
              },
              onChange: (event) => {
                const { value } = event.target;
                event.target.value = deleteSpacesAndFigures(value);
              }
            })}
            name="first_name"
            placeholder="Имя"
            className="accountInfo__input"
            maxLength="30"
            type="text"
          />
          <p className="accountInfo__text-error">{errors.first_name?.message}</p>
        </label>
        <label htmlFor="middle_name" className="accountInfo__label">
          <p className="accountInfo__input-name">Отчество</p>
          <input
            name="middle_name"
            defaultValue=""
            maxLength="30"
            type="text"
            {...register('middle_name', {
              required: false,
              maxLength: {
                value: 30,
                message: 'Не более 30 символов'
              },
              minLength: {
                value: 2,
                message: 'Не менее 2 символов'
              },
              pattern: {
                value: nameRegExp,
                message: 'Допустимы только русские или английские буквы'
              },
              onChange: (event) => {
                const { value } = event.target;
                event.target.value = deleteSpacesAndFigures(value);
              }
            })}
            placeholder="Отчество"
            className="accountInfo__input"
          />
          <p className="accountInfo__text-error">{errors.middle_name?.message}</p>
        </label>
        <label htmlFor="email" className="accountInfo__label">
          <p className="accountInfo__input-name">E-mail</p>
          <input
            name="email"
            defaultValue=""
            maxLength="30"
            type="email"
            {...register('email', {
              required: 'Обязательное поле',
              maxLength: {
                value: 30,
                message: 'Не более 30 символов'
              },
              minLength: {
                value: 2,
                message: 'Не менее 2 символов'
              },
              pattern: {
                value: emailRegExp,
                message: 'Введите корректный email'
              },
              onChange: (event) => {
                const { value } = event.target;
                event.target.value = deleteSpaces(value);
              }
            })}
            placeholder="E-mail"
            className="accountInfo__input accountInfo__input_type_middle"
          />
          <p className="accountInfo__text-error">{errors.email?.message}</p>
        </label>
        <label htmlFor="phone" className="accountInfo__label">
          <p className="accountInfo__input-name">Телефон</p>
          <input
            name="phone"
            type="tel"
            defaultValue=""
            {...register('phone', {
              required: 'Обязательное поле',
              maxLength: {
                value: 30,
                message: 'Не более 30 символов'
              },
              minLength: {
                value: 17,
                message: 'Телефон состоит из 11 цифр'
              },
              onChange: (event) => phoneMask(event)
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
      </form>
    </>
  );
};
