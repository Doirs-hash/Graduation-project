//弹窗添加商品所需原料
import React, { useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, InputNumber, Select } from 'antd';
import PubSub from 'pubsub-js';
import { goodsListLook } from '../../../../api'

const { Option } = Select;

const AddMessage = ({ onGetMessage }) => {
  
  const [dataSource, setDataSource] = useState([]);
  const [OPTIONS, setOPTIONS] = useState([])

  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      width: '30%',
      render: (checked, record, index) => (
        <Select
          showSearch
          placeholder="选择商品"
          style={{ width: '160px' }}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          value={record?.name}
          // value={selectedItems}
          onChange={(value, option) => {
            handleChange('name', value, index, record)
          }
          }
        >
          {
            OPTIONS.map(item => (
              <Select.Option key={item.key} value={item.option} disabled={item.status}>
                {item.option}
              </Select.Option>
            ))
          }
        </Select>
      ),
    },
    {
      title: '数量',
      dataIndex: 'num',
      render: (checked, record, index) => {
        return <InputNumber min={1} value={record?.num} onChange={(value) => {
          // 计算价格
          handleChange('num', value, index);
          changePrice(value, index)
        }} />
      },
    },
    {
      title: '价格(元)',
      dataIndex: 'price',
      render:(checked, record, index) =>{
        return <p>{record?.price}</p>
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="是否删除?" onConfirm={() => handleDelete(record.key, record?.name)}>
            <a>删除</a>
          </Popconfirm>
        ) : null,
    },
  ];


  useEffect(() => {
    onGetMessage(dataSource);
    console.log(dataSource)
  }, [dataSource]);


  useEffect(async () => {
    PubSub.subscribe('clear', () => {
      setDataSource([])
    })
    PubSub.subscribe('display', (msg, data) => {
      setDataSource(data)
      selectGoods(data)
    })
    PubSub.subscribe('selectOption',async (msg, data) => {
      console.log('打开弹窗')
      let result = await goodsListLook()
      let _source = []
      for (let i = 0; i < result.data.length; i++) {//所有option项
        let obj={'option':result.data[i].name,'price':result.data[i].sellingprice,'status':false,'key':result.data[i].key}
        _source.push(obj)
      }
      console.log(_source,result)
      setOPTIONS(_source)
    })
    return () => {
      PubSub.unsubscribe('clear')
      PubSub.unsubscribe('display')
      PubSub.unsubscribe('selectOption')
    }
  }, [])

  //获取option
  const selectGoods = async (data) => {
    let result = await goodsListLook()
    let _source = [],_data=[]
    for (let i = 0; i < result.data.length; i++) {//所有option项
      let obj={'option':result.data[i].name,'price':result.data[i].sellingprice,'status':false,'key':result.data[i].key}
      _source.push(obj)
    }
    for (let i = 0; i < data.length; i++) {//已有的option项
      _data.push(data[i].name)
    }
    _source.map((item)=>{
      if(_data.indexOf(item.option)!==-1){
        return item.status=true
      }
    })
    setOPTIONS(_source)
  }

  //计算价格
  const changePrice = (value, index) => {
    const _source = [...dataSource]
    let price=OPTIONS.filter(item=> {
      if(item.option==_source[index].name){
        return item
      }
    })
    _source[index].price = value * price[0].price
    setDataSource(_source)//页面不更新
    console.log(dataSource)
  }

  // 添加商品
  const handleAdd = () => {
    const _source = [...dataSource];
    const _list = { key: Date.now(), name: '', num: '', price: '' }
    _source.push(_list);
    setDataSource(_source);
  };

  // 编辑商品
  const handleChange = (type, value, index) => {
    const _source = [...dataSource];
    let op=[...OPTIONS]
    if(type=='name'){
      if (_source[index][type] == '') {
        op.map((item)=>{
          if(item.option==value){
            return item.status=true
          }
        })
        setOPTIONS(op)
        
      } else {
        let _agoOption = _source[index][type]
        op.map(item=>{
          if(item.option==_agoOption){
            return item.status=false
          }
          if(item.option==value){
            return item.status=true
          }
        })
        setOPTIONS(op)
      }
    }
    
    _source[index][type] = value
    // _source[index].key = key.key
    let key=OPTIONS.filter(item=> {
      if(item.option==_source[index].name){
        return item
      }
    })
    _source[index].key= key[0].key
    console.log(key[0].key)
    setDataSource(_source);
  }

  //删除商品
  const handleDelete = (key, value) => {
    //value添加到select
    setDataSource(dataSource.filter((item) => item.key !== key));
    let op=[...OPTIONS]
    op.map((item)=>{
      if(item.option==value){
        return item.status=false
      }
    })
    setOPTIONS(op)
  };

  return (
    <div style={{ width: '100%' }}>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 5,
        }}
      >
        +
      </Button>
      <Table
        // components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        style={{ width: '100%' }}
        pagination={{ pageSize: 4, position: ['bottomCenter'] }}
        size="small"
      />
    </div>
  )
}

export default AddMessage;