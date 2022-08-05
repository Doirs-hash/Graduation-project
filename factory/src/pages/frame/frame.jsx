//商品列表的弹窗
import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button, Form, Input, Divider, Select, message } from 'antd';
import PubSub from 'pubsub-js';
import UploadImg from './uploadImg';
import './css/frame.css'

const { Option } = Select;

const Frame = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');
    const [changeList,setChangeList]=useState({})
    const addForm = useRef(null)

    useEffect(()=>{
        PubSub.subscribe('goodsLook',(msg,data)=>{
            setChangeList(data)
            lookList(data)
        })
        return ()=>{
            PubSub.unsubscribe('goodsLook')
        }
    },[])


    const showModal = () => {
        setIsModalVisible(true);
        setModalType('添加商品')
    };

    const handleOk = () => {
        // setIsModalVisible(false);
        if (modalType == '添加商品') addGoods()
        if (modalType == '查看/修改商品') changeGoods()
    };

    const handleCancel = () => {
        setIsModalVisible(false);

        addForm.current.resetFields()
    };


    const isOk=()=>{
        let formDatas = addForm.current.getFieldsValue()
        for (let value in formDatas) {
            console.log(value)
            if (formDatas[value] === undefined) {
                return message.error('请将表单内容填写完整', 2)
            }
        }
    }

    const addGoods = () => {
        console.log('添加商品')
        isOk()
        let formData = addForm.current.getFieldsValue()
        formData.classify = formData.classify.label
        setIsModalVisible(false);
        PubSub.publish('addGoods',formData)
    }

    const lookList=(item)=>{
        setModalType('查看/修改商品')
        setIsModalVisible(true)
        form.setFieldsValue({
            remember: true,
            'name': item?.name,
            'size': item?.size,
            'company': item?.company,
            'color': item?.color,
            'classify': item?.classify,
            'safetyStock': item?.safetyStock,
            'sellingprice': item?.sellingprice,
            'stock': item?.stock,
            'extend': item?.extend,
        });

    }

    const changeGoods=()=>{
        console.log('修改商品')
        isOk()
        let formData = addForm.current.getFieldsValue()
        formData.classify = formData.classify.label===undefined?formData.classify:formData.classify.label
        formData['key']=changeList.key
        setIsModalVisible(false);
        PubSub.publish('changeGoods',formData)
        addForm.current.resetFields()
    }

    const [form] = Form.useForm();
    return (
        <>
            <Button type="primary" onClick={showModal}>
                新增
            </Button>
            <Modal title={modalType} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={800} style={{ paddingTop: "0px" }}
            >
                <Form layout='inline' ref={addForm} form={form}>
                    <Form.Item label="名称" name='name'>
                        <Input placeholder="请输入名称" />
                    </Form.Item>
                    <Form.Item label="规格" name='size'>
                        <Input placeholder="请输入规格" />
                    </Form.Item>
                    <Form.Item label="单位" name='company'>
                        <Input placeholder="输入单位" />
                    </Form.Item>
                    <br /><br />
                    <Form.Item label="颜色" name='color' >
                        <Input placeholder="请输入颜色" />
                    </Form.Item>
                    <Form.Item label="类别" name='classify'>
                        <Select labelInValue placeholder='请选择分类' style={{ width: 185 }} >
                            <Option value="jack">生活用品</Option>
                            <Option value="lucy">文具</Option>
                            <Option value="Yiminghe">饰品</Option>
                        </Select>
                    </Form.Item>
                    <br /><br />
                    <Form.Item label="安全存量" name='safetyStock'>
                        <Input placeholder="请输入安全存量" style={{ width: 155 }} />
                    </Form.Item>
                    <Form.Item label="销售价(元)" name='sellingprice'>
                        <Input placeholder="请输入销售价" style={{ width: 150 }} />
                    </Form.Item>
                    <Form.Item label="库存" name='stock'>
                        <Input placeholder="请输入库存" />
                    </Form.Item>
                    <br /><br />
                    <Form.Item label='扩展信息' name='extend'>
                        <Input placeholder="请输扩展信息" style={{ width: 300 }} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Frame
