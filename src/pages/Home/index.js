import React, { useState ,useEffect} from 'react';
import {  useNavigate ,useRoutes,useLocation,Outlet} from 'react-router-dom';
//引入routes表
import routes from '../../Routes'
//引入antd组件
import { TabBar } from 'antd-mobile';
//引入antd组件
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons';
// 引入样式
import './index.css'
import RouterGuards from '../../Routes/RouterGuards';
export default function CityList() {
  // 使用路由表
  const element = useRoutes(routes); 
  //利用 useLocation() ,监听路由变化
  const {pathname}  = useLocation() 

  //tabs列表
  const [tabs] = useState([
    {
      key: '/home/homeindex',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/home/lookingroom',
      title: '找房',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/home/consulting',
      title: '咨询',
      icon: (active) => (active ? <MessageFill /> : <MessageOutline />),
    },
    {
      key: '/home/personalcenter',
      title: '个人中心',
      icon: <UserOutline />,
    },
  ]);
  //navigate 改变路由（push,replace等）
  const navigate = useNavigate();

  //tabbar变化时 匹配路由
  const setRouteActive = (path) => {
    navigate(path)
  };

  
  return (
    <div className='Home'>
       {/* 使用路由表 */}
      {element} 
      {/* 路由出口 */}
      <Outlet /> 
       <RouterGuards/> 
      {/* 底部tabbar */}{/* 图标高亮 */}
      <TabBar  activeKey={pathname} 
        onChange={(value) => setRouteActive(value)} className='tabbar'
        // style={{ position: 'fixed', bottom: 0, width: '100%', left: 0 }}
      >
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
}
