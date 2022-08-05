import React, { useState, useEffect } from 'react'
import PubSub from 'pubsub-js'
import { Table, Card, Button, message, Select, DatePicker, Input, Popconfirm } from 'antd';

import Frame from './create/frame';
import { orderListLook, orderListAdd, orderListChange, orderListDel, orderListExamine ,orderListQuery} from '../../../api'

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;


const OrderList = () => {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([])

    let column = [
        {
            title: '订单编号',
            dataIndex: 'key',
            key: 'key',
            width: 120
        },
        {
            title: '下单时间',
            dataIndex: 'xdtime',
            key: 'xdtime',
        },
        {
            title: '客户名称',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: '金额(元)',
            dataIndex: 'price',
            key: 'price',
            width: 100
        },
        {
            title: '操作员',
            dataIndex: 'people',
            key: 'people',
            width: 100
        },
        {
            title: '收款状态',//已收款/未收款
            dataIndex: 'cm',
            key: 'cm',
        },
        {
            title: '订单状态',//(已完成、未完成、已作废)
            dataIndex: 'orderStates',
            key: 'orderStates',
        },
        {
            title: '查看',//(已完成、未完成、已作废)
            key: 'look',
            width: 130,
            render: (item) => <div>
                <Button type='link' onClick={() => onClickLook(item)}>详情</Button>
                <Button type='link' onClick={() => onClickDel(item)}>删除</Button>
            </div>,
        },
        {
            title: '审核',
            key: 'examine',
            render: (item) =>
                <Popconfirm
                    title="是否通过审核"
                    okText="是"
                    cancelText="否"
                    onConfirm={() => confirm(item)}
                >
                    <Button type='primary'>通过审核</Button>
                </Popconfirm>
        },
    ];

    useEffect(() => {
        let data = JSON.parse(window.sessionStorage.getItem('user'))
        if (data.role !== '管理员') {
            column.pop()
        }
        setColumns(column)
    }, [])

    const confirm = async (item) => {
        if (item.orderStates == '待审核') {
            const result = await orderListExamine(item.key)
            const { msg, status } = result
            if (status === 0) {
                message.success(msg, 2)
                orderLookData()
            } else {
                message.error(msg, 2)
            }
        } else {
            message.warn('非待审核状态，不能修改')
        }

    }

    const onClickLook = (item) => {
        PubSub.publish('look', item)
        PubSub.publish('selectOption', 'true')//通知弹窗已经打开，可以加载商品了
    }

    const onClickDel = async (item) => {
        let result = await orderListDel(item.key)
        const { msg, status } = result
        if (status === 0) {
            message.success(msg, 1)
            let _source = data.filter(n => n.key !== item.key)
            console.log(_source)
            setData(_source)
        } else {
            message.error(msg, 1)
        }

    }

    const rowSelection = {//check
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    useEffect(async () => {
        orderLookData()
    }, [])

    useEffect(() => {
        PubSub.subscribe('add', (msg, datas) => {
            orderAddData(datas)//添加数据
        })
        PubSub.subscribe('change', async (msg, datas) => {
            console.log('我是更改的数据', datas)
            orderChangeData(datas)
        })
        return () => {
            PubSub.unsubscribe('add')
            PubSub.unsubscribe('change')
        }
    }, [data])

    const orderLookData = async () => {
        let result = await orderListLook()
        const {msg,status,data}=result
        if(status===0){
            setData(data.reverse())
        }else{
            message.error(msg,2)
        }
        
    }

    const orderAddData = async (datas) => {
        const result = await orderListAdd(datas)
        const { status, dataAdd, msg } = result
        if (status === 0) {
            message.success(msg, 1)
            const _source = [...data]
            _source.unshift(dataAdd)
            setData(_source)
        }
        if (status === 1) message.error(msg, 1)
    }

    const orderChangeData = async (datas) => {
        let result = await orderListChange(datas)
        const { msg, status } = result
        if (status === 0) {
            orderLookData()
            message.success(msg, 1)
        } else {
            message.error(msg, 1)
        }
    }

    const handleChange=async (value)=> {
        console.log(value.label);
        if(value.label=='全部订单') return orderLookData()
        let str=value.label.replace('订单','')
        const result=await orderListQuery(str,'orderStates')
        const {msg,status,data}=result
        if (status === 0) {
            message.success(msg, 2)
            setData(data.reverse())
        }else{
            message.error(msg,2)
        }
    }

    const onSearch =async (value) => {
        const result=await orderListQuery(value,'customer')
        const {msg,status,data}=result
        if (status === 0) {
            message.success(msg, 2)
            setData(data.reverse())
        }else{
            message.error(msg,2)
        }
    }

    const title = (
        <div>
            订单状态：
            <Select labelInValue={true} defaultValue="all" style={{ width: 120 }} onSelect={handleChange} name='select'>
                <Option value="all">全部订单</Option>
                <Option value="Pending">待审核订单</Option>
                <Option value="delete">待生产订单</Option>
                <Option value="InProduction">生产中订单</Option>
                <Option value="Warehousing">待入库订单</Option>
                <Option value="ExWarehousing">待出库订单</Option>
                <Option value="Finished">已完成订单</Option>
            </Select>
            <span style={{marginLeft:'20px'}}>
                客户名称：<Search placeholder="按客户名称搜索" allowClear onSearch={onSearch} style={{ width: 240 }} name='customer' />
            </span>
        </div>
    )

    return (
        <Card size="small" title={title} extra={<Frame />} style={{ width: '100%', height: '100%' }}>
            <Table
                columns={columns}
                dataSource={data}
                scroll={{ y: 'calc(100vh - 310px)' }}
                size="middle"
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
            />
        </Card>
    );

}

export default OrderList