import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import LoginAndResiter from '../../components/LoginAndResiter';
import { setToken } from '../../utils/power';
import { Toast } from 'antd-mobile';
import api from '../../api/Api';
export default function Login() {
  const navigate = useNavigate();
  function onFinish(value) {
    getLogin(value);
  }
  async function getLogin(value) {
    const params = {
      username: value.username,
      password: value.password,
    };
     const res = await api.goLogin(params); 
     console.log(res)
    if(res.status === 200){
      
      setToken(res.data.body.token)
      Toast.show({
        icon: 'loading',
        content: '登陆成功',
        duration: 1000,
      });
      navigate('/home')
    } else {
      Toast.show({
        icon: 'loading',
        content: '用户名或者密码错误，登录失败',
        duration: 1000,
      });
    }
  }
  function goRegister() {
    navigate('/register');
  }
  return (
    <div className='Login'>
      <h2 className='Login-title-Lg'>登录</h2>
      <LoginAndResiter
        title='添加账号'
        button='登录'
        btttomLiRight='没有账号？去注册'
        onFinish={onFinish}
        goLoginOrRegister={goRegister}
      ></LoginAndResiter>
    </div>
  );
}
