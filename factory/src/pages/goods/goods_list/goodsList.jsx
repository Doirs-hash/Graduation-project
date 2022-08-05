import React, { useState, useEffect, useCallback } from 'react'
import { Table, Card, message, Button, Select, Input } from 'antd';
import PubSub from 'pubsub-js';

import Frame from '../../frame/frame';

import { goodsListLook, goodsListAdd, goodsListChange, goodsListDel, goodsListQuery } from '../../../api'
import { useRef } from 'react';

const { Option } = Select;
const { Search } = Input;

const GoodsList = () => {

  const columns = [
    {
      title: '条码',
      width: 100,
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '名称',
      width: 100,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '规格',
      dataIndex: 'size',
      key: 'size',
      width: 160,
    },
    {
      title: '颜色',
      dataIndex: 'color',
      key: 'color',
      width: 80,
    },
    {
      title: '类别',
      dataIndex: 'classify',
      key: 'classify',
      width: 100,
    },
    {
      title: '单位',
      dataIndex: 'company',
      key: 'company',
      width: 80,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      width: 80,
    },
    {
      title: '安全存量',
      dataIndex: 'safetyStock',
      key: 'safetyStock',
      width: 80,
    },
    {
      title: '销售价（元）',
      dataIndex: 'sellingprice',
      key: 'sellingprice',
      width: 100,
    },
    {
      title: '扩展信息',
      dataIndex: 'extend',
      key: 'extend',
      width: 150
    },
    {
      title: '操作',
      // dataIndex:'operation',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (item) => <div>
        <Button type='link' onClick={() => onClickLook(item)}>修改</Button>
        <Button type='link' onClick={() => onClickDel(item)}>删除</Button>
      </div>,
    },
  ];

  const [dataSource, setDataSource] = useState([])
  const dataRef = useRef();
  dataRef.current = dataSource;

  useEffect(async () => {
    seeGoodsList()
    PubSub.subscribe('addGoods', (msg, data) => {
      addGoodsList(data)
    })
    PubSub.subscribe('changeGoods', (msg, data) => {
      goodsChangeData(data)
      console.log(data)
    })
    return () => {
      PubSub.unsubscribe('addGoods')
      PubSub.unsubscribe('changeGoods')
    }
  }, [])


  const onClickLook = async (item) => {
    PubSub.publish('goodsLook', item)
  }

  const onClickDel = useCallback(async (item) => {
    let result = await goodsListDel(item.key)
    const { msg, status } = result
    if (status === 0) {
      message.success(msg, 1)
      let _source = dataSource.filter(n => n.key !== item.key)
      setDataSource(_source)
    } else {
      message.error(msg, 1)
    }
  }, [dataSource])

  const seeGoodsList = async () => {
    let result = await goodsListLook()
    const { msg, status, data } = result
    if (status === 1) {
      message.error(msg, 1)
    } else {
      setDataSource(data.reverse())
      console.log(result.data, data.reverse());
    }
  }

  const addGoodsList = useCallback(async (data) => {
    let result = await goodsListAdd(data)
    console.log(dataRef.current);
    const { msg, status, dataAdd } = result
    if (status === 0) {
      message.success(msg, 1)
      const _source = [...dataRef.current]
      _source.unshift(dataAdd)
      setDataSource(_source)
    } else {
      message.error(msg, 1)
    }

  }, [dataSource])

  const goodsChangeData = async (datas) => {
    let result = await goodsListChange(datas)
    const { msg, status } = result
    if (status === 0) {
      seeGoodsList()
      message.success(msg, 1)
    } else {
      message.error(msg, 1)

    }
  }

  const onChange = async (value) => {
    console.log(`selected ${value}`);
    if(value.label=='全部') return seeGoodsList()
    const result = await goodsListQuery(value.label, 'classify')
    const { msg, status, data } = result
    if (status === 0) {
      message.success(msg, 2)
      setDataSource(data.reverse())
    } else {
      message.error(msg, 2)
    }
  }

  const onSearch =async (value) => {
    const result = await goodsListQuery(value, 'name')
    const { msg, status, data } = result
    console.log(result)
    if (status === 0) {
      message.success(msg, 2)
      setDataSource(data.reverse())
    } else {
      message.error(msg, 2)
    }
  }

  const title = <div>
    类别：<Select labelInValue={true} placeholder="选择类别" onSelect={onChange} style={{ marginRight: 20 }}>
      <Option value="all">全部</Option>
      <Option value="jack">文具</Option>
      <Option value="lucy">生活用品</Option>
    </Select>

    名称： <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
  </div>

  return (
    <Card size="small" title={title} extra={<Frame />} style={{ width: '100%', height: '100%' }}>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: '100%', y: 'calc(100vh - 310px)' }}
        size="middle"
      />
    </Card>
  )

}

export default GoodsList
