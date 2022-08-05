//待生产订单
import { useEffect, useState } from "react"
import { Card, Table, Input, Button, Form, Modal,message } from "antd";
import moment from "moment";
import { productListLook,productListChange,productionQuery } from "../../api";

const { Search } = Input;

const ProductionOrder = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectionType, setSelectionType] = useState('checkbox');
    const [tableData, setTableData] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [orderOption,setOrderOption]=useState([])//选择的订单

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
            title: '订单状态',//(待生产，生产中，已完成)
            dataIndex: 'orderStates',
            key: 'orderStates',
        },
        {
            title: '查看',//
            // dataIndex: 'key',
            key: 'look',
            render: (item) => <div>
                <Button type='link' onClick={() =>
                    showModal(item)
                }>详情</Button>
                {/* <Button type='link' onClick={() => onClickDel(item)}>删除</Button> */}
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
    const data=[
        {
            key: '0254494',
            customer: '岳阳冠凯技术有限公司',
            orderStates: '待生产',
            goodslist:[
                {
                    key:'蝴蝶结1',
                    name:'蝴蝶结',
                    num:'100'
                },
                {
                    key:'蝴蝶结2',
                    name:'蝴蝶结1',
                    num:'100'
                },
                {
                    key:'蝴蝶结3',
                    name:'蝴蝶结2',
                    num:'100'
                },
            ],
        },
        {
            key: '0252344',
            customer: '常德德仕贸易',
            orderStates: '待生产',
            goodslist:[
                {
                    key:'蝴蝶结1',
                    name:'蝴蝶结',
                    num:'100'
                },
                {
                    key:'蝴蝶结2',
                    name:'蝴蝶结1',
                    num:'100'
                },
                {
                    key:'蝴蝶结3',
                    name:'蝴蝶结2',
                    num:'100'
                },
            ],
        },
        {
            key: '024345494',
            customer: '湖南阳鑫有限公司',
            orderStates: '待生产',
            goodslist:[
                {
                    key:'蝴蝶结1',
                    name:'蝴蝶结',
                    num:'100'
                },
                {
                    key:'蝴蝶结2',
                    name:'蝴蝶结1',
                    num:'100'
                },
                {
                    key:'蝴蝶结3',
                    name:'蝴蝶结2',
                    num:'100'
                },
            ],
        },
        {
            key: '02123333394',
            customer: '湖南隆丰有限公司',
            orderStates: '待生产',
            goodslist:[
                {
                    key:'蝴蝶结1',
                    name:'蝴蝶结',
                    num:'100'
                },
                {
                    key:'蝴蝶结2',
                    name:'蝴蝶结1',
                    num:'100'
                },
                {
                    key:'蝴蝶结3',
                    name:'蝴蝶结2',
                    num:'100'
                },
            ],
        },
        {
            key: '02534494',
            customer: '	湖南好好文具公司',
            orderStates: '待生产',
            goodslist:[
                {
                    key:'蝴蝶结1',
                    name:'蝴蝶结',
                    num:'100'
                },
                {
                    key:'蝴蝶结2',
                    name:'蝴蝶结1',
                    num:'100'
                },
                {
                    key:'蝴蝶结3',
                    name:'蝴蝶结2',
                    num:'100'
                },
            ],
        },
    ]

    const rowSelection = {//check
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setOrderOption(selectedRows)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    }; 

    useEffect(()=>{
        // setDataSource(data)
        productLookData()//查看待生产订单
    },[])

    const productLookData = async () => {
        let result = await productListLook()
        console.log(result)
        const {data,msg,status}=result
        if(status===0){
            // message.success(msg,2)
            if(data){
                setDataSource(result.data.reverse())
            }
        }else{
            message.error(msg,2)
        }
        
    }

    const orderChangeProduct = async (data,date,operator) => {
        let result = await productListChange(data,date,operator)
        const {msg,status}=result
        if(status==0){
            message.success(msg,2)
            productLookData()
        }else{
            message.error(msg,2)
        }
    }

    const onOk=(checked, record, index)=>{
        console.log(checked, record, index)
    }

    const showModal = (item) => {
        setIsModalVisible(true);
        console.log(item)
        setTableData(item?.goodsList)
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSearch = async (value) => {
        console.log(value,'00000');
        let result =await productionQuery(value)
        const {msg,status,data}=result
        console.log(result)
        if(status==0){
            message.success(msg,2)
            setDataSource(data)
        }else{
            message.error(msg,2)
        }
    }
    const onClick=()=>{
        console.log(orderOption,moment().format('YYYY-MM-DD'))
        const date=moment().format('YYYY-MM-DD')
        orderChangeProduct(orderOption,date,'张三')//订单转生产订单
    }

    const title = (<Form.Item label='按客户搜索：' style={{ marginBottom: 0 }}><Search placeholder="请输入客户名称" onSearch={onSearch} style={{ width: 200 }} /></Form.Item>)
    const extra=(<Button type='primary' onClick={onClick}>转到生产</Button>)
    return (
        <>
            <Card size="small" title={title} extra={extra} style={{ width: '100%', height: '100%' }}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{ y: 'calc(100vh - 310px)' }}
                    size="middle"
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                />
            </Card>
            <Modal title="订单商品" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Table
                    // components={components}
                    rowClassName={() => 'editable-row'}
                    dataSource={tableData}
                    columns={tableColumns}
                    style={{ width: '100%' }}
                    pagination={{ pageSize: 6, position: ['bottomCenter'] }}
                    size="small"
                />
            </Modal>
        </>
    )
}

export default ProductionOrder