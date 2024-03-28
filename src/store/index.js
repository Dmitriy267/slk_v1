import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import fundraisingSlice from './DataSlices/fundraisingSlice';
import centerSlice from './DataSlices/centerSlice';
import specialistsSlice from './DataSlices/specialistsSlice';
import specialistsPageSlice from './DataSlices/specialistsPageSlice';
import contactsSlice from './DataSlices/contactsSlice';
import documentsSlice from './DataSlices/documentsSlice';
import aboutSadSlice from './DataSlices/aboutSadSlice';
import aboutSchoolSlice from './DataSlices/aboutSchoolSlice';
import aboutSrvSlice from './DataSlices/aboutSrvSlice';
import aboutWorkshopSlice from './DataSlices/aboutWorkshopSlice';
import aboutCenterSlice from './DataSlices/aboutCenterSlice';
import jobsSlice from './DataSlices/jobsSlice';
import edSiteSlice from './DataSlices/edSiteSlice';
import partnersSlice from './DataSlices/partnersSlice';
import newsSlice from './DataSlices/newsSlice';
import authSlice from './DataSlices/authSlice';
import userSlice from './DataSlices/userSLice';
import projectsSlice from './DataSlices/projectsSlice';
import activeFundSlice from './DataSlices/activeFund';
// import cartItemsSlice from './DataSlices/cartItemsSlice';
// import productsSlice from './DataSlices/productsSlice';
// import emailChangeModalReducer from './emailChangeModalSlice';

export default configureStore({
  reducer: {
    modal: modalReducer,
    homeCenter: centerSlice,
    specialists: specialistsSlice,
    specialistsPage: specialistsPageSlice,
    contactsPage: contactsSlice,
    documents: documentsSlice,
    aboutSad: aboutSadSlice,
    aboutSchool: aboutSchoolSlice,
    aboutSrv: aboutSrvSlice,
    aboutWorkshop: aboutWorkshopSlice,
    aboutCenter: aboutCenterSlice,
    jobs: jobsSlice,
    edSite: edSiteSlice,
    partners: partnersSlice,
    news: newsSlice,
    auth: authSlice,
    user: userSlice,
    projects: projectsSlice,
    // cart: cartItemsSlice,
    // emailChangeModal: emailChangeModalReducer,
    // products: productsSlice,
    fundraising: fundraisingSlice,
    activeFund: activeFundSlice,
  }
});
