import React, { useEffect, useState, useRef } from 'react';
import { NavBar } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCurrentCity } from '../../utils';
import './index.css';
import NavHeader from '../../components/NavHeader';
import { List, AutoSizer } from 'react-virtualized';
import PubSub from 'pubsub-js'
export default function Citylist() {
  const navigate = useNavigate();
  //分类后存放数据
  let [cityLists, setCityLists] = useState([]);
  //存放 A，B、C这样的字母
  const [cityIndex, setCityIndex] = useState([]);
  // 右侧高亮索引
  const [activeIndex, setActiveIndex] = useState(0);
  const cityListRef = useRef();
  //返回前面一个路由
  function back() {
    navigate(-1);
  }
  //获取所有城市数据
  const getCityListData = async () => {
    const { data: res } = await axios.get(
      'http://localhost:8080/area/city?level=1',
    );
    //处理好的数据结构赋值
    const { lists, index } = formatCityData(res.body);
    //数组里面对象数组，把所有的城市放进去
    setCityLists([{ ...lists }]);
    // 标签ABCD等用于分类
    setCityIndex(index);
  };
  //处理城市数据
  function formatCityData(list) {
    let lists = [];
    let index = {};
    list.forEach((item) => {
      //取首字母
      const first = item.short.substr(0, 1);
      // console.log(first)
      // 如果对象已经有数组就push，没有就创建一个并且把对象放进去
      lists[first] ? lists[first].push(item) : (lists[first] = [item]);
    });
    ////获取索引（键）A、B、C用于分类
    index = Object.keys(lists).sort();
    return {
      lists,
      index,
    };
  }
  //获取热门城市
  const getHotCity = async () => {
    const { data: hotres } = await axios.get('http://localhost:8080/area/hot');
    let hotdCata = hotres.body;
    // setCityLists((item) => {
    //   const hot = item[0];
    //   hot['hot'] = [...hotdCata];
    //   return [{ ...hot }];
    // });
    // // currCity()
    // //在原来数据基础上，添加索引
    // setCityIndex((item) => {
    //   return ['hot', ...item];
    // });
    //当前城市，把热门城市传过去
    currCity(hotdCata);
  };

  // 当前定位城市
  const currCity = async (hotdCata) => {
    const curr = await getCurrentCity();
    console.log(curr)
     setCityLists((item) => {
      const city = item[0];
      city['hot'] = [...hotdCata];
      city['#'] = [curr];
      return [{ ...city }];
    });

    //在原来数据基础上，添加索引 #，hot
    setCityIndex((item) => {
      return ['#', 'hot', ...item];
    });
     
  };

  /*
  解决函数useEffect多次调用
  const timeout = setTimeout(() => verifyIsLogin(), 300);
  return () => clearTimeout(timeout);
  */
  useEffect(() => {
    const timeout = setTimeout(() => verifyIsLogin(), 300);
    return () => clearTimeout(timeout);
    async function verifyIsLogin() {
      //全部城市
    await getCityListData();
      //热门城市
    await getHotCity();
     //提前计算 每行高度实现点击索引 精确跳转
     cityListRef.current.measureAllRows()
    }
   
  }, []);

  //处理城市数据#、当前城市、大小写
  function formatCityIndex(data) {
    switch (data) {
      case '#':
        return '当前定位城市';
        break;
      case 'hot':
        return '热门城市';
      default:
        return data.toUpperCase();
        break;
    }
  }
  //处理城市数据#、大小写
  function formatCityIndex1(data) {
    switch (data) {
      case 'hot':
        return '热';
      default:
        return data.toUpperCase();
        break;
    }
  }
  // 动态设置每行城市高度
  function getRowHeight({ index }) {
    const titleHeight = 30;
    const cityListHeight = 36;
    return titleHeight + cityLists[0][cityIndex[index]].length * cityListHeight;
  }
    //用于获取渲染列表的索引startIndex（滑到哪一个，哪一个字母就高亮）
    function onRowsRendered({ startIndex }) {
      activeIndex !== startIndex && setActiveIndex(startIndex);
    }
    //点击高亮,跳转
    function changeIndex(index) {
      // 
      console.log(index)
      //跳转 （人家组件的方法scrollToRow）
      cityListRef.current.scrollToRow(index)
      // setActiveIndex(index);
    }
    //改变城市事件
    const changeCity =async (city) => {
     PubSub.publish('getCityName',city)
     navigate(-1);
    }
  //每行数据返回值，城市列表
  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) {
    //字母索引
    const letter = cityIndex[index];
    //渲染城市列表
    return (
      <div key={key} style={style} className='city'>
        <h4 className='title'>{formatCityIndex(letter)}</h4>
        {
          //字母索引下的城市
          cityLists[0][letter].map((item) => (
            <div className='name' key={item.value} onClick={()=>changeCity(item)}>
              {item.label}
            </div>
          ))
        }
      </div>
    );
  }

  //渲染右边索引的方法
  const Rendercityindex = () => {
    return cityIndex.map((item, index) => (
      <li key={item}  onClick={() => changeIndex(index)}>
        <span
          className={
            activeIndex === index
              ? 'citt-index-item index-active '
              : 'citt-index-item'
          }
        >
          {formatCityIndex1(item)}
        </span>
      </li>
    ));
  };

  ///////////-------------------------------------渲染--------------------------------------------------
  return (
    <div className='citylist'>
      {/* 自己封装的  顶部导航退出*/}
     <NavHeader>  城市选择</NavHeader>
      {/* 城市列表渲染 */}
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={cityListRef} //用于获取这个组件
            height={height}
            rowCount={cityIndex.length}
            rowHeight={getRowHeight}
            rowRenderer={rowRenderer}
            width={width}
            onRowsRendered={onRowsRendered} // 当哪一个开始的索引
            scrollToAlignment = 'start' //
          />
        )}
      </AutoSizer>
      <ul className='city-index'>
        <Rendercityindex />
      </ul>
    </div>
  );
}
