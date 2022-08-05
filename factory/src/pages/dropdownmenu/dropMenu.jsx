import React, { Component } from 'react'
import { Select, DatePicker, Input} from 'antd';
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

function handleChange(value) {
    console.log(`selected ${value}`);
}

export default class DropMenu extends Component {
    render() {
        return (
            <div>
                <Select defaultValue="all" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="all">全部订单</Option>
                    <Option value="no">未完成订单</Option>
                    <Option value="Pending">待处理订单</Option>
                    <Option value="Finished">已完成订单</Option>
                    <Option value="delete">已作废订单</Option>
                </Select>
                    <span style={{margin:"0 20px"}} >
                        按日期：<RangePicker locale={locale}/>
                    </span>
                <span>
                    客户名称：<Search placeholder="按客户名称搜索" allowClear style={{ width: 240 }} />
                </span>
            </div>

        )
    }
}
