import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import {  Dialog,Toast, Button} from 'antd-mobile'
import './index.css';
import myhomeJpg from './img/login2.jpg';
import {
  FileOutline,
  BankcardOutline,
  TravelOutline,
  EditSOutline,
  StarOutline, //星星
  SendOutline, //分享
  MailOutline, //信息
  TagOutline, //标记
  VideoOutline, //相机
  ShopbagOutline, //包包
  GiftOutline, //礼物
  DeleteOutline, //垃圾箱
} from 'antd-mobile-icons';
import api from '../../../api/Api';
import { getToken,removeToken } from '../../../utils/power';
export default function PersonalCenter() {
  useEffect(()=>{
    getFavoritesList()
  },[])
    const navigate = useNavigate()
    function exitLogin(){
        Dialog.confirm({
            content: '是否退出登录',
            onConfirm:  async() => {
              Toast.show({
                icon: 'success',
                content: '成功退出登录',
                position: 'bottom',
              })
          const res =  await  api.loginOut()
              removeToken()
              navigate('/login')
               console.log(res)
            },
          })
    }

    // 收藏列表
    const getFavoritesList = async()=>{
      const {data:res} = await api.getFavoritesList()
      if(res.status === 200){
        console.log(res)
      }else{
        return 
      }
      
    }
  return (
    <div className='PersonalCenter'>
      <div className='title'>
        <img src={myhomeJpg} alt='' />
        <h2>尊贵的用户</h2>
      </div>
      <div className='contain'>
      {/* <h3>我的工具</h3> */}
        <ul className='nav'>
          <li>
            <i className='i1'>
              <FileOutline />
            </i>
            <a href='#'> 全部订单 </a>
          </li>
          <li>
            <i className='i2'>
              <BankcardOutline />
            </i>
            <a href='#'> 未付款 </a>
          </li>
          <li>
            <i className='i3'>
              <TravelOutline />
            </i>
            <a href='#'> 我的房子 </a>
          </li>
          <li>
            <i className='i4'>
              <EditSOutline />{' '}
            </i>
            <a href='#'> 去评价 </a>
          </li>
        </ul>
        <div className='myTool'>
          <h3>我的工具</h3>
          <ul className='myTool-list'>
            <li>
              <i className='i1'>
                <MailOutline />
              </i>
              <a href='#'> 信息管理 </a>
            </li>
            <li>
              <i className='i2'>
                <TagOutline />
              </i>
              <a href='#'>标记</a>
            </li>
            <li>
              <i className='i3'>
                <SendOutline />
              </i>
              <a href='#'>分享</a>
            </li>
            <li>
              <i className='i4'>
                <StarOutline />
              </i>
              <a href='#'>收藏</a>
            </li>
            <li>
              <i className='i5'>
                <VideoOutline />
              </i>
              <a href='#'> 信息管理 </a>
            </li>
            <li>
              <i className='i6'>
                <ShopbagOutline />
              </i>
              <a href='#'>标记</a>
            </li>
            <li>
              <i className='i7'>
                <GiftOutline />
              </i>
              <a href='#'>分享</a>
            </li>
            <li>
              <i className='i8'>
                <DeleteOutline />
              </i>
              <a href='#'>藏</a>
            </li>
          </ul>
        </div>
      </div>
      {/* <ul className='set'>
        <li>
          <h3>设置</h3>
        </li>
        <li>
          <h3>账号管理</h3>
        </li>
      </ul> */}
      <div className='exit' >
      <Button className='btn' size='small' color='primary' onClick={()=>exitLogin()}>退出登录</Button>
          {/* <a href='#' onClick={()=>exitLogin()}></a> */}
      </div>
    </div>
  );
}
