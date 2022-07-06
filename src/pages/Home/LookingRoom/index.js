import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import SearchHearch from '../../../components/SearchHeader';
import { LeftOutline } from 'antd-mobile-icons';
import { Toast } from 'antd-mobile'
import Filter from './component/Filter';
import { useNavigate } from 'react-router';
import api from '../../../api/Api';
import {
  AutoSizer,
  InfiniteLoader,
  List,
  WindowScroller,
} from 'react-virtualized';
import HouseItem from '../../../components/HouseItem';
// 吸顶组件
import Sticky from '../../../components/Sticky';

export default function LookingRoom() {
  // 初始化这个页面发送请求 ，filter为 {}
  let filter = {};
  let setBg = useRef(null)
  // 列表数据
  const [lists, setList] = useState([]);
  const [showTf, setShowTf] = useState(false);
  // 列表数量
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  // 获取当前定位城市信息
  const { label, value: id } = JSON.parse(localStorage.getItem('hkzf_city'));
  //   返回上一页
  const [sum, setSum] = useState(1);
  function historyBack() {
    navigate(-1);
  }

  // 接收filter传递来的数据
  const onFilter = (filters) => {
    // 返回顶部
    window.scrollTo(0,0)
    // 传递数据，发送请求
    getRoomsToSomeData(filters);
  };
  // 发送请求获取 房屋列表数据
  const getRoomsToSomeData = async (filter) => {
  
  const toastClose =  Toast.show({
      icon: 'loading',
      content: '加载中…',
      duration:0
    })
    console.log(filter)
    const { data: res } = await api.getRoomsToSomeData({
      params: {
        cityId: id,
        ...filter,
        start: 1, //分页数据
        end: 20, //分页数据
      },
    });
  
    toastClose.close()
    Toast.show({
      content: `一共找到${res.body.count}条数据`,
    })
    
    if(res.body.count===0){
      setShowTf(true)
    }else{
      setShowTf(false)
    }
    // 存储列表数据
    setList([...res.body.list]);
    // 列表条数
    setCount(res.body.count);
    // console.log(res);
  };

  useEffect(() => {
    getRoomsToSomeData(filter);

  }, []);

  const goHouseDetail = (data)=>{
    let id = 111
    // navigate(`/housedetail?id=${id}`)
    navigate(`/housedetail?id=${data}`)

  }
  //每行数据返回值，城市列表
  const rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style, // Style object to be applied to row (to position it)
  }) => {
    //字母索引
    const house = lists[index];
    //渲染城市列表

    // 判断 house 是否存在，不存在 就渲染 loading
    if (!house) {
      return (
        <div key={key} style={style} >
          <p className='loading'></p>
        </div>
      );
    }
    return <HouseItem item={house} key={key} style={style} goHouseDetail={()=>{goHouseDetail(house.houseCode)}} ></HouseItem>;
  };

  // 判断列表每一行受否加载完成
  const isRowLoaded = ({ index }) => {
    return !!lists[index];
  };
  // 用来获取更多数据
  // 该方法返回值是promise 对象 并且这对象应该在数据加载完成来调用resovle
  const loadMoreRows = ({ startIndex, stopIndex }) => {
    // return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`)
    //   .then(response => {
    //     // Store response data in list...
    //   })
    return new Promise((resolve) => {
      // 数据加载完成时，调用resolve
   
      api
        .getRoomsToSomeData({
          param: {
            cityId: id,
            ...filter,
            start: startIndex, //分页数据
            end: stopIndex, //分页数据
          },
        })
        .then((res) => {
          // console.log(res);
        //  let aa = lists.concat();
          let listData = res.data.body.list;
          setList((item) => [...item, ...listData]);
        });
 
      // 数据加载完成时，调用resolve,即可
      resolve();
    });
  };
  return (
    <div className='LookingRoom'  >
      {/* 顶部导航栏 */}
      <div className='Flex'>
        <LeftOutline fontSize={20} onClick={historyBack} />
        <SearchHearch cityName={label} className='searchHeader' />
      </div>
      {/* 传递方法给子组件 然后子组件传递参数数据，调用父组件这个方法，实现子传父 */}
      {/* 筛选 */}
      <Sticky height='40.8'> 
        <Filter onFilter={onFilter} />
      </Sticky>
      {/* className='list' */}
     { showTf ? 
    //  没有数据的时候渲染
     <div ref={setBg} className='list'>
        <span>暂无数据哦，换一个关键词试试叭</span>
      </div>  : null}
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={count}
        >
          {({ onRowsRendered, registerChild  }) => (
            <WindowScroller>
              {({ isScrolling,scrollTop, height }) => (
                  <AutoSizer>
                {({ width ,}) => (
                  <List   
                  // height={sum*height*2}
                  height={height}
                  width={width}
                  onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    autoHeight
                    rowCount={count}
                    rowHeight={120}
                    rowRenderer={rowRenderer}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                  />
                )}
              </AutoSizer>           
              )}
            </WindowScroller>
          )}
        </InfiniteLoader>
    
    </div>
  );
}
