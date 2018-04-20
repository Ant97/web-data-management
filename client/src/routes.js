import React from 'react';
import { Route } from 'react-router-dom';
import Base from './components/Base.jsx';
import LoginPage from './containers/LoginPage.jsx';
import VisitorSignUpPage from './containers/VisitorSignUpPage.jsx';
import OwnerSignUpPage from './containers/OwnerSignUpPage.jsx';
import AdminDashBoardPage from './containers/AdminDashBoardPage.jsx';
import AddPropertyPage from './containers/AddPropertyPage.jsx';
import ViewVisitorsList from './containers/ViewVisitorsListPage.jsx';
import ViewOwnersList from './containers/ViewOwnersListPage.jsx';
import ViewConfirmedProperties from './containers/ViewConfirmedPropertiesPage.jsx';
import ViewUnconfirmedProperties from './containers/ViewUnconfirmedPropertiesPage.jsx';
import ViewApprovedAnimalsandCrops from './containers/ViewApprovedAnimalsandCropsPage.jsx';
import ViewPendingAnimalsandCrops from './containers/ViewPendingAnimalsandCropsPage.jsx';
import VisitorPropertyDetails from './containers/VisitorPropertyDetailsPage.jsx';


// const routes = {
//   // base component (wrapper for the whole application).
//   component: Base,
//   childRoutes: [

//     {
//       path: '/',
//       component: LoginPage
//     },

<<<<<<< HEAD
//     {
//       path: '/login',
//       component: LoginPage
//     },

//     {
//       path: '/signup/visitor',
//       component: VisitorSignUpPage
//     },
//     {
//       path:'signup/owner',
//       component: OwnerSignUpPage
//     },
//     {
//       path:'/admin/dashboard',
//       component: AdminDashBoardPage
//     },
//     {
//       path:'/owner/addproperty',
//       component: AddPropertyPage
//     }
//   ]
// };
const routes = () => (
  <div>
    <Route path='/login' exact component={LoginPage} />
  </div>
);
=======
    {
      path: '/signup/visitor',
      component: VisitorSignUpPage
    },
    {
      path:'signup/owner',
      component: OwnerSignUpPage
    },
    {
      path:'/admin/dashboardpage',
      component: AdminDashBoardPage
    },
    {
      path:'/owner/addproperty',
      component: AddPropertyPage
    },
    {
      path:'/admin/viewvisitorslist',
      component: ViewVisitorsList
    },
    {
      path:'/admin/viewownerslist',
      component: ViewOwnersList
    },
    {
      path:'/admin/viewconfirmedproperties',
      component: ViewConfirmedProperties
    },
    {
      path:'/admin/viewunconfirmedproperties',
      component: ViewUnconfirmedProperties
    },
    {
      path:'/admin/viewapprovedanimalsandcrops',
      component: ViewApprovedAnimalsandCrops
    },
    {
      path:'/admin/viewpendinganimalsandcrops',
      component: ViewPendingAnimalsandCrops
    },
    {
      path:'/visitor/propertydetails',
      component: VisitorPropertyDetails
    }
  ]
};
>>>>>>> abbb8dc49f5523d6f1b087b9c0ace81cef08b4f9

export default routes;
