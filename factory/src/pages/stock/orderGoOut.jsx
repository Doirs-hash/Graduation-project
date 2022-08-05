//订单出库
import { useEffect, useState, useRef } from 'react'
import { Table, Card, Button, Input, Form, Modal, message } from 'antd';
import { orderGoOutSee,orderGoOutAdd } from '../../api';
import moment from 'moment';

const OrderGoOut = () => {
    const [dataSource, setDataSource] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)//弹窗open
    const [modalType, setModalType] = useState('')//弹窗类型-look-add
    const addForm = useRef(null)//表单ref
    const [tableData, setTableData] = useState([])
    const [changeStatus, setChangeStatus] = useState(false)//input/button是否可用

    const [form] = Form.useForm();

    const columns = [
        {
            title: '订单编号',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: '客户名称',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: '订单状态',
            dataIndex: 'orderStates',
            key: 'orderStates',
            render: (checked, record, index) => <div>
                <p>{record?.orderStates}</p>
            </div>
        },
        {
            title: '操作员',
            dataIndex: 'people',
            key: 'people'
        },
        {
            title: '操作',//查看的是订单的商品
            // dataIndex: 'key',
            key: 'look',
            render: (item) => <div>
                <Button type='link' onClick={() => onClickLook(item)}>订单详情</Button>
                <Button type='primary' onClick={() => onClickChange(item)}>出库</Button>
            </div>,
        },
    ];

    const tableColumns = [
        {
            title: '商品编号',
            dataIndex: 'key',
        },
        {
            title: '商品名',
            dataIndex: 'name',
        },
        {
            title: '数量',
            dataIndex: 'num',
        },
    ]

    useEffect(() => {
        // setDataSource(data)
        orderGoOutLook()
    }, [])

    const orderGoOutLook = async () => {
        const result = await orderGoOutSee()
        const { msg, status, data } = result
        if (status === 0) {
            message.success(msg, 1)
            setDataSource(data)
        } else {
            message.error(msg, 1)
        }
    }

    const onClickLook = (item) => {
        console.log(item)
        setIsModalVisible(true)
        setChangeStatus(true)
        form.setFieldsValue({
            num: item?.key,
            name: item?.customer
        })
        setTableData(item.goodsList)
    }

    const onClickChange = async(item) => {
        let date=moment().format('YYYY-MM-DD')
        let name= JSON.parse(window.sessionStorage.getItem('user'))
        const result = await orderGoOutAdd(item.key,item.goodsList,date,name.name)
        const { msg, status } = result
        console.log(result)
        if (status === 0) {
            message.success(msg, 1)
            orderGoOutLook()
        } else {
            message.error(msg, 1)
        }
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setChangeStatus(false)
        form.resetFields()
        setTableData([])
    };

    const onSearch = (value) => {
        console.log(value);
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };


    // const extra = (<Button type='primary' onClick={showModal}>新增出库</Button>)

    return (
        <>
            <Card size="small" title='订单出库' style={{ width: '100%', height: '100%' }}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{ y: 'calc(100vh - 310px)' }}
                    size="middle"
                />
            </Card>
            <Modal title="订单商品" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form ref={addForm} form={form} onFinish={onFinish} name='add'
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item label='订单编号' name='num'
                        rules={[
                            {
                                required: true,
                                message: '请输入商品编号',
                            },
                        ]}>
                        <Input placeholder="请输入编号" disabled={changeStatus} />
                    </Form.Item>
                    <Form.Item label='客户名称' name='name'
                        rules={[
                            {
                                required: true,
                                message: '请输入客户名称',
                            },
                        ]}>
                        <Input placeholder="请输入客户名称" disabled={changeStatus}

                        />
                    </Form.Item>
                    {/* <Button type="primary" htmlType="submit" disabled={changeStatus}>查询商品</Button> */}
                </Form>
                <Table
                    columns={tableColumns}
                    dataSource={tableData}
                    style={{ width: '100%' }}
                    pagination={{ pageSize: 6, position: ['bottomCenter'] }}
                    size="small"
                />
            </Modal>
        </>
    )
}

export default OrderGoOut