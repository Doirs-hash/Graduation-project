import React, { Component, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

import { Menu } from 'antd';
import './index.css'
import { adminUser, stock, production, order } from '../../config/menu';

const { SubMenu } = Menu;


const LeftNav = () => {

    const location = useLocation()
    const path = location.pathname
    const [type, setType] = useState([])

    useEffect(() => {
        let user = window.sessionStorage.getItem('user')
        user = JSON.parse(user)
        console.log(user)
        switch (user.role) {
            case '管理员':
                setType(adminUser)
                break;
            case '仓管员':
                setType(stock)
                break;
            case '生产员':
                setType(production)
                break;
            case '报单员':
                setType(order)
                break;

            default:
                break;
        }
    }, [])

   


    const getMenuNode = (menuList) => {

        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item?.path} icon={item.icon}><Link to={item.path}>{item.title}</Link></Menu.Item>
                )
            } else {
                return (
                    <SubMenu key={item.path} icon={item.icon} title={item.title}>
                        {getMenuNode(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    return (
        <Menu mode="vertical" className="leftnav" selectedKeys={[path]}>

            {getMenuNode(type)}

        </Menu>
    )
}

export default LeftNav
