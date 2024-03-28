import './styles/@globals.sass';
import React from 'react';
import { Header } from './layout/Header/Header';
import { Footer } from './layout/Footer/Footer';
import { Main } from './layout/Main/Main';
import { useEffect } from 'react';
import { api } from './utils/api/api';
import { useDispatch } from 'react-redux';
import { setData, setIsLoading } from './store/DataSlices/centerSlice';
import { setSpecialistsData, setSpecialistsIsLoading } from './store/DataSlices/specialistsSlice';
import { setContactsData, setContactsIsLoading } from './store/DataSlices/contactsSlice';
import { setDocuments, setDocumentsIsLoading } from './store/DataSlices/documentsSlice';
import { setAboutSadData, setAboutSadIsLoading } from './store/DataSlices/aboutSadSlice';
import { setAboutSchoolData, setAboutSchoolIsLoading } from './store/DataSlices/aboutSchoolSlice';
import { setAboutSrvData, setAboutSrvIsLoading } from './store/DataSlices/aboutSrvSlice';
import {
  setAboutWorkshopData,
  setAboutWorkshopIsLoading
} from './store/DataSlices/aboutWorkshopSlice';
import { setAboutCenterData, setAboutCenterIsLoading } from './store/DataSlices/aboutCenterSlice';
import { setJobsData, setJobsIsLoading } from './store/DataSlices/jobsSlice';
import { setEdSiteData, setEdSiteDataIsLoading } from './store/DataSlices/edSiteSlice';
import {
  setSpecialistsPageData,
  setSpecialistsPageIsLoading
} from './store/DataSlices/specialistsPageSlice';
import { setPartnersData, setPartnersIsLoading } from './store/DataSlices/partnersSlice';
import { setNewsData, setNewsIsLoading } from './store/DataSlices/newsSlice';
import { setLoggedIn, setToken } from './store/DataSlices/authSlice';
import { setUser } from './store/DataSlices/userSLice';
import { setProjectsData, setProjectsIsLoading } from './store/DataSlices/projectsSlice';
import { setProductsData, setProductsIsLoading } from './store/DataSlices/productsSlice';
import { setFundraisingData, setFundraisingIsLoading } from './store/DataSlices/fundraisingSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Запрос данных секции О центре и для hero блока
    api
      .get()
      .then((res) => {
        dispatch(setData(res.data[0]));
        dispatch(setIsLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setIsLoading(false));
      });

    // Запрос данных Специалисты
    api
      .get('/center/specialists/')
      .then((res) => {
        dispatch(setSpecialistsData(res.data.results));
        dispatch(setSpecialistsIsLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setSpecialistsIsLoading(false));
      });

    // Запрос данных Контакты
    api
      .get('/contacts/')
      .then((res) => {
        dispatch(setContactsData(res.data[0]));
        dispatch(setContactsIsLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setContactsIsLoading(false));
      });

    // Документы
    api
      .get('/documents/')
      .then((res) => {
        dispatch(setDocuments(res.data));
        dispatch(setDocumentsIsLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setContactsIsLoading(false));
      });

    // Запрос данных для страницы САД
    api
      .get('/center/kindergarten/')
      .then((res) => {
        dispatch(setAboutSadData(res.data[0]));
        dispatch(setAboutSadIsLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAboutSadIsLoading(false));
      });

    // Запрос данных для страницы ШКОЛА
    api
      .get('/center/school/')
      .then((res) => {
        dispatch(setAboutSchoolData(res.data[0]));
        dispatch(setAboutSchoolIsLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAboutSchoolIsLoading(false));
      });

    // Запрос данных для страницы СРВ
    api
      .get('/center/eis/')
      .then((res) => {
        dispatch(setAboutSrvData(res.data[0]));
        dispatch(setAboutSrvIsLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAboutSrvIsLoading(false));
      });

    // Запрос данных для страницы МАСТЕРСКИЕ
    api
      .get('/center/workshops/')
      .then((res) => {
        dispatch(setAboutWorkshopData(res.data[0]));
        dispatch(setAboutWorkshopIsLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAboutWorkshopIsLoading(false));
      });

    // Запрос данных для страницы ЦЕНТР
    api
      .get('/center/')
      .then((res) => {
        dispatch(setAboutCenterData(res.data[0]));
        dispatch(setAboutCenterIsLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAboutCenterIsLoading(false));
      });

    // Запрос данных видов работ для формы Волонтер
    api
      .get('/assistance/jobs/')
      .then((res) => {
        dispatch(setJobsData(res.data));
        dispatch(setJobsIsLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setJobsIsLoading(false));
      });

    // Запрос данных для кнопки Перейти на образовательный сайт
    api
      .get('/center/educational-site/')
      .then((res) => {
        dispatch(setEdSiteData(res.data[0]));
        dispatch(setEdSiteDataIsLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setEdSiteDataIsLoading(false));
      });

    // Запрос данных страницы Специалисты описание
    api
      .get('/center/specialists-page/')
      .then((res) => {
        dispatch(setSpecialistsPageData(res.data[0]));
        dispatch(setSpecialistsPageIsLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setSpecialistsPageIsLoading(false));
      });

    // Запрос данных для страницы ПАРТНЕРЫ
    api
      .get('/partners/')
      .then((res) => {
        dispatch(setPartnersData(res.data));
        dispatch(setPartnersIsLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setPartnersIsLoading(false));
      });

    // Запрос данных для страницы НОВОСТИ
    api
      .get('/news/')
      .then((res) => {
        dispatch(setNewsData(res.data));
        dispatch(setNewsIsLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setNewsIsLoading(false));
      });

    // Запрос данных для страницы ПРОЕКТЫ
    api
      .get('/projects/')
      .then((res) => {
        dispatch(setProjectsData(res.data.results));
        dispatch(setProjectsIsLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setProjectsIsLoading(false));
      });

    // Запрос данных для страницы ТОВАРЫ
    // api
    //   .get('/products/')
    //   .then((res) => {
    //     dispatch(setProductsData(res.data.results));
    //     dispatch(setProductsIsLoading(true));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     dispatch(setProductsIsLoading(false));
    //   });

    // Запрос данных для страницы СБОРЫ
    api
      .get('/assistance/collections/')
      .then((res) => {
        dispatch(setFundraisingData(res.data.results));
        dispatch(setFundraisingIsLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setFundraisingIsLoading(false));
      });
  }, []);

  // При загрузке проверяем local storage на статус авторизации
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfo = JSON.parse(localStorage.getItem('user'));
    // Если статуст Авторизован, только в этом случае извлекаем все данные из Local Storage
    if (localStorage.getItem('logIn')) {
      dispatch(setLoggedIn(true));
      dispatch(setToken(token));
      dispatch(setUser(userInfo));
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
