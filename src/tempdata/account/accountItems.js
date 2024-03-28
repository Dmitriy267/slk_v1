import photo1 from './images/photo1.png';


export const accountItems = [
  {
    date: '28.02.2023',
    status: true,
    goods: [{
      image: photo1,
      code: '003',
      title: 'Название товара',
    }],
    sum: 1000,
    id: 2351
  },
  {
    date: '20.02.2023',
    status: false,
    goods: [{
      image: photo1,
      code: '003',
      title: 'Название товара',
    }],
    sum: 500,
    id: 98098042
  },
  {
    date: '15.01.2023',
    status: true,
    goods: [{
        image: photo1,
        code: '002',
        title: 'Название товара',
      },
      {
        image: photo1,
        code: '001',
        title: 'Название товара',
    }],
    sum: 10000,
    id: 2390480
  },
  {
    date: '15.01.2023',
    status: false,
    goods: [{
      image: photo1,
      code: '002',
      title: 'Название товара',
    },
    {
      image: photo1,
      code: '001',
      title: 'Название товара',
  }],
    sum: 10000,
    id: 2390423
  },
]
