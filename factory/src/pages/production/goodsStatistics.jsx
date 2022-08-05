//待生产商品统计
import { useEffect, useState } from "react"
import { Card, Table, Input, Form, Button, Modal ,message} from "antd";
import moment from "moment";
import { goodsStatisticsListChange ,goodsStatisticsListLook,productionOrderQuery} from "../../api";

const { Search } = Input;

const GoodsStatistics = () => {
    const [dataSource, setDataSource] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tableDataSource, setTableDataSource] = useState([])
    const [modalType, setModalType] = useState('新增用户')//弹窗类型-look-add

    const columns = [
        {
            title: '生产编号',
            dataIndex: 'key',
            key: 'key',
            width: 130,
        },
        {
            title: '包含订单',//生产完成，待生产
            dataIndex: 'member',
            
        },
        {
            title: '开始时间',
            dataIndex: 'creattime',
            
        },
        {
            title: '生产状态',//生产完成，待生产
            dataIndex: 'orderstatus',
            render:(checked, record, index)=><div>
                <p>{record?.orderstatus}</p>
            </div>
        },
        
        {
            title: '操作',//生产完成，待生产
            // dataIndex: 'option',
            key: 'option',
            render: (item) => <div>
                <Button type="primary" onClick={() => onClickChange(item)}>生产完成转入库</Button>
                <Button type='link' onClick={() => showModal(item)}>详情</Button>
            </div>
        },
    ];

    const tableColumns = [
        {
            title: '商品编号',
            dataIndex: 'key',
            render: (checked, record, index) => {
                return <p>{record?.key}</p>
            }
        },
        {
            title: '商品名',
            dataIndex: 'name',
            render: (checked, record, index) => {
                return <p>{record?.name}</p>
            }
        },
        {
            title: '生产数量',
            dataIndex: 'num',
            render: (checked, record, index) => {
                return <p>{record?.num}</p>
            }

        },
    ]

    useEffect(() => {
        // setDataSource(data)
        goodsLook()
    }, [])

    const onSearch = async (value) => {
        console.log(value);
        let result =await productionOrderQuery(value,'生产中')
        const {msg,status,data}=result
        console.log(result)
        if(status==0){
            message.success(msg,2)
            setDataSource(data)
        }else{
            message.error(msg,2)
        }
    }

    const goodsChange=async (id,member,finishtime)=>{
        let result =await goodsStatisticsListChange(id,member,finishtime)
        const {msg,status}=result
        if(status==0){
            message.success(msg,2)
            goodsLook()
        }else{
            message.error(msg,2)
        }
    }

    const goodsLook=async()=>{
        let result=await goodsStatisticsListLook()
        const {msg,status,data}=result
        console.log(result)
        if(status===0){
            setDataSource(data)
            message.success(msg,2)
        }else{
            message.error(msg,2)
        }
    }

    const onClickChange = (item) => {
        const date=moment().format('YYYY-MM-DD')
        console.log(item.key,item.member,date)
        goodsChange(item.key,item.member,date)

    }



    const showModal = (item) => {
        setIsModalVisible(true);
        setTableDataSource(item?.goodslist)
        setModalType(item?.key+item?.orderstatus)
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        // form.resetFields()
    };


    const title = (<Form.Item label='按生产编号搜索：' style={{ marginBottom: 0 }}><Search placeholder="请输入商品" onSearch={onSearch} style={{ width: 200 }} /></Form.Item>)

    return (
        <>
            <Card size="small" title={title} style={{ width: '100%', height: '100%' }}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{ y: 'calc(100vh - 310px)' }}
                    size="middle"
                />
            </Card>
            <Modal title={modalType} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Table
                    columns={tableColumns}
                    dataSource={tableDataSource}
                    scroll={{ y: 'calc(100vh - 310px)' }}
                    size="middle"
                />
            </Modal>
        </>
    )
}

export default GoodsStatistics