import NavHeader from '../../../../components/NavHeader';
import api from '../../../../api/Api';
import { useEffect, useState } from 'react';
import HouseItem from '../../../../components/HouseItem';
import './index.css'
import { useNavigate } from 'react-router';
export default function PublishList() {
  const [list, setList] = useState([]);
  const navigate =useNavigate()
  useEffect(() => {
    getPublishHouseList();
  }, []);
  // 收藏列表
  const getPublishHouseList = async () => {
    const { data: res } = await api.getPublishHouseList();
    if (res.status === 200) {
      setList([...res.body]);
      console.log(res);
    } else {
      return;
    }
  };
  const goHouseDetail = (data)=>{
    // navigate(`/housedetail?id=${id}`)
    navigate(`/housedetail?id=${data}`)

  }
  return (
    <div className='PublishList'>
      <NavHeader>我的发布</NavHeader>
      {list.map((item) => (
        <HouseItem item={item} goHouseDetail={()=>goHouseDetail(item.houseCode)} />
      ))}
    </div>
  );
}
