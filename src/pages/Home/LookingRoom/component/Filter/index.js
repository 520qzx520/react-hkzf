import { Dropdown } from 'antd-mobile';
import { React, useRef, useState, useEffect } from 'react';
import FilterPicter from '../FilterPicker';
import FilterMore from '../FilterMore';
import api from '../../../../../api/Api';
// 接收父组件传递的方法
export default function Filter({onFilter}) {
 
  const ref = useRef(null);
  // 筛选关闭显示
  const [visible1, setVisible1] = useState(true);
  // 发送请求整合数据 // 传递显示数据给子组件
  const [filter, setFilter] = useState({
    mode:null,
    price:null,
    more:null,
    area:null
  });
  // 区域方式租金
  const [filters, setFilters] = useState([]);
  //类型
  const [type, setType] = useState([]);
  // 筛选关闭显示
  const [more, setMore] = useState({});

  //  关闭下拉菜单
  function closeFilter() {
    ref.current?.close();
  }

  //  点击下拉菜单触发
  async function change(data) {
    const res = await getFilterData();
    // console.log(res);
    // 筛选
    if (data === 'more') {
      let filterData = {
        roomType: res.roomType,
        floor: res.floor,
        oriented: res.oriented,
        characteristic: res.characteristic,
      };
      setMore(filterData);
      // 筛选显示
      setVisible1(true);
    } else {
      // 隐藏
      setVisible1(false);
    }
    //  传递显示数据给子组件
    switch (data) {
      case 'area':
        setType('area');
        setFilters([res.area, res.subway]);
        break;
        case 'way':
          setType('way');
          setFilters([...res.rentType]);
          break;
          case 'rent':
            setType('rent');
            setFilters([...res.price]);
            break;
    
      default:
        break;
    }
  }
  //  获取房屋查询条件数据
  async function getFilterData() {
    const { value } = JSON.parse(localStorage.getItem('hkzf_city'));
    // console.log(value)
    const { data: res } = await api.getFilterData({
      params: {
        id: value,
      },
    });
    const data = res.body;

    return data;
  }
  // 判断类型，拿到子组件相应数据
  function childrenData(value, type) {
  
    switch (type) {

      case 'area':
        let newArea = 'null';
        if (value.length === 3) {
          newArea = value[2] !== 'null' ? value[2] : value[1];
        }
        if (value.length === 4) {
          newArea = value[3] !== 'null' ? value[3] : value[2];
        }
        let area = newArea
        setFilter(item=>{
          return {...item,area}
        })
          // 调用父组件传递方法，将数据传递给父组件 filter
        onFilter({...filter,area})
        break;

      case 'rent':
        let price = value[0] 
        setFilter(item=>{
          return {...item,price}
        })
          // 调用父组件传递方法，将数据传递给父组件 filter
        onFilter({...filter,price})
        break;

      case 'way':
        let mode = value[0] 
        setFilter(item=>{
          return {...item,mode}
        })
          // 调用父组件传递方法，将数据传递给父组件 filter
        onFilter({...filter,mode})
        break;

      default:
        break;
    }
  }
  // 拿到more子组件传递的数据
  function childrenMoreData(data) {
    let more = data.join(',') || null
    // 调用父组件传递方法，将数据传递给父组件 filter
    setFilter(item=>{
      return {...item,more}
    })
    onFilter( {...filter,more})
    
  }
  return (
    <div className='Filter'>
      {/* 下拉菜单 */}
      <Dropdown onChange={(data) => change(data)} ref={ref}>
        {/* highlight={true} */}
        <Dropdown.Item key='area' title='区域'>
          {/* 区域组件 */}
          {/* 把关闭函数传过去，子组件调用，关闭下拉菜单 */}
          <FilterPicter
            closeFilter={closeFilter}
            filterData={filters}
            type={type}
            childrenData={childrenData}
          />
        </Dropdown.Item>
        <Dropdown.Item key='way' title='方式'>
          <FilterPicter
            closeFilter={closeFilter}
            filterData={filters}
            type={type}
            childrenData={childrenData}
          />
        </Dropdown.Item>
        <Dropdown.Item key='rent' title='租金'>
          <FilterPicter
            closeFilter={closeFilter}
            filterData={filters}
            type={type}
            childrenData={childrenData}
          />
        </Dropdown.Item>
        <Dropdown.Item key='more' title='筛选'>
          {/* 传递T or F 关闭筛选的显示右边弹出菜单 */}
          {/* Object.keys(more).length === 0 ?[1,2,3]: */}
          <FilterMore
            closeFilter={closeFilter}
            visible1={visible1}
            filterMoreData={more}
            childrenMoreData={childrenMoreData}
          />
        </Dropdown.Item>
      </Dropdown>

    
    </div>
  );
}
