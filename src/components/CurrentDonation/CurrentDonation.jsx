import { useState } from 'react';
import { payment } from '../../vendor/payWidget';
import './CurrentDonation.sass';
import { useForm } from 'react-hook-form';
import { nameRegExp } from '../../utils/regExp';
import { useSelector } from 'react-redux';

//Удаление пробелов и цифр из поля ввода
const deleteSpacesAndFigures = (value) => {
  return value.replace(/\s/g, '').replace(/\d/g, '');
};

//Удаление пробелов и символов из поля ввода
const deleteSpacesAndLetters = (value) => {
  const result = value.replace(/[^\d]/g, '');
  return Number(result);
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

export const CurrentDonation = ({ description = 'Добровольное пожертвование', afterPay }) => {
  const [monthly, setMonthly] = useState(false);
  const fundId = useSelector((state) => state.activeFund.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all'
  });

  const onSubmit = (data) => {
    if (monthly) {
      const subscriptionPaynment = {
        amount: Number(data.amount),
        description: description,
        interval: 'Month',
        period: 1,
        payer: data.name,
        phone: data.phone,
        id: fundId,
        afterPay: afterPay
      };
      payment(subscriptionPaynment);
    } else {
      const singlePaynment = {
        amount: Number(data.amount),
        description: description,
        payer: data.name,
        phone: data.phone,
        id: fundId,
        afterPay: afterPay
      };
      payment(singlePaynment);
    }
    reset();
    setMonthly(false);
  };

  const onSubmitOne = () => {
    setMonthly(false);
  };

  const onSubmitTwo = () => {
    setMonthly(true);
  };

  return (
    <form className="current__donation-containter" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="current__description">{description}</h2>
      <div className='current__inputs'>
        <div className="current__input-block">
          <input
            className="current__donation_input_form_amount"
            {...register('amount', {
              required: {
                value: true,
                message: 'Обязательное поле'
              },
              maxLength: {
                value: 6,
                message: 'Не более 6 символов'
              },
              validate: (value) => value >= 50,
              minLength: {
                value: 2,
                message: 'Не менее 2 символов'
              },
              onChange: (event) => {
                const { value } = event.target;
                event.target.value = deleteSpacesAndLetters(value);
              }
            })}
            maxLength="6"
            defaultValue="500"
            placeholder="Сумма"
          />{' '}
          <span className="current__donation_input_form_currency">Р</span>
        </div>
        <span className="current__error-amount">{errors.amount?.message}</span>

        <input
          className="current__donation_input_form"
          type="text"
          {...register('name', {
            required: {
              value: true,
              message: 'Обязательное поле'
            },
            pattern: {
              value: nameRegExp,
              message: 'Допустимы только русские или английские буквы'
            },
            maxLength: {
              value: 15,
              message: 'Не более 15 символов'
            },
            minLength: {
              value: 2,
              message: 'Не менее 2 символов'
            },
            onChange: (event) => {
              const { value } = event.target;
              event.target.value = deleteSpacesAndFigures(value);
            }
          })}
          maxLength="15"
          placeholder="Имя"
        />
        <span className="current__error-name">{errors.name?.message}</span>

        <input
          className="current__donation_input_form"
          type="tel"
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
          maxLength="17"
          placeholder="8 (000) 000-00-00"
        />
        <span className="current__error-phone">{errors.phone?.message}</span>
      </div>

      <button
        type="submit"
        className="current__donation-submit"
        disabled={!isValid}
        onClick={onSubmitOne}
      >
        Единоразовая помощь
      </button>
      <button
        type="submit"
        className="current__donation-submit"
        disabled={!isValid}
        onClick={onSubmitTwo}
      >
        Подписка
      </button>
    </form>
  );
};
