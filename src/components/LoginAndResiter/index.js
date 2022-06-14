import React from 'react';
import './index.css';
import { Form, Input, Button } from 'antd-mobile';
export default function LoginAndResiter(props) {
  return (
    <div className='LoginAndResiter'>
      <div className='contain'>
        <h2 className='Login-title'>{props.title}</h2>
        <div className='Login-form'>
            <Form 
            onFinish={props.onFinish}
            footer={
                <Button block color='primary' type='submit' className='button'>
                {props.button}
              </Button>
            }
            >
          <Form.Item name='username' className='input'  rules={[{ required: true, message: '不能为空!' }]}>
            <Input placeholder='请输入用户名' clearable />
          </Form.Item>
          <Form.Item name='password' className='input password'  rules={[{ required: true, message: '不能为空!' }]}>
            <Input placeholder='请输入密码' clearable type='password' />
          </Form.Item>
         
          </Form>
        </div>
       
      </div>
       <ul className='bottom-list'>
          <li>手机号登录</li>
          <li>|</li>
          <li>找回密码</li> <li>|</li>
          <li onClick={props.goLoginOrRegister}>{props.btttomLiRight}</li>
      </ul>
    </div>
  );
}
