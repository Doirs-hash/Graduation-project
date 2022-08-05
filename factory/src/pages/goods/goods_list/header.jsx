import React, { Component } from 'react'
import { Select, Input, Space } from 'antd';

const { Option } = Select;
const { Search } = Input;

function onChange(value) {
    console.log(`selected ${value}`);
}

function onSearch(val) {
    console.log('search:', val);
}

export default class Header extends Component {
    render() {
        return (
            <div>
                类别：<Select
                    showSearch
                    placeholder="选择类别"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="jack">布料</Option>
                    <Option value="lucy">饰品</Option>
                    <Option value="tom">配件</Option>
                </Select>
                <span style={{margin:'0 20px'}}>
                 条码： <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
                </span>
                 名称： <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
            </div>
        )
    }
}
