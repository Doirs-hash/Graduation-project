//商品入库
import { useEffect, useState,useRef } from 'react'
import { Table, Card, Button, Form, Input, Modal, Select,message } from 'antd';
import { accountAdd,accountLook,accountChange,accountDel,accountQuery } from '../../api';
import { data } from 'jquery';

const { Search } = Input;
const { Option } = Select

const Account = () => {
    const [dataSource, setDataSource] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState('新增用户')//弹窗类型-look-add
    const [form]=Form.useForm()
    const addForm = useRef(null)//表单ref

    const columns = [
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: '账号(工号)',
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: '使用者',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: '使用者电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '操作',
            // dataIndex: 'change',
            key: 'change',
            render: (item) => <div>
                <Button type='link' onClick={() =>{
                    showModal()
                    changeList(item)
                }}>修改</Button>
                <Button type='link' onClick={() => onClickDel(item)}>删除</Button>
            </div>,
        },

    ];

    useEffect(()=>{
        dataLook()
    },[])

    const dataLook=async ()=>{
        let result=await accountLook()
        const {data,msg,status}=result
        console.log(data)
        if(status===0){
            setDataSource(data.reverse())
            message.success(msg,2)
        }else{
            message.error(msg,2)
        }
    }

    const dataAdd=async (data)=>{
        let result=await accountAdd(data)
        const {dataAdd,msg,status}=result
        if(status===0){
            message.success(msg, 2)
            const _source = [...dataSource]
            _source.unshift(dataAdd)
            setDataSource(_source)
        }else{
            message.error(msg,2)
        }
    }

    const dataChange=async (data)=>{
        let result=await accountChange(data)
        const {msg,status}=result
        if(status===0){
            dataLook()
            message.success(msg,2)
        }else{
            message.error(msg,2)
        }

    }

    const onClickDel=async (item)=>{
        console.log(item)
        let result=await accountDel(item.key)
        const {msg,status}=result
        if(status===0){
            message.success(msg, 2)
            let _source = dataSource.filter(n => n.key !== item.key)
            setDataSource(_source)
        }else{
            message.error(msg,2)
        }

    }

    const changeList=(item)=>{//回显
        console.log(item)
        setModalType('修改账户信息')
        form.setFieldsValue({
            remember: true,
            'key': item?.key,
            'role': item?.role,
            'account': item?.account,
            'name': item?.name,
            'password': item?.password,
            'phone': item?.phone,
        });
    }

    const onSearch =async (value) => {
        const result=await accountQuery(value)
        const {msg,status,data}=result
        if(status===0){
            setDataSource(data)
            message.success(msg,2)
        }else{
            message.error(msg)
        }

    }

    const showModal = () => {
        setModalType('新增账户信息')
        setIsModalVisible(true);
    };

    const handleOk = () => {
        
        let data=form.getFieldValue()
        typeof data.role=='object'?data.role=data.role.label:data.role=data.role
        for(const item in data){
            if(data[item]=='') return message.warn('请将信息填写完整')
        }
        console.log(data)
        if(modalType=='新增账户信息') dataAdd(data)
        if(modalType=='修改账户信息') dataChange(data)
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields()
    };

    const title = (<Form.Item label='按账户名搜索：' style={{ marginBottom: 0 }}><Search placeholder="请输入客户名称" onSearch={onSearch} style={{ width: 200 }} /></Form.Item>)
    const extra = (<Button type="primary" onClick={showModal}>新增</Button>)

    return (
        <>
            <Card size="small" title={title} extra={extra} style={{ width: '100%', height: '100%' }}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{ y: 'calc(100vh - 310px)' }}
                    size="middle"
                />
            </Card>
            <Modal title={modalType} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form layout='horizontal'ref={addForm} form={form}>
                    <Form.Item label='角  色' name='role'>
                        <Select labelInValue placeholder='选择用户角色' >
                            <Option value="1">报单员</Option>
                            <Option value="2">仓管员</Option>
                            <Option value="3">生产员</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='账  号：' name='account'>
                        <Input placeholder='请输入账号' />
                    </Form.Item>
                    <Form.Item label='使用者：' name='name'>
                        <Input placeholder='请输入使用者姓名' />
                    </Form.Item>
                    <Form.Item label='密  码：' name='password'>
                        <Input placeholder='请设置密码' />
                    </Form.Item>
                    <Form.Item label='电  话：' name='phone'>
                        <Input placeholder='请输入使用者电话' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )

}

export default Account