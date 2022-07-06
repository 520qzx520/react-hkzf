import React, { useEffect, useState } from 'react';

import NavHeader from '../../components/NavHeader';
import api from '../../api/Api';
import { Button, Toast } from 'antd-mobile';
import './index.css';
// 导入BASE_URL
import {BASE_URL} from '../../utils/url'
import HouseItem from '../../components/HouseItem';
export default function Map() {
  let type = '区';
  let first = true;
  const [house, sethouse] = useState([]);
  const [isShowList, setisShowList] = useState(false);
  useEffect(() => {
    initMap();
  }, []);

  //初始化地图实例
  function initMap() {
    const map = new window.BMapGL.Map('container');
    const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'));
    // 将地址解析结果显示在地图上，并调整地图视野
    const myGeo = new window.BMapGL.Geocoder();
    myGeo.getPoint(
      label,
      async (point) => {
        if (point) {
          // 初始化地图
          map.centerAndZoom(point, 11);
          //添加控件函数
          addCompent();
          //获取房间数据函数
          getCityRooms(value);
        } else {
          alert('您选择的地址没有解析到结果！');
        }
      },
      label,
    );
    //监听地图移动
    addlistenMovestart(map);
    function addlistenMovestart(map) {
      map.addEventListener('movestart', () => {
      
        // if(isShowList){
          
 setisShowList(false) 
        // }
        
      });
    }
    //获取城市房数信息
    async function getCityRooms(value) {
      // 加载中
      const contain = loading();
      try {
        const { data: res } = await api.getCityRooms( { params: {id: value,} },
        );
        const data = res.body;
        data.forEach((item) => {
          createOverlays(item);
        });
        // 数据展示就关闭
        contain.close();
      } catch (err) {
        console.log(err);
      }
    }
    //添加控件函数
    function addCompent() {
      // 添加控件
      const scaleCtrl = new window.BMapGL.ScaleControl(); // 添加比例尺控件
      map.addControl(scaleCtrl);
      const zoomCtrl = new window.BMapGL.ZoomControl(); // 添加缩放控件
      map.addControl(zoomCtrl);
    }
    function createOverlays(item) {
      if (type === '区') {
        createRoundOverlays(item);
      }
      if (type === '镇') {
        createRectangularOverlays(item);
      }
    }
    //创建圆圈覆盖物
    function createRoundOverlays(item) {
      type = '区';
      //文本标记
      var content = '';
      //结构
      const {
        coord: { latitude, longitude },
        label: areaName,
        count,
        value,
      } = item;
      const option = new window.BMapGL.Point(longitude, latitude);
      var label = new window.BMapGL.Label(content, {
        // 创建文本标注
        position: option, //设置中心坐标
        offset: new window.BMapGL.Size(-33, -33), //偏移
      });
      //添加唯一标识
      label.id = value;
      map.addOverlay(label); // 将标注添加到地图中
      //覆盖内容
      label.setContent(
        ` <div class="bubble">
         <p class="name">${areaName}</p>
         <p>${count}套</p>
       </div>`,
      );
      //label样式
      label.setStyle({
        // 设置label的样式
        cursor: 'pointer',
        border: '0 solid rgb(255,0,0)',
        borderRadius: '50%',
        padding: '0',
        whiteSpace: 'nowrap',
        fontSize: '12px',
        color: 'rgb(255,255,255)', //
        textAlign: 'center',
        opacity: '.66',
      });
      //覆盖物点击事件
      label.addEventListener('click', () => {
        if (first) {
          type = '区';
          first = false;
        } else {
          type = '镇';
          map.centerAndZoom(option, 15);
        }
        //
        //放大地图 第一个参数为 坐标，第二个为倍数
        map.centerAndZoom(option, 13);
        getCityRooms(value);
        // 清除当前覆盖物
        map.clearOverlays();
      });
    }
    // 创建矩形覆盖物
    function createRectangularOverlays(item) {
      //文本标记
      var content = '';
      //结构
      const {
        coord: { latitude, longitude },
        label: areaName,
        count,
        value,
      } = item;
      const option = new window.BMapGL.Point(longitude, latitude);
      var label = new window.BMapGL.Label(content, {
        // 创建文本标注
        position: option, //设置中心坐标
        offset: new window.BMapGL.Size(-50, -28), //偏移
      });
      //添加唯一标识
      label.id = value;
      map.addOverlay(label); // 将标注添加到地图中
      //覆盖内容
      label.setContent(
        `<div class="rect">
          <span class="housename">${areaName}</span>
          <span class="housenum">${count}套</span>
          <i class="arrow"><i/>
       </div>`,
      );
      //label样式
      label.setStyle({
        // 设置label的样式

        border: '0 solid rgb(255,0,0)',
        borderRadius: '50%',
        padding: '0',
        whiteSpace: 'nowrap',
        fontSize: '12px',
        color: 'rgb(255,255,255)', //
        textAlign: 'center',
        opacity: '.75',
      });
      //覆盖物点击事件
      label.addEventListener('click', () => {
        setisShowList(true);
        getHouseList(value);
      });
    }
    //获取小区房源信息
    async function getHouseList(id) {
      // 加载中
      const contain = loading();
      console.log(contain);
      const { data: res } =  await api.getHouseList( { params: { cityId: id} })
      
      sethouse([...res.body.list]);
      // 加载完关闭
      contain.close();
    }
  }
  //loading函数
  function loading() {
    const contain = Toast.show({
      icon: 'loading',
      content: '加载中…',
      duration: 0,
    });
    return contain;
  }
  //渲染房子函数
  const Renderhouse = () => {
    return house.map((item) => (
      <HouseItem item={item} key={Math.random()}/>
    ));
  };
  // 处理字符串函数
  function handelStr(str, len) {
    return str.length > len ? str.substring(0, len) + '...' : str;
  }
  // 渲染
  return (
    <div className='Map'>
      <NavHeader>地图找房</NavHeader>
      <div id='container'></div>
      <div
        className={
          isShowList
            ? ' houseList houseList-isblock'
            : 'houseList houseList-isnone '
        }
      >
        <div className='houseList-title'>
          <h2>房源信息</h2>
          <a>更多房源信息</a>
        </div>
        <div className='house-mar'>
          <Renderhouse />
        </div>
      </div>
    </div>
  );
}
