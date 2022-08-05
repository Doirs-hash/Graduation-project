import {useEffect,useState} from 'react'
import {Card,Table,Button,Input,Form,Modal,message} from 'antd'
import { goodsStockGoIn,goodsGoStock ,stockProductQuery} from '../../api';
import moment from 'moment';

const { Search } = Input;


const ProductionGoIn=()=>{

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tableData, setTableData] = useState([])
    const [dataSource, setDataSource] = useState([])

    const columns = [
        {
            title: '生产订单编号',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: '包含商品订单',
            dataIndex: 'order',
            key: 'order',
        },
        {
            title: '订单状态',//(待入库，生产中，已完成)
            dataIndex: 'orderStates',
            key: 'orderStates',
            render: (item,b,c) =><div>
                <p>{b.orderStates}</p>
            </div>
             
        },
        {
            title: '查看',//
            // dataIndex: 'key',
            key: 'look',
            render: (item) => <div>
                <Button type='link' onClick={() =>
                    showModal(item)
                }>详情</Button>
                <Button type='primary' onClick={() => onChangeGoIn(item)}>入库</Button>
            </div>,
        },
    ];

    const tableColumns = [
        {
            title: '商品名',//
            dataIndex: 'name',
            render: (checked, record, index) => {
               return <p>{record?.name}</p>
            }
        },
        {
            title: '数量',//
            dataIndex: 'num',
            render: (checked, record, index) => {
                return <p>{record?.num}</p>
             },
        },
    ]

    useEffect(()=>{
        goodsGoInLook()
    },[])

    const goodsGoInLook=async ()=>{
        const result=await goodsStockGoIn()
        console.log(result)
        const {msg,data,status}=result
        if(status===0){
            message.success(msg,2)
            setDataSource(data)
        }else{
            message.error(msg,2)
        }
    }

    const goodsGoInStock=async (data,time,operator)=>{
        const result=await goodsGoStock(data,time,operator)
        console.log(result)
        const {msg,status}=result
        if(status===0){
            message.success(msg,2)
            goodsGoInLook()
            // setDataSource(data)
        }else{
            message.error(msg,2)
        }
    }

    const onChangeGoIn=(item)=>{
        console.log(item)
        // if(item?.orderStates=='待入库'){
        //     const _source = [...dataSource]
        //     _source.map(n => n.key == item.key ? n.orderStates = '已入库':null )
        //     setDataSource(_source)
        // }else{
        //     message.warn(`已是${item.orderStates}状态`,2)
        // }
        const date=moment().format("YYYY-MM-DD")
        let name= JSON.parse(window.sessionStorage.getItem('user'))
        goodsGoInStock(item,date,name.name)
        
    }

    const showModal = (item) => {
        setIsModalVisible(true);
        console.log(item)
        setTableData(item?.goodslist)
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSearch = async (value) => {
        console.log(value);
        let result =await stockProductQuery(value)
        const {msg,status,data}=result
        console.log(result)
        if(status==0){
            message.success(msg,2)
            setDataSource(data)
        }else{
            message.error(msg,2)
        }
    }

    const title = (<Form.Item label='按编号搜索：' style={{ marginBottom: 0 }}><Search placeholder="请输入生产订单编号" onSearch={onSearch} style={{ width: 200 }} /></Form.Item>)

    return (
        <>
            <Card size="small" title={title}  style={{ width: '100%', height: '100%' }}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{ y: 'calc(100vh - 310px)' }}
                    size="middle"
                />
            </Card>
            <Modal title="订单商品" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Table
                    // components={components}
                    rowClassName={() => 'editable-row'}
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

export default ProductionGoIn