import './AuthPage.sass';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ReactComponent as PasswordEyeHide } from './assets/password-eye-hide.svg';
import { ReactComponent as PasswordEyeShow } from './assets/password-eye-show.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { emailRegExp, passwordRegExp } from '../../utils/regExp';
import { Tooltip } from 'react-tooltip';
import { api } from '../../utils/api/api';
import { useDispatch } from 'react-redux';
import { setToken, setLoggedIn } from '../../store/DataSlices/authSlice';
import { setUser } from '../../store/DataSlices/userSLice';

//Удаление пробелов из поля ввода
const deleteSpaces = (value) => {
  return value.replace(/\s/g, '');
};

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Если логин или пароль неверный то появляется тултип с ошибкой
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);

  // State для кнопки показа и скрытия пароля
  const [passwordHide, setPasswordHide] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all'
  });

  const getUserData = (token) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Token ${token}`
        }}

      api.get('/account/data', config).then(res => dispatch(setUser(res.data))).catch(err => console.log(err))
    }


  // Обработка Submit
  const onSubmit = async (data, e) => {
    const authData = {
      email: data.login,
      password: data.password,
    };

    api
      .post('/login/', authData)
      .then((res) => {
        dispatch(setToken(res.data.Token))
        dispatch(setLoggedIn(res.data.Status))
        // getUserData(res.data.Token)
        localStorage.setItem("logIn", res.data.Status);
        localStorage.setItem("token", res.data.Token);


        // document.cookie = `token=${res.data.Token}`;
        // console.log(document.cookie);

        e.target.reset();
        reset();

        navigate('/account');
        setTooltipIsOpen(false);
      })
      .catch((err) => {
        console.warn(`ОШИБКА: "${err.response.data.Errors}"`);
        setTooltipIsOpen(true);
      });
  }



  useEffect(() => {
    setFocus("login");
  }, [setFocus]);

  return (
    <>
      <section className='authform-section'>
      <h2 className='authform-section__title'>Войти в личный кабинет</h2>

      <form
        className='auth-form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          htmlFor="login"
          className="auth-form__label">
            <p>
              Логин<span className="auth-form__label_required"></span>
            </p>
            <input
              {...register('login', {
                required: 'Обязательное поле',
                maxLength: {
                  value: 16,
                  message: 'Не более 16 символов',
                },
                minLength: {
                  value: 6,
                  message: 'Не менее 6 символов',
                },
                pattern: {
                  value: emailRegExp,
                  message: 'Введите корректный логин'
                },
                onChange: (event) => {
                  const { value } = event.target;
                  event.target.value = deleteSpaces(value);
                },
              })}
              name="login"
              defaultValue=""
              placeholder=""
              className={`
                auth-form__input
                ${errors.login && 'auth-form__input_error'}
                ${tooltipIsOpen && 'auth-form__input_error'}
                `}
              type='text'
            />

            <p className="auth__text-error">
              {errors.login?.message}
            </p>

            <Tooltip
              className="auth-form__tooltip"
              classNameArrow="auth-form__error-arrow"
              isOpen={tooltipIsOpen}
              place="bottom"
              anchorSelect=".auth-form__input"
              offset="-5"
            >
              Вы ввели неправильно логин или пароль
            </Tooltip>
          </label>

          <label
            htmlFor="password"
            className="auth-form__label"
          >
            <p>
              Пароль<span className="auth-form__label_required"></span>
            </p>
            <input
              {...register('password', {
                required: 'Обязательное поле',
                pattern: {
                  value: passwordRegExp,
                  message: 'Минимум 8 символов (Буквы, цифры, знаки)'
                },
                onChange: (event) => {
                  const { value } = event.target;
                  event.target.value = deleteSpaces(value);
                },
              })}
              name="password"
              defaultValue=""
              placeholder=""
              className={`
                auth-form__input
                ${errors.password && 'auth-form__input_error'}
                ${tooltipIsOpen && 'auth-form__input_error'}
              `}
              type={passwordHide ? 'password' : 'text'}
            />
            <button
              type='button'
              className='auth-form__passowrd-btn'
              onClick={() => setPasswordHide(!passwordHide)}
            >
              { passwordHide ? <PasswordEyeHide /> : <PasswordEyeShow /> }
            </button>

            <p className="auth__text-error">
              {errors.password?.message}
            </p>
          </label>

          <NavLink
            className='forget-link'
            to='/auth-page'
            onClick={
              () => { alert('Переход по ссылке восстановляения пароля') }
            }
          >
            Забыли пароль?
          </NavLink>

          <button
            type='submit'
            className="auth-form__button-submit"
            disabled={!isValid && true}
          >
            Войти
          </button>
      </form>

      <div className='authform-section__registration'>
        <p className='authform-section__registration-text'>
          У вас нет личного кабинета?
        </p>
        <NavLink
          className='authform-section__registration-link'
          to='/registration-page'
        >
          Зарегистрироваться
        </NavLink>
      </div>
    </section>
    </>

  )
};

export default AuthPage;
