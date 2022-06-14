import CityList from '../pages/CityList';
import Home from '../pages/Home';
import HomeIndex from '../pages/Home/HomeIndex'
import LookingRoom from '../pages/Home/LookingRoom'
import Consulting from '../pages/Home/Consulting'
import PersonalCenter from '../pages/Home/PersonalCenter'
import Login from '../pages/Login'
import Register from '../pages/Register'

import Map from '../pages/Map'


import { Navigate } from 'react-router-dom';
 
export default [
  {
    path: '/',
    element: <Navigate to='/login' />,
  },
  {
    path: '/register',
    element:<Register />
  },
  {
    path: '/login',
    element:<Login />
  },
  {
    path: '/home/*',
    element: <Home />,
    children: [
      {
      path: '/home/*',
      element: <Navigate to='homeindex' />
    },
    {
      path: 'homeindex',
      element: <HomeIndex />,
    },
    {
      path: 'lookingroom',
      element: <LookingRoom />,
    },
    {
      path: 'consulting',
      element: <Consulting />,
    },
    {
      path: 'personalcenter',
      element: <PersonalCenter />,
    },
   
    ],
  }, 
  {
      path: '/map',
      element: <Map />,
    },
  {
    path: '/citylist',
    element: <CityList />,
  },
];
