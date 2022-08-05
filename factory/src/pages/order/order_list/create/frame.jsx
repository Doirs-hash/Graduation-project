//商品列表的弹窗
import React, { useRef, useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Divider, Select, DatePicker, Cascader, Upload, message,Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
import PubSub from 'pubsub-js'

import AddMessage from './addMessage';
import './css/frame.css'
moment.locale('zh-cn')

const { Option } = Select;
const { RangePicker } = DatePicker;

const options = [
    {
        value: 'yes',
        label: '已支付',
        children: [
            {
                value: 'weChat',
                label: '微信支付',
            },
            {
                value: 'aliPay',
                label: '支付宝支付',
            },
            {
                value: 'account',
                label: '银行转账',
            },
        ],
    },
    {
        value: 'no',
        label: '未支付',
    },
];


const Frame = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)//弹窗open
    const addForm = useRef(null)//表单ref
    const [list, setList] = useState([])//添加的商品列表
    const [payValue, setPayValue] = useState([])//支付
    const [modalType, setModalType] = useState('')//弹窗类型-look-add
    const [form] = Form.useForm();
    const [changelist, setChangeList] = useState([])//修改的数据
    const [changeStatus, setChangeStatus] = useState(false)
    const people=JSON.parse(window.sessionStorage.getItem('user')).name
    //获取回显值
    useEffect(() => {
        PubSub.subscribe('look', (msg, data) => {
            setChangeStatus(true)
            lookList(data)
        })
        return () => {
            PubSub.unsubscribe('look')
        }
    }, [])

    const lookList = (item) => {
        setModalType('查看订单')
        setIsModalVisible(true)
        setChangeList(item)
        console.log('我是查看弹窗',item);
        
        PubSub.publish('display', item?.goodsList)
        form.setFieldsValue({
            remember: true,
            'customer': item?.customer,
            'people': item?.people,
            'time': [moment(item?.xdtime), moment(item?.jhtime)],
            'deliver': item?.deliver,
            'cm': item?.cm,
            'orderStates': item?.orderStates
        });
    }
    //新增
    const showModal = () => {
        console.log('add');
        setModalType('添加订单')
        setIsModalVisible(true)
        PubSub.publish('selectOption','true')//通知弹窗已经打开，可以加载商品了
    };

    const isOk=()=>{
        let formDatas = addForm.current.getFieldsValue()
        console.log(formDatas)
        if (list.length === 0) {
            return message.error('请将添加商品栏内容填写完整', 2)
        }
        for (let i = 0; i < list.length; i++) {
            for (let value in list[i]) {
                if (list[i][value] == "" && value != 'price') {
                    return message.error("请将添加商品栏的数据填写完整", 2)
                }
            }
        }
        for (let value in formDatas) {
            if (formDatas[value] === undefined&&value!=='orderStates'&&value!=='people') {
                return message.error('请将表单内容填写完整', 1)

            }
        }
    }

    const addlist = () => {
        let formDatas = addForm.current.getFieldsValue()
        let people=JSON.parse(window.sessionStorage.getItem('user')).name
        isOk()
        let data = {
            key: '',
            customer: '',//客户
            people: people,//操作员
            xdtime: '',//下单时间
            jhtime: '',//提交时间
            cm: '',//付款方式
            orderStates: '',//订单状态
            price: 0,
            goodsList: {},//购买的商品列表
        }
        for (let i = 0; i < payValue.length; i++) {
            let str = '/'
            if (i == payValue.length - 1) str = ''
            data.cm += payValue[i]['label'] + str
        }
        data.customer = formDatas.customer.label===undefined?formDatas.customer:formDatas.customer.label
        // data.people = formDatas.people.label===undefined?formDatas.people:formDatas.people.label
        data.orderStates = '待审核'
        data.xdtime = moment(formDatas.time[0]).format('YYYY-MM-DD')
        data.jhtime = moment(formDatas.time[1]).format('YYYY-MM-DD')
        data.goodsList = list
        list.map(item=> data.price+= item.price)
        console.log('data=', data)
        PubSub.publish('add', data)
        setIsModalVisible(false);
        addForm.current.resetFields()
        PubSub.publish('clear', [])
    }

    const changeList = () => {
        isOk()
        let formDatas = addForm.current.getFieldsValue()
        let data=changelist
        let cm=''
        for (let i = 0; i < payValue.length; i++) {
            let str = '/'
            if (i == payValue.length - 1) str = ''
            cm += payValue[i]['label'] + str
        }
        data.cm=cm
        // data.deliver = formDatas.deliver.label===undefined?formDatas.deliver:formDatas.deliver.label
        data.orderStates = formDatas.orderStates.label===undefined?formDatas.orderStates:formDatas.orderStates.label
        data.xdtime = moment(formDatas.time[0]).format('YYYY-MM-DD')
        data.jhtime = moment(formDatas.time[1]).format('YYYY-MM-DD')
        data.goodsList = list
        PubSub.publish('change', data)
        addForm.current.resetFields()
        setIsModalVisible(false)
    }

    //弹窗ok按钮
    const handleOk = () => {
        if (modalType === '添加订单') addlist()
        if (modalType === '查看订单') changeList()
        setChangeStatus(false)
        PubSub.publish('clear', [])
        // addForm.current.resetFields()
    };

    //弹窗取消按钮
    const handleCancel = () => {
        setModalType('')
        setIsModalVisible(false);
        setChangeStatus(false)
        PubSub.publish('clear', [])
        addForm.current.resetFields()
    };

    // 获取弹窗 - 商品数据
    const onGetMessage = (list) => {
        setList(list);
    };

    //支付的label值
    const cascaderValue = (a, b) => {
        setPayValue(b)
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                新增
            </Button>
            <Modal title={modalType}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
            >
                <Form layout='inline'
                    ref={addForm}
                    form={form}
                >
                    <Form.Item label="客户" name='customer'
                        rules={[{
                            required: true,
                            message: '请输入客户名称或公司名'
                        }]}
                    >
                        <Input placeholder="请输入名称" style={{ width: '300px' }} disabled={changeStatus} />
                    </Form.Item>
                    <Form.Item label="操作员" name='people' rules={[{ required: true }]} >
                        <Select labelInValue={true} placeholder='选择操作员' defaultValue={people} style={{ width: 150 }} disabled>
                            <Option value="1">张三</Option>
                            <Option value="2">李四</Option>
                            <Option value="3">王五</Option>
                        </Select>
                    </Form.Item>
                    <br /><br />
                    <Form.Item label='下单时间/交货时间' rules={[{ required: true }]} name='time'>
                        <RangePicker locale={locale}
                            format='YYYY-MM-DD'
                            placeholder={['下单时间', '交货时间']}
                            rules={[{ required: true }]}
                            onChange={(value) => { console.log(value) }}
                        />
                    </Form.Item>
                    <br />
                    <br />
                    <Form.Item label='付款：' name='cm' rules={[{ required: true }]}>
                        <Cascader
                            labelinvalue="true"
                            options={options}
                            placeholder="请选择付款方式"
                            style={{ width: 150 }}
                            onChange={(a, b) => { cascaderValue(a, b) }}
                        />
                    </Form.Item>

                    <Form.Item label='订单状态' name='orderStates'>
                        <Select labelInValue={true} defaultValue="dsh" placeholder='选择订单状态' style={{ width: 150 }} disabled >
                            <Option value="dsh">待审核</Option>
                            <Option value="sh">待生产</Option>
                            <Option value="sc">生产中</Option>
                            <Option value="wc">待入库</Option>
                            <Option value="zf">待出库</Option>
                            <Option value="zf">已完成</Option>
                        </Select>
                    </Form.Item>
                </Form>
                <Divider orientation="left" plain>添加商品</Divider>
                <AddMessage onGetMessage={onGetMessage} />

            </Modal>
        </>
    );
};


export default Frame
