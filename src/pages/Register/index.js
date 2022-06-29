import React from 'react';
import LoginAndResiter from '../../components/LoginAndResiter';
import api from '../../api/Api';
import { useNavigate } from 'react-router-dom';
import NavHeader from '../../components/NavHeader';
import './index.css'
import { Toast } from 'antd-mobile';
export default function Register() {
  const navigate= useNavigate()
  function onFinish(value) {
    // console.log(value)
    getRegister(value);
  }
  function goLogin() {
     console.log(111)
     navigate(-1)
     
    ;
  }
  async function getRegister(value) {
    const params = {
      username: value.username,
      password: value.password,
    };
    const res = await api.goRegister(params);
    if (res.status === 200) {
      Toast.show({
        icon: 'loading',
        content: '账号创建成功',
        duration: 500,
      });
      navigate('/login')
    } else {
      Toast.show({
        icon: 'loading',
        content: '你输入的账号名重复',
        duration: 1000,
      });
    }

    console.log(res);
  }
  return (
    <div className='Register Login'>
        <NavHeader>注册账号</NavHeader>
      <LoginAndResiter
        title='注册账号'
        button='立即注册'
        btttomLiRight='已有账号？去登录'
        onFinish={onFinish}
        goLoginOrRegister = {goLogin}
      ></LoginAndResiter>
    </div>
  );
}
