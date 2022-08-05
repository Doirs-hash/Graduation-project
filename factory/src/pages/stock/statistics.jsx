import React, { useState,useEffect } from 'react'
import { Table, Card, Button, message, Input,Form } from 'antd';
import { goodsListLook,goodsListStock } from '../../api';

const { Search } = Input;
//商品库存

const Statistics =()=> {
    const [dataSource,setDataSource]=useState([])

    const columns = [
        {
            title: '商品条码',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: '商品名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '规格',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: '类别',
            dataIndex: 'classify',
            key: 'classify',
        },
        {
            title: '单位',//出库
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: '总库存',//出库
            dataIndex: 'stock',
            key: 'stock',
        },
    ];

    useEffect(async ()=>{
        const result =await goodsListLook()
        const {data,msg,status}=result
        console.log(result)
        if(status===0){
            setDataSource(data)
        }else{
            message.error(msg,2)
        }
    },[])

    const onSearch =async (value) => {
        const result =await goodsListStock(value)
        const {msg,status,data}=result
        if(status===0){
            setDataSource(data)
            message.success(msg,2)
        }else{
            message.error(msg,2)
        }
    }

    const title = (<Form.Item label='按商品搜索：' style={{ marginBottom: 0 }}><Search placeholder="请输入商品" onSearch={onSearch} style={{ width: 200 }} /></Form.Item>)

    return (
        <Card size="small" title={title}  style={{ width: '100%', height: '100%' }}>
            <Table
                columns={columns}
                dataSource={dataSource}
                scroll={{ y: 'calc(100vh - 310px)' }}
                size="middle"
            />
        </Card>
    )
    
}

export default Statistics