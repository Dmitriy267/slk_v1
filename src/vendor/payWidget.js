import { api } from '../utils/api/api';
import store from '../store/index'
import { addNewPaymentFundraisingData } from '../store/DataSlices/fundraisingSlice';

export const payment = (data) => {
  const cp = window.cp;
  let widget = new cp.CloudPayments();
  const { amount, description, payer, id, afterPay, phone } = data;

  widget.pay(
    'auth', // или 'charge'
    {
      //options
      publicId: process.env.REACT_APP_PUBLICK_ID, //id из личного кабинета
      description: description, //назначение
      amount: amount, //сумма
      currency: 'RUB', //валюта
      // accountId: 'user@example.com', //идентификатор плательщика (необязательно)
      // invoiceId: '111111', //номер заказа  (необязательно)
      // email: 'user@example.com', //email плательщика (необязательно)
      // skin: 'classic', //дизайн виджета (необязательно)
      data: {
        myProp: 'myProp value'
      }
    },
    {
      onSuccess: function (options) {
        const suppportData = {
          name: payer,
          sum: amount,
          collection: id,
          number: phone
        };

        api
          .post('/assistance/support/', suppportData)
          .then((res) => {
            store.dispatch(addNewPaymentFundraisingData(res))
          })
          .catch((err) => console.log(err));

        afterPay();
      },
      onFail: function (reason, options) {
        // fail
        //действие при неуспешной оплате
      },
      onComplete: function (paymentResult, options) {
        //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
        //например вызов вашей аналитики Facebook Pixel
      }
    }
  );
};
