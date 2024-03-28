import './RegistrationSuccessForm.sass'
import Button from '../Button/ButtonMain'
import { ResponseModal } from '../ResponseModal/ResponseModal';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { api } from '../../utils/api/api';
import { useDispatch} from 'react-redux';
import { openModal } from '../../store/modalSlice';

//Удаление пробелов из поля ввода
const deleteSpaces = (value) => {
    return value.replace(/\s/g, '');
};

export const RegistrationSuccessForm = () => {
    const dispatch = useDispatch();

    const [ seconds, setSeconds ] = useState(5);
    const [ timerActive, setTimerActive ] = useState(true);
    const [ isSentLinkBlocked, setIsSentLinkBlocked ] = useState(true);

    //Таймер
    useEffect(() => {
        if (seconds > 0 && timerActive && isSentLinkBlocked) {
            setTimeout(setSeconds, 500, seconds - 1);
        } else {
            setTimerActive(false);
            setIsSentLinkBlocked(false);
        };

      }, [ seconds, timerActive, isSentLinkBlocked]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
        } = useForm({
            // resolver: yupResolver(schema),
            mode: 'all',
        });

        const [isSuccess, setIsSuccess] = useState(false);
        const [Message, setMessage] = useState('');
        
        // Обработка Submit (отправка данных формы на почту)
        const onSubmit = async (data, e) => {
            api
              .post('/center/volunteers/', data)
              .then(async (res) => {
                await fetch('https://api.web3forms.com/submit', {
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


    return (
        <>
        <ResponseModal isSaccess={isSuccess} Message={Message} />
        <section className="registrationSuccessForm">
            <h2 className="registrationSuccessForm__title">Вы успешно зарегистрированы!</h2>
            <div className="registrationSuccessForm__content">
                <div className="registrationSuccessForm__text">
                    На почту  (почта пользователя) отправлено письмо со ссылкой для подтверждения регистрации.
                </div>
                <div className="registrationSuccessForm__text">
                    Если вы не можете найти письмо, проверьте, пожалуйста, папку спам.
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="registrationSuccess__form">
            {/* Скрытый imput для отправки почты на форму через сервис web3forms.com */}
            <input
                type="hidden"
                value="2371d134-5ed4-47a6-a023-efd0b8b10a43"
                {...register('access_key')}
            />
                <label htmlFor="email" className="registrationSuccessForm__label">
                    <p className="registrationSuccessForm__text-mail">
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
                        value: '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$',
                        message: 'Введите корректный email',
                        },
                        onChange: (event) => {
                        const { value } = event.target;
                        event.target.value = deleteSpaces(value);
                        },
                    })}
                    placeholder="E-mail"
                    className="registrationSuccessForm__input"
                    />
                    <p className="registrationSuccessForm__text-error">{errors.email?.message}</p>
                </label>
                <div className="registrationSuccessForm__button">
                    {isSentLinkBlocked ? (<Button disabled={true} title='Отправить письмо повторно' size='387px' color='#CDCDCD' backColor='#ABABAB'/>) : (<Button disabled={false} onClick={() => (setSeconds(5) && setTimerActive(true) && isSentLinkBlocked(true))} title='Отправить письмо повторно' size='387px' color='#F8F8F8' backColor='#FF8227' type='sumbit'/>)}
                    
                </div>
            </form>
            <p className="registrationSuccessForm__timer" >Через {seconds} сек</p>
        </section>
        </>
    );
};