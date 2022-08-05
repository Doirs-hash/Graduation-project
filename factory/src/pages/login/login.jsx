import React, { Component } from 'react'
import { Form, Input, Button, Checkbox,Radio,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useNavigate } from 'react-router-dom'
import { signIn } from '../../api';
import loginimg from './img/login.jpeg'

import './login.css'
import { useState } from 'react';

const Login = () => {
    const [userValue,setUserValue]=useState('')
    const navigate=useNavigate()

    const path={
        user:'/order/orderList',
        product:'/production/order',
        order:'/order/orderList',
        stock:'/order/goodsStock',
    }

    const options = [
        { label: '仓管员', value: '仓管员' },
        { label: '生产员', value: '生产员' },
        { label: '报单员', value: '报单员' },
        { label: '管理员', value: '管理员' },
    ];

    const onChange = e => {
        setUserValue( e.target.value );
    };

    const onFinish =async (values) => {
        // message.error('账户名或密码错误',2)
        console.log('Success:', values.role);
        const result=await signIn(values)
        const {msg,data,status}=result
        console.log(result)
        if(status===0){
            window.sessionStorage.user=JSON.stringify(data[0])
        }else{
           return message.error(msg,2)
        }
        switch (data[0].role) {
            case '管理员'://管理员
                navigate(path.user)
                break;
            case '仓管员'://仓管
                navigate(path.stock)
                break;
            case '生产员'://生产
                navigate(path.product)
                break;
            case '报单员'://报单
                navigate(path.order)
                break;
            default:
                break;
        }

      };
    return (
        <div className='login'>
            <header className='login-head'>
                <img src={loginimg} alt="background" />
                <h1>工厂订单管理系统</h1>
            </header>
            <main className='login-forms'>
                <h2>用户登录</h2>
                <Form name="normal_login" className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: '请输入账户!',
                          },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
                    </Form.Item>
                    <Form.Item 
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: '请输入密码!',
                          },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="Password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        rules={[
                          {
                            required: true,
                            message: '请选择角色',
                          },
                        ]}
                    >
                        <Radio.Group 
                            options={options}
                            onChange={onChange}
                            value={userValue}
                            optionType="button"
                            buttonStyle="solid"
                            size='large'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </main>

        </div>
    )

}

export default Login