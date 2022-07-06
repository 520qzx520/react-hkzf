import { useSearchParams } from 'react-router-dom';
import NavHeader from '../../components/NavHeader';
import {
  StarFill, //收藏
  PhoneFill,
  MessageFill,
  SendOutline,
  BankcardOutline,
  CouponOutline,
  DeleteOutline,
  CollectMoneyOutline,
  LoopOutline,
  TruckOutline,
  FaceRecognitionOutline,
  TransportQRcodeOutline,
} from 'antd-mobile-icons';
import { Swiper, Button, Toast } from 'antd-mobile';
import './index.css';
import headerImg from '../../assets/images/login2.jpg';
import { useEffect, useState } from 'react';
import api from '../../api/Api';
import { BASE_URL } from '../../utils/url';
import { getToken } from '../../utils/power';
export default function HouseDetail() {
  const BMapGL = window.BMapGL;
  // 获取路由传递的参数
  const [params] = useSearchParams();
  // 保存详情总数据
  const [homeInfo, setHomeInfo] = useState({});
  // 显示收藏或者已收藏
  const [favorite, setFavorite] = useState(false);

  // 右侧图标
  const rightContent = <SendOutline fontSize={20} />;
  useEffect(() => {
    let id = params.get('id');
    getHouseDetail(id);
    getFavorites(id);
    console.log(id);
  }, []);

  const houseMating = [
    {
      id: 'yg',
      title: '衣柜',
      icon: <BankcardOutline />,
    },
    {
      id: 'xyj',
      title: '洗衣机',
      icon: <DeleteOutline />,
    },
    {
      id: 'kt',
      title: '空调',
      icon: <CollectMoneyOutline />,
    },
    {
      id: 'trq',
      title: '天然气',
      icon: <LoopOutline />,
    },
    {
      id: 'vx',
      title: '冰箱',
      icon: <TruckOutline />,
    },
    {
      id: 'ds',
      title: '电视',
      icon: <FaceRecognitionOutline />,
    },
    {
      id: 'rsq',
      title: '热水器',
      icon: <TransportQRcodeOutline />,
    },
    {
      id: 'sf',
      title: '沙发',
      icon: <CouponOutline />,
    },
  ];
  // 获取详情总数请求
  const getHouseDetail = async (id) => {
    const { data: res } = await api.getHouseDetail(id);
    if (res.status === 200) {
      const { community, coord } = res.body;
      renderMap(community, coord);
      setHomeInfo(res.body);
    } else {
      return Toast.show({
        content: '获取总数失败',
        duration: 1000,
      });
    }

    // console.log(res);
  };
  //   渲染地图
  const renderMap = (community, coord) => {
    const { longitude, latitude } = coord;
    const map = new BMapGL.Map('houseMap');
    const point = new BMapGL.Point(longitude, latitude);
    map.centerAndZoom(point, 17);
    // 添加缩放控件
    map.addControl(new BMapGL.ZoomControl());

    // 创建覆盖物
    const label = new BMapGL.Label('', {
      position: point,
      offset: new BMapGL.Size(-20, -18),
    });
    label.setStyle({
      border: '0 solid rgb(255,0,0)',
      borderRadius: '50%',
      padding: '0',
      whiteSpace: 'nowrap',
      fontSize: '12px',
      color: 'rgb(255,255,255)',

      textAlign: 'center',
      opacity: '.75',
    });
    label.setContent(
      `<div class="rect">
          <span class="housename">${community}</span>
          <i class="arrow"><i/>
       </div>`,
    );
    map.addOverlay(label);
  };
  // 检查是否已经收藏请求
  const getFavorites = async (id) => {
    const { data: res } = await api.getFavorites(id, {
      headers: {
        authorization: getToken(),
      },
    });
    console.log(res);
    setFavorite(res.body.isFavorite);
  };

  function closeBtn() {}

  function sureBtn() {}
  // 收藏
  async function shareBtn() {
    let id = params.get('id');
    // 取消收藏
    if (favorite) {
      const res = await api.deleteFavorites(id);
      if (res.data.status === 200) {
        Toast.show({
          content: '取消成功',
          duration: 1000,
        });
        setFavorite(false);
      } else {
        Toast.show({
          content: '取消失败请重试',
          duration: 1000,
        });
      }
      // 添加收藏
    } else {
      const res = await api.addFavorites(id);
      if (res.data.status === 200) {
        Toast.show({
          content: '收藏成功',
          duration: 1000,
        });
        setFavorite(true);
      } else {
        Toast.show({
          content: '添加失败请重试',
          duration: 1000,
        });
      }
    }

    // console.log(res)
  }
  return (
    <div className='HouseDetail'>
      {/* 导航栏 */}
      {/* <RouterGuards/> */}
      <NavHeader rightContent={rightContent}>{homeInfo.community}</NavHeader>
      {/* 轮播图 */}
      <div className='swiper'>
        <Swiper autoplay loop>
          {homeInfo.houseImg?.map((item, index) => (
            <Swiper.Item key={index}>
              <img src={`${BASE_URL}${item}`} />
            </Swiper.Item>
          ))}
        </Swiper>
      </div>

      {/* 详情信息展示 */}
      <div className='showDetail'>
        <ul className='showDetail-content'>
          <li className='title'>
            <h3>{homeInfo.title}</h3>
            {homeInfo.tags?.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </li>
          <li className='price'>
            <div>
              <h2>{homeInfo.price}/月</h2>
              <p>租金</p>
            </div>
            <div>
              <h2>{homeInfo.roomType}</h2>
              <p>房型</p>
            </div>
            <div>
              <h2>{homeInfo.size}平方米</h2>
              <p>面积</p>
            </div>
          </li>
          <li className='type'>
            <div>
              <span>装修：精装</span>
              {homeInfo.oriented?.map((item, index) => (
                <span key={index}>
                  朝向：
                  {item}
                </span>
              ))}
            </div>
            <div>
              <span>楼层：{homeInfo.floor}</span>
              <span>类型：普通住宅</span>
            </div>
          </li>
        </ul>
      </div>
      {/* 地图 */}
      <div className='map'>
        <h3 className='title'>小区：{homeInfo.community}</h3>
        {/* 地图 */}
        <div id='houseMap'></div>
      </div>
      {/* 房屋配套 */}
      <div className='houseMating'>
        <h3>房屋配套</h3>
        <ul className='houseMating-content'>
          {houseMating.map((item) => (
            <li className='list' key={item.id}>
              <i>{item.icon}</i>
              <p> {item.title}</p>
            </li>
          ))}
        </ul>
      </div>
      {/* 房源概况 */}
      <div className='houseThing'>
        <h3>房源概况</h3>
        <div className='houseThing-contain'>
          <div className='flex'>
            <div className='person'>
              <img src={headerImg} />
              <div className='name'>
                <p>景女士</p>
                <p>已认证房主</p>
              </div>
            </div>
            <a>发信息</a>
          </div>
          <div className='consult'>
            <p>{homeInfo.description}</p>
          </div>
        </div>
      </div>
      {/* 按钮 */}
      <div className='Item-Btn'>
        <Button size='small' shape='rectangular' onClick={shareBtn}>
          <StarFill
            color={favorite ? 'red' : '#bbb'}
            style={{ marginRight: '5px' }}
            fontSize={20}
          />
          {favorite ? '已收藏' : '收藏'}
        </Button>
        <Button size='small' shape='rectangular' onClick={closeBtn}>
          <MessageFill style={{ marginRight: '5px' }} fontSize={20} />
          在线咨询
        </Button>
        <Button
          color='success'
          shape='rectangular'
          onClick={sureBtn}
          size='small'
        >
          <PhoneFill
            color={'white'}
            style={{ marginRight: '5px' }}
            fontSize={20}
          />
          电话预约
        </Button>
      </div>
    </div>
  );
}
