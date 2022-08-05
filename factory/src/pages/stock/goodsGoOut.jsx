//商品入库
import {useEffect,useState} from 'react'
import { Table, Card, Button,  Form,Input ,message} from 'antd';
import { goodsOutLook,goodsOutInQuery } from '../../api';
const { Search } = Input;


const GoodsGoOut =()=>{
    const [dataSource,setDataSource]=useState([])
    
    const columns = [
        {
            title: '商品条码',
            dataIndex: 'goodsid',
        },
        {
            title: '商品名',
            dataIndex: 'goodsname',
        },
        {
            title: '规格',
            dataIndex: 'goodsspecs',
        },
        {
            title: '单位',
            dataIndex: 'goodsunit',
            key: 'goodsunit',
        },
        {
            title: '出库时间',
            dataIndex: 'time',
        },
        {
            title: '出库数量',
            dataIndex: 'num',
        },
        {
            title: '操作员',
            dataIndex: 'operator',
        },
    ];


    useEffect(()=>{
        // setDataSource(data)
        goodsGoInLook()
    },[])

    const goodsGoInLook=async ()=>{
        const result=await goodsOutLook()
        const {msg,status,data}=result
        console.log(result)
        if(status===0){
            message.success(msg,2)
            setDataSource(data)
        }else{
            message.error(msg,2)
        }
    }

    const onSearch =async (value) => {
        const result =await goodsOutInQuery(value)
        console.log(result)
        const {msg,status,data}=result
        if(status===0){
            message.success(msg,2)
            setDataSource(data)
        }else{
            message.error(msg,2)
        }
    }

    const title = (<Form.Item label='按商品搜索：' style={{ marginBottom: 0 }}><Search placeholder="请输入商品" onSearch={onSearch} style={{ width: 200 }} /></Form.Item>)

    return (
        <Card size="small" title={title} style={{ width: '100%', height: '100%' }}>
            <Table
                columns={columns}
                dataSource={dataSource}
                scroll={{ y: 'calc(100vh - 310px)' }}
                size="middle"
            />
        </Card>
    )

}

export default GoodsGoOut