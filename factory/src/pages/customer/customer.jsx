//商品入库
import { useEffect, useState ,useRef} from 'react'
import { Table, Card, Button, Form, Input, Modal,message } from 'antd';
import { customersLook,customersAdd,customersChange,customersDel ,customersQuery} from '../../api';

const { Search } = Input;

const Customer = () => {
    const [dataSource, setDataSource] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState('新增客户信息')//弹窗类型-look-add
    const [form]=Form.useForm()
    const addForm = useRef(null)//表单ref

    const columns = [
        {
            title: '客户名',
            dataIndex: 'name',
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
        },
        {
            title: '地址',
            dataIndex: 'address',
        },
        {
            title: '操作',
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
        customerLook()
    },[])

    const customerLook=async ()=>{
        let result=await customersLook()
        const {data,msg,status}=result
        if(status===0){
            setDataSource(data.reverse())
            message.success(msg,2)
        }else{
            message.error(msg,2)
        }
    }

    const customerAdd=async (data)=>{
        let result=await customersAdd(data)
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

    const customerChange=async (data)=>{
        let result=await customersChange(data)
        const {msg,status}=result
        if(status===0){
            customerLook()
            message.success(msg,2)
        }else{
            message.error(msg,2)
        }
    }

    const onClickDel=async(item)=>{
        console.log(item)
        let result=await customersDel(item.key)
        const {msg,status}=result
        if(status===0){
            message.success(msg, 2)
            let _source = dataSource.filter(n => n.key !== item.key)
            setDataSource(_source)
        }else{
            message.error(msg,2)
        }
    }

    const onSearch =async (value) => {
        const result=await customersQuery(value)
        const {msg,status,data}=result
        if(status===0){
            setDataSource(data)
            message.success(msg,2)
        }else{
            message.error(msg)
        }

    };

    const changeList=(item)=>{//表单回显
        console.log(item)
        setModalType('修改账户信息')
        form.setFieldsValue({
            remember: true,
            'key':item?.key,
            'name': item?.name,
            'phone': item?.phone,
            'address': item?.address,
        });
    }

    const showModal = () => {
        setModalType('新增账户信息')
        setIsModalVisible(true);
    };

    const handleOk = () => {
        
        if(modalType=='新增账户信息') handleAdd()
        if(modalType=='修改账户信息') handleChange()
    };

    const handleAdd=()=>{
        const data=form.getFieldValue()
        if(Object.keys(data).length<3){
            return message.warn('请将信息填写完整')
        }
        customerAdd(data)
        setIsModalVisible(false);
    }

    const handleChange=()=>{
        const data=form.getFieldValue()
        if(Object.keys(data).length<4){
            return message.warn('请将信息填写完整')
        }
        customerChange(data)
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields()
    };

    const title = (<Form.Item label='按客户名搜索：' style={{ marginBottom: 0 }}><Search placeholder="请输入客户名称" onSearch={onSearch} style={{ width: 200 }} /></Form.Item>)
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
                <Form layout='horizontal' form={form} ref={addForm}>
                    <Form.Item label='客户名称：' name='name'>
                        <Input placeholder='请输入客户名称' />
                    </Form.Item>
                    <Form.Item label='客户电话：' name='phone'>
                        <Input placeholder='请输入客户电话' />
                    </Form.Item>
                    <Form.Item label='客户地址：' name='address'>
                        <Input placeholder='请输入客户地址' />
                    </Form.Item>
                </Form>

            </Modal>
        </>


    )

}

export default Customer