//商品列表弹窗的原料选择输入框

import React from 'react'
import { Input ,Select} from 'antd'

const { Option } = Select;

function onChange(value) {
    console.log(`selected ${value}`);
  }
  
function onSearch(val) {
console.log('search:', val);
}

class Inputs extends React.Component{
    render(){
        return (
            <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        )
    }
}

export default Inputs
