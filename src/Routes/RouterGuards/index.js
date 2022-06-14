import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

export default function RouterGuards() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // const timeout = setTimeout(() => verifyIsLogin(), 300);
    // return () => clearTimeout(timeout);
    // async function verifyIsLogin() {
    //利用 useLocation() ,监听路由变化
    addListenRouter(pathname);
    // }
  }, [pathname]);

  function addListenRouter(pathname) {
    const token = JSON.parse(localStorage.getItem('token'));
    if (pathname === '/register') {
      return;
    }
    if (!token && pathname !== '/login') {
      navigate('/login');
    }
  }
}
