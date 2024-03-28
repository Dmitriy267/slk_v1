import React from 'react';
import './Main.sass';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../../pages/Home/Home';
import Agreement from '../../pages/Agreement/Agreement';
import About from '../../pages/About/About';
import { Contacts } from '../../pages/Contacts/Contacts';
import Help from '../../pages/Help/Help';
import { CookiesAccept } from '../../components/CookiesAccept/CookiesAccept';
import { Projects } from '../../pages/Projects/Projects'
import { Partners } from '../../pages/Partners/Partners'
import { News } from '../../pages/News/News';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CookiesPolicy } from '../../pages/CookiesPolicy/CookiesPolicy';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
// import { CartPage } from '../../pages/CartPage/CartPage';
// import AuthPage from '../../pages/AuthPage/AuthPage';
// import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
// import { RegistrationSuccess } from '../../pages/RegistrationSuccess/RegistrationSuccess';
// import DeliveryPage from '../../pages/DeliveryPage/DeliveryPage';
// import PersonalAccount from '../../pages/PersonalAccount/PersonalAccount';
// import { PrivateRoutes } from '../../utils/PrivateRoutes';
// import { Shop } from '../../pages/Shop/Shop';

export const Main = () => {
  // Отслеживаем url
  const {pathname} = useLocation();

  // Каждый раз при именение url перемещаемся в начало страницы
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return(
    <main className='main'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/about/*" element={<About />} />
        <Route exact path="/help/*" element={<Help />} />
        <Route exact path="/contacts" element={<Contacts />} />
        <Route exact path="/projects/*" element={<Projects />} />
        <Route exact path="/partners" element={<Partners />} />
        <Route exact path="/news/*" element={<News />} />
        <Route path='/*' element={<NotFoundPage/>} />
        <Route exact path="/agreement" element={<Agreement />} />
        <Route exact path="/cookies-policy" element={<CookiesPolicy />} />
 

        {/* <Route exact path="/shop/*" element={<Shop />} />
        <Route exact path='/cart-page' element={<CartPage/>} />
        <Route exact path='/auth-page' element={<AuthPage />} />
        <Route exact path='/registration-page' element={<RegistrationPage />} />
        <Route exact path='/registration-success' element={<RegistrationSuccess />} />
        <Route exact path='/delivery-page' element={<DeliveryPage />} />
        <Route element={<PrivateRoutes />}>
          <Route exact path="/account/*" element={<PersonalAccount />} />
        </Route> */}

      </Routes>

      <CookiesAccept />
    </main>
  )
}
