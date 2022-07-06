import {  SearchBar } from 'antd-mobile';
import { EnvironmentOutline, DownFill } from 'antd-mobile-icons';
import './index.css'
import { useNavigate } from 'react-router-dom';
export default function SearchHearch({cityName,className}) {
    const navigate = useNavigate()
    //跳转到城市选择
  function goShowCity() {
    navigate('/citylist');
  }
     //跳转到地图
  function goMap() {
    navigate('/map');
  }

  return (
    <div className='SearchHearch' >
      {/* 顶部导航（输入框等） */}
      <div className= {['InputBox', className || ''].join(' ')}>
        <div className='SearchBar'>
          <div className='local' onClick={() => goShowCity()}>
            <span>{cityName}</span>
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
  );
}
