import React, { useState, useEffect } from 'react'
import { Outlet, Link,useLocation } from "react-router-dom";

import { Layout, Breadcrumb, Avatar, Tooltip, Popover, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { adminUser, stock, production, order } from '../../config/menu';
import LeftNav from '../../components/sider';
import './admin.less'

const { Header, Content, Sider } = Layout;

const Admin = () => {
    const [name, setName] = useState('')
    const location = useLocation()
    const [title,setTitle]=useState([])

    const content = (
        <div>
            <p>{name}</p>
            <Button type='link'><Link to="/login">退出登录</Link></Button>
        </div>
    );

    useEffect(() => {
        let name = JSON.parse(window.sessionStorage.getItem('user'))
        setName(name.name)
    }, [])

    useEffect(()=>{
        const path = location.pathname
        let title
        adminUser.forEach(item=>{
            if(item.path===path){
                title=item.title
            }else if(item.children){
                const cItem=item.children.find(cItem=>cItem.path===path)
                if(cItem){
                    title=cItem.title
                }
            }
            return setTitle(title)
        })
    })

    return (
        <Layout style={{ height: '100%' }}>
            <Header className='aheader' >
                {/* <div className="logo" /> */}
                工厂订单管理系统
                <Popover content={content} trigger="hover" overlayStyle={{ width: '120px', textAlign: 'center' }}>
                    <Avatar
                        style={{
                            backgroundColor: '#87d068',
                            float: 'right',
                            marginTop: '9px'
                        }}
                        icon={<UserOutlined />}
                    />
                </Popover>
            </Header>
            <Layout className='a_sider'>
                <Sider className="site-layout-background" style={{ backgroundColor: '#fff', margin: '10px 0 0 10px', width: '15%' }} >
                    <LeftNav />
                </Sider>
                <Layout style={{ padding: '0 10px 10px' }}>
                    <Breadcrumb style={{ margin: '10px 0' }}>
                        <Breadcrumb.Item>{title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: 0,
                            minHeight: 280,
                            backgroundColor: '#fff'
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default Admin
