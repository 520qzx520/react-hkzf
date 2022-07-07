import NavHeader from '../../../../../components/NavHeader';
import './index.css';
import { SearchBar, List } from 'antd-mobile';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../../../../api/Api';
export default function ToRentSearch() {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);
  const [timer, setTimer] = useState(null);

  // 输入框事件
  const handelSearch = (val) => {
    setSearchText(val);
    if (!val) {
      return setList([]);
    } else {
      const city = JSON.parse(localStorage.getItem('hkzf_city'));
      // throttle(getForSearchHouse,500).bind(getForSearchHouse,val, city.value)
      clearTimeout(timer);
      // 节流
      setTimer(
        setTimeout(() => {
          getForSearchHouse(val, city.value);
        }, 700),
      );
    }
  };
  // 获取小区
  const getForSearchHouse = async (name, id) => {
    const res = await api.getForSearchHouse({
      params: {
        name,
        id,
      },
    });
    setList([...res.data.body]);
  };

  // 点击列表item
  const itemClick = (item)=>{
    const {community,communityName} = item
    navigate(`/torent?id=${community}&name=${communityName}`,{replace:true})
    navigate(-1)
    console.log(item)
  }
  return (
    <div className='ToRentSearch'>
      <NavHeader>搜索</NavHeader>、
      <div className='search'>
        <SearchBar
          placeholder='请输入内容'
          showCancelButton
          value={searchText}
          onChange={(val) => handelSearch(val)}
        />
      </div>
      <List>
        {list.map((item) => (
          <List.Item key={item.community} onClick={()=>itemClick(item)}>{item.communityName}</List.Item>
        ))}
      </List>
    </div>
  );
}
