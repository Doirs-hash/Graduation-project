import { useEffect, useState } from "react"
import { Line ,Pie} from '@ant-design/plots';
import { Row, Col, Card } from 'antd';
import "@ant-design/flowchart/dist/index.css";

const GoodsCharts = () => {

    const data = [
        {
            type: '蝴蝶结',
            value: 25888,
        },
        {
            type: '文具盒',
            value: 169975,
        },
        {
            type: '勺子',
            value: 197987,
        },
        {
            type: '商品2',
            value: 13978,
        },
        {
            type: '商品3',
            value: 222222,
        },
        {
            type: '其他',
            value: 8388,
        },
    ];

    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };

    return (
        <Card size="small" title='商品出库统计饼图' style={{ width: '100%', height: '100%' }}>
            <Row gutter={24} style={{ width: '100%', height: '50%'}}>
                <Col span={24}>
                    <Pie {...config} />
                    <p style={{textAlign:'center'}}>2022出库商品占比</p>
                </Col>
                {/* <Col span={12}>
                    <Pie {...config} />
                    <p style={{textAlign:'center'}}>2021年订单数量</p>
                </Col> */}
            </Row>
        </Card>

    )

}

export default GoodsCharts