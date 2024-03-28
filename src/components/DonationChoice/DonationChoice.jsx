import { payment } from '../../vendor/payWidget';
import './DonationChoice.sass';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { nameRegExp } from '../../utils/regExp';

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

export const DonationChoice = ({
  currentAmount,
  description = 'Добровольное пожертвование',
  afterPay
}) => {
  const [monthly, setMonthly] = useState(false);

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
        amount: Number(currentAmount),
        description: description,
        interval: 'Month',
        period: 1,
        payer: data.name,
        phone: data.phone,
        afterPay: afterPay,
        id: 11,
      };
      payment(subscriptionPaynment);
    } else {
      const singlePaynment = {
        amount: Number(currentAmount),
        description: description,
        payer: data.name,
        phone: data.phone,
        afterPay: afterPay,
        id: 11,
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
    <form className="donation__choice-containter" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="donation__description">{description}</h2>
      <p className="donation__amount_text">{currentAmount} P</p>

      <input
        className="donation__donation_input_form"
        type="text"
        {...register('name', {
          required: {
            value: true,
            message: 'Обязательное поле'
          },
          pattern: {
            value: nameRegExp,
            message: 'Допустимы только буквы'
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
      <span className="donation__error">{errors.name?.message}</span>

      <input
        className="donation__donation_input_form"
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
      <span className="donation__error-phone">{errors.phone?.message}</span>

      <button
        type="submit"
        className="donation__choice-button"
        disabled={!isValid}
        onClick={onSubmitOne}
      >
        Единоразовая помощь
      </button>
      <button
        type="submit"
        className="donation__choice-button"
        disabled={!isValid}
        onClick={onSubmitTwo}
      >
        Подписка
      </button>
    </form>
  );
};
