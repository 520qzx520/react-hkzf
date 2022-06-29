// import { useEffect } from 'react';
// import { useLocation, useNavigate, Outlet, useRoutes } from 'react-router-dom';
// import routes from '..';
// export default function RouterGuards() {
//   let show = true;
//   // 使用路由表
//   const element = useRoutes(routes);
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   useEffect(() => {
//     addListenRouter(pathname);
//   }, [pathname]);
//   function addListenRouter(pathname) {
//     const token = JSON.parse(localStorage.getItem('token'));
//     if (pathname === '/register') {
//       show = false;
//       return;
//     }
//     if (!token && pathname !== '/login') {
//       show = false;
//       navigate('/login', { replace: true });
//       return;
//     }
//   }
//   return (
//     <>
//       {/* { element }  */}
//       {{ show } ? 
//       <Outlet /> 
//       : null}
//     </>
//   );
// }


import { Navigate } from "react-router";
export default function RouterGard({children}){
    const token = JSON.parse(localStorage.getItem('token'))
    if(!token){
        return <Navigate to='/login' replace></Navigate>
    }else{
        return <>{children}</>
    }
}
