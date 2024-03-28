import './RegistrationPage.sass';
import { ReactComponent as Unchecked } from './assets/checkbox-unchecked.svg';
import { ReactComponent as UncheckedError } from './assets/checkbox-unchecked-error.svg';
import { ReactComponent as Checked } from './assets/checkbox-checked.svg';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { nameRegExp, emailRegExp, passwordRegExp } from '../../utils/regExp';
import { ResponseModal } from '../../components/ResponseModal/ResponseModal';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modalSlice';
import { api } from '../../utils/api/api';

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

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const [checkedAgreement, setCheckedAgreement] = useState(false);
  const [checkedRecaptcha, setCheckedRecaptcha] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setFocus,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all'
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [Message, setMessage] = useState('');

  // Обработка Submit
  const onSubmit = async (data, e) => {
    const registrationData = {
      email: data.email,
      last_name: data.last_name,
      first_name: data.first_name,
      middle_name: data.middle_name,
      password: data.password,
      phone: data.phone
    };

    api
      .post('/register/', registrationData)
      .then((res) => {
        console.log(res)
        setMessage('');
        setIsSuccess(true);
        e.target.reset();
        reset();
        navigate('/registration-success')
      })
      .catch((err) => {
        console.log(err)

        let errMessage = '';
        setMessage(errMessage);
        setIsSuccess(false);
        //Открытие модального окна
        dispatch(openModal());
      });

    setCheckedAgreement(false);
    setCheckedRecaptcha(false);
  };

  useEffect(() => {
    setFocus('last_name');
  }, [setFocus]);

  // Отслеживаем пароль для confirm_password
  const password = watch('password');

  return (
    <>
      <ResponseModal
        isSaccess={isSuccess}
        Message={Message}
      />
      <section className="registration">
        <h2 className="registration__title">Регистрация аккаунта</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="registration__form"
        >
          <div className="input-wrapper">
            <label
              htmlFor="last_name"
              className="registration__label"
            >
              <p>
                Фамилия<span className="registration__label_required">*</span>
              </p>
              <input
                name="last_name"
                defaultValue=""
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
                className={`
                  registration__input
                  ${errors.last_name && 'registration__input_error'}
                `}
                type="text"
              />

              <p className="registration__text-error">
                {errors.last_name?.message}
              </p>
            </label>
            <label
              htmlFor="first_name"
              className="registration__label"
            >
              <p>
                Имя<span className="registration__label_required">*</span>
              </p>
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
                defaultValue=""
                className={`
                  registration__input
                  ${errors.first_name && 'registration__input_error'}
                `}
                maxLength="30"
                type="text"
              />

              <p className="registration__text-error">
                {errors.first_name?.message}
              </p>
            </label>
            <label
              htmlFor="middle_name"
              className="registration__label"
            >
              Отчество
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
                className="registration__input"
              />

              <p className="registration__text-error">
                {errors.middle_name?.message}
              </p>
            </label>
          </div>

          <div className="input-wrapper">
            <label
              htmlFor="email"
              className="registration__label"
            >
              <p>
                E-mail<span className="registration__label_required">*</span>
              </p>
              <input
                name="email"
                defaultValue=""
                maxLength="30"
                type="email"
                {...register('email', {
                  required: 'Пожалуйста, проверьте информацию и попробуйте снова',
                  pattern: {
                    value: emailRegExp,
                    message: 'Введите корректный email'
                  },
                  onChange: (event) => {
                    const { value } = event.target;
                    event.target.value = deleteSpaces(value);
                  }
                })}
                placeholder="На указанный E-mail будут приходить чеки об оплате"
                className={`
                  registration__input
                  ${errors.email && 'registration__input_error'}
                `}
              />

              <p className="registration__text-error">
                {errors.email?.message}
              </p>
            </label>
            <label
              htmlFor="phone"
              className="registration__label"
            >
              <p>
                Телефон<span className="registration__label_required">*</span>
              </p>
              <input
                name="phone"
                type="tel"
                defaultValue=""
                {...register('phone', {
                  required: 'Обязательное поле',
                  onChange: (event) => phoneMask(event),
                  minLength: {
                    value: 17,
                    message: 'Телефон состоит из 11 цифр'
                  }
                })}
                className={`
                  registration__input
                  ${errors.phone && 'registration__input_error'}
                `}
              />

              <p className="registration__text-error">
                {errors.phone?.message}
              </p>
            </label>
            <label
              htmlFor="password"
              className="registration__label"
            >
              <p>
                Пароль<span className="registration__label_required">*</span>
              </p>
              <input
                {...register('password', {
                  required: 'Минимум 8 символов (Буквы, цифры, знаки)',
                  pattern: {
                    value: passwordRegExp,
                    message: 'Минимум 8 символов (Буквы, цифры, знаки)'
                  },
                  onChange: (event) => {
                    const { value } = event.target;
                    event.target.value = deleteSpaces(value);
                  }
                })}
                name="password"
                defaultValue=""
                placeholder="Минимум 8 символов (Буквы, цифры, знаки)"
                className={`
                  registration__input
                  ${errors.password && 'registration__input_error'}
                `}
                type="text"
              />
              <p className="registration__text-error">
                {errors.password?.message}
              </p>
            </label>
            <label
              htmlFor="confirm_password"
              className="registration__label"
            >
              <p>
                Повторите пароль<span className="registration__label_required">*</span>
              </p>
              <input
                {...register('confirm_password', {
                  required: 'Пожалуйста, проверьте информацию и попробуйте снова',
                  validate: (value) => value === password || 'Пароль не совпадает'
                })}
                name="confirm_password"
                className={`
                  registration__input
                  ${errors.confirm_password && 'registration__input_error'}
                `}
                type="text"
              />

              <p className="registration__text-error">
                {errors.confirm_password?.message}
              </p>
            </label>
          </div>

          <label
            className="registration__checkbox-agreement"
            htmlFor="agreement_check"
          >
            <input
              {...register('agreement_check', {
                required: 'Обязательное поле',
                onChange: () => setCheckedAgreement(!checkedAgreement),
              })}
              className="registration__checkbox-agreement-input visually-hidden"
              type="checkbox"
              checked={checkedAgreement}
              id="agreement_check"
            />
            <div className="registration__checkbox-agreement-text">
              Принимаю условия
              <NavLink
                to="/agreement"
                className="registration__form__link"
              >
                пользовательского соглашения
              </NavLink>

              <p className="registration__text-error">
                {errors.agreement_check?.message}
              </p>
            </div>
            <span className="registration__checkbox-agreement-box">
              {errors.agreement_check ? <UncheckedError /> : <Unchecked />}
              {checkedAgreement && (
                <Checked className="registration__checkbox-agreement-box_checked" />
              )}
            </span>
          </label>

          <div className="registration__form__submit">
            <div className={`
                recaptcha
                ${errors.recaptcha_check && 'registration__input_error'}
              `}
            >
              <label
                className="registration__checkbox-recaptcha"
                htmlFor="recaptcha_check"
              >
                <input
                  {...register('recaptcha_check', {
                    required: 'Обязательное поле',
                    onChange: () => setCheckedRecaptcha(!checkedRecaptcha),
                  })}
                  className="registration__checkbox-agreement-input visually-hidden"
                  type="checkbox"
                  checked={checkedRecaptcha}
                  id="recaptcha_check"
                />
                <div className="registration__checkbox-recaptcha-text">
                  Я не робот
                </div>
                <span className="registration__checkbox-recaptcha-box">
                  {errors.recaptcha_check ? <UncheckedError /> : <Unchecked />}
                  {checkedRecaptcha && (
                    <Checked className="registration__checkbox-recaptcha-box_checked" />
                  )}
                </span>
              </label>

              <p className="registration__text-error recaptcha__error">
                {errors.recaptcha_check?.message}
              </p>
            </div>

            <button
              type="submit"
              disabled={!isValid && true}
              className="registration__button-submit"
            >
              Зарегистрироваться
            </button>
          </div>

          <div className="registration__login">
            <p className="registration__login-text">
              У вас уже есть личный кабинет?
            </p>
            <NavLink
              className="registration__link-link"
              to="/auth-page"
            >
              Войти
            </NavLink>
          </div>
        </form>
      </section>
    </>
  );
};

export default RegistrationPage;
