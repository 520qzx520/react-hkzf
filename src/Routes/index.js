import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import RouterGard from './RouterGuards';
const Home = lazy(() => import('../pages/../pages/Home'));
const Map = lazy(() => import('../pages/Map'));
const Register = lazy(() => import('../pages/Register'));
const CityList = lazy(() => import('../pages/CityList'));
const HomeIndex = lazy(() => import('../pages/Home/HomeIndex'));
const LookingRoom = lazy(() => import('../pages/Home/LookingRoom'));
const Consulting = lazy(() => import('../pages/Home/Consulting'));
const PersonalCenter = lazy(() => import('../pages/Home/PersonalCenter'));
const HouseDetail = lazy(() => import('../pages/HouseDetail/index'));
const ToRent = lazy(() => import('../pages/Home/HomeIndex/ToRent'));

// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children) => {
  return <Suspense fallback={null}>{children}</Suspense>;
};
export default [
  {
    path: '/',
    element: <Navigate to='/login' />,
  },
  {
    path: '/register',
    // element:<Register />
    element: lazyLoad(<Register />),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home/*',
    // element: <Home />,
    // 路由守卫
    // element:lazyLoad(<RouterGard><Home /></RouterGard> ),
    element: lazyLoad(<Home />),
    children: [
      {
        path: '/home/*',
        element: <Navigate to='homeindex' />,
      },
      {
        path: 'homeindex',
        // element: <HomeIndex />,
        element: lazyLoad(<HomeIndex />),
      },
      {
        path: 'lookingroom',
        // element: <LookingRoom />,
        element: lazyLoad(<LookingRoom />),
      },
      {
        path: 'consulting',
        // element: <Consulting />,
        element: lazyLoad(<Consulting />),
      },
      {
        path: 'personalcenter',
        // element: <PersonalCenter />,
        element: lazyLoad(<PersonalCenter />),
      },
   
       
     
    ],
  },
  {
    path: '/map',
    element: lazyLoad(<Map />),
  },
  {
    path: '/housedetail',
    element: lazyLoad(<HouseDetail />),
  },
  {
    path: '/citylist',
    // element: <CityList />,
    element: lazyLoad(<CityList />),
  },
  {
    path: 'torent',
    element: lazyLoad(<ToRent />),
  },
];
