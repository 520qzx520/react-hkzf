import React, { useState, useEffect } from 'react';
import { Swiper, Toast, Grid, SearchBar } from 'antd-mobile';
import { EnvironmentOutline, DownFill } from 'antd-mobile-icons';
import { useNavigate } from 'react-router-dom';
import PubSub from 'pubsub-js';
import { getCurrentCity } from '../../../utils';
// 导入axios
import axios from 'axios';
//导入样式
import './index.css';
// 导入图片
import NavImg1 from '../../../assets/images/nav-1.png';
import NavImg2 from '../../../assets/images/nav-2.png';
import NavImg3 from '../../../assets/images/nav-3.png';
import NavImg4 from '../../../assets/images/nav-4.png';

export default function HomeIndex() {
  //使用 useState 存储轮播图数据
  const [swiper, setSwiper] = useState([]);
  //使用 useState 存储租房数据
  const [groups, setGroups] = useState([]);
  //使用 useState 存储咨询数据
  const [consults, setConsults] = useState([]);
  //使用 useState 存储位置数据
  const [local, setLocal] = useState('广州');
  
  const navigate = useNavigate();
  // nav列表
  const navs = [
    { id: '01', img: NavImg1, title: '整租', path: '/home/lookingroom' },
    { id: '02', img: NavImg2, title: '合租', path: 'roommates' },
    { id: '03', img: NavImg3, title: '地图找房', path: 'mapfindroom' },
    { id: '04', img: NavImg4, title: '去出租', path: 'torent' },
  ];
  //发送请求获取轮播图片
  const getSwiper = async () => {
    const { data: res } = await axios.get('http://localhost:8080/home/swiper');
    setSwiper([...res.body]);
  };
  //获取 租房数据
  const getGroups = async () => {
    const { data: res } = await axios.get('http://localhost:8080/home/groups', {
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0',
      },
    });
    //存储数据
    setGroups([...res.body]);
  };

  // 获取咨询数据
  const getConsult = async () => {
    const { data: res } = await axios.get('http://localhost:8080/home/news', {
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0',
      },
    });
    // console.log(res);
    //存储数据
    setConsults([...res.body]);
  };
  // 获取本地地位(经纬度)
  const getLocationData = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log('位置',position)
    });
  };
  //通过消息订阅与发布得到城市名字
  // const PubAndSub = ()=> {
  //  const newCity = JSON.parse(localStorage.getItem('hkzf_city')) || {label:'上海'}
  //  setLocal(newCity.label)
  //   //_用于占位,因为这个函数必须要两个参数，第一个用不到，所以只是占位
  //    PubSub.subscribe('getCityName', (_, data) => {
  //    localStorage.setItem('hkzf_city',JSON.stringify(data))
      
  //   });
  // }

  // useEffect Hook 相当于看做如下三个函数的组合 //  componentDidMount()//  componentDidUpdate()//  componentWillUnmount()
  useEffect(() => {
    
    // console.log(JSON.parse(localStorage.getItem('token')))
    const timeout = setTimeout(() => verifyIsLogin(), 300);
    return () => clearTimeout(timeout);
    async function verifyIsLogin() {
    //发送轮播请求
    getSwiper();
    //发送租房请求
    getGroups();
    //发送咨询请求
    getConsult();
    //经纬度
    // getLocationData()
    // ip定位
    getCurrentCity().then((res) => {
      setLocal(res.label); 
    
    });
    //通过消息订阅与发布得到城市名字
    // PubAndSub()

    }
  }, []);
  //点击 跳转到子页面
  function navGoList(path) {
    // console.log(path);
    navigate(path);
  }
  //跳转到地图
  function goMap() {
    navigate('/map');
  }

  //跳转到城市选择
  function goShowCity() {
    navigate('/citylist');
  }

  //轮播
  const items = swiper.map((item, index) => (
    //   console.log(item.imgSrc)
    <Swiper.Item key={item.id}>
      <div
        className='swiper-img'
        onClick={() => {
          Toast.show(`你点击${index}`);
        }}
      >
        <img src={`http://localhost:8080${item.imgSrc}`} />
      </div>
    </Swiper.Item>
  ));
  // nav,用遍历方式
  const Lists = () => {
    return navs.map((item) => {
      //数组要加一个return
      return (
        <Grid.Item key={item.id} onClick={() => navGoList(item.path)}>
          <img src={item.img} alt='' />
          <h2>{item.title}</h2>
        </Grid.Item>
      );
    });
  };
  // 租房数据遍历
  const Groutlist = () => {
    return groups.map((item) => {
      return (
        <Grid.Item key={item.id} className='Grid-Item'>
          <div className='Groutlist'>
            <ul>
              <li>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </li>
            </ul>
            <img src={`http://localhost:8080${item.imgSrc}`} alt='' />
          </div>
        </Grid.Item>
      );
    });
  };
  //租房页面
  const Rentroom = () => {
    return (
      <div className='renRoom'>
        <div className='renRoom-context'>
          <h2>租房小组</h2>
          <span>更多</span>
        </div>
        {/* 图片列表 */}
        <Grid columns={2} gap={8} className='nav-list groups-list'>
          <Groutlist />
        </Grid>
      </div>
    );
  };
  //咨询遍历
  const Consultall = () => {
    return consults.map((item) => {
      return (
        <div className='consults-contain' key={item.id}>
          <img src={`http://localhost:8080${item.imgSrc}`} alt='' />
          <div className='consults-contain-right'>
            <p>{item.title}</p>
            <div className='consults-contain-right-bottom'>
              <a>{item.from}</a>
              <span>{item.date}</span>
            </div>
          </div>
        </div>
      );
    });
  };
  //咨询页面
  const Consult = () => {
    return (
      <div className='consults'>
        <h2>最新资讯</h2>
        <Consultall />
      </div>
    );
  };
  return (
    <div className='HomeIndex'>
      <div className='swiper-list'>
        {/* 轮播区域 */}
        <Swiper loop autoplay>
          {items}
        </Swiper>
        {/* 顶部导航（输入框等） */}
        <div className='InputBox'>
          <div className='SearchBar'>
            <div className='local' onClick={() => goShowCity()}>
              <span>{local}</span>
              <DownFill fontSize={10} className='icon1' />
              <div className='line'></div>
            </div>
            <SearchBar placeholder='请输入小区/地址' />
          </div>
          <EnvironmentOutline
            className='icon'
            fontSize={20}
            onClick={() => goMap()}
          />
        </div>
      </div>
      {/* nav区域 */}
      <Grid columns={4} gap={8} className='nav-list'>
        <Lists />
      </Grid>
      {/* 租房 */}
      <Rentroom />
      {/* 咨询页面 */}
      <Consult />
    </div>
  );
}
