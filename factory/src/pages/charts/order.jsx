import { useEffect, useState } from "react"
import { Line } from '@ant-design/plots';
import { Layout, Row, Col, Card } from 'antd';
import "@ant-design/flowchart/dist/index.css";
const { Header, Footer, Sider, Content } = Layout;
const OrderCharts = () => {
    const data = [
        {
            year: '2018',
            value: 600,
        },
        {
            year: '2019',
            value: 800,
        },
        {
            year: '2020',
            value: 1300,
        },
        {
            year: '2021',
            value: 1800,
        },
        {
            year: '2022',
            value: 1058,
        },
    ];
    const config = {
        data,
        xField: 'year',
        yField: 'value',
        label: {},
        // autoFit: true,
        width: 300,
        height: 300,
        padding: 'auto',
        point: {
            size: 5,
            shape: 'diamond',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2,
            },
        },
        tooltip: {
            showMarkers: false,
        },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [
            {
                type: 'marker-active',
            },
        ],
    };
    const dataM = [
        {
            month: '01',
            value: 50,
        },
        {
            month: '02',
            value: 60,
        },
        {
            month: '03',
            value: 40,
        },
        {
            month: '04',
            value: 78,
        },
        {
            month: '05',
            value: 98,
        },
        {
            month: '06',
            value: 65,
        },
        {
            month: '07',
            value: 45,
        },
        {
            month: '08',
            value: 78,
        },
        {
            month: '09',
            value: 68,
        },
        {
            month: '10',
            value: 90,
        },
        {
            month: '11',
            value: 66,
        },
        {
            month: '12',
            value: 74,
        },
    ];
    const p = '2018~2022订单数量'
    const configM = {
        data: dataM,
        xField: 'month',
        yField: 'value',
        label: { p },
        width: 300,
        height: 300,
        padding: 'auto',
        point: {
            size: 5,
            shape: 'diamond',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2,
            },
        },
        tooltip: {
            showMarkers: false,
        },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [
            {
                type: 'marker-active',
            },
        ],
    };




    return (
        <Card size="small" title='订单统计折线图' style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Row gutter={24} style={{ width: '100%', height: '50%', position: 'absolute', top: '25% ' }}>
                <Col span={12} >
                    <Line {...config} />
                    <br />
                    <p style={{textAlign:'center'}}>2018~2022订单数量</p>
                </Col>
                <Col span={12}>
                    <Line {...configM} />
                    <br />
                    <p style={{textAlign:'center'}}>2021年订单数量</p>
                </Col>
            </Row>
        </Card>

    )

}

export default OrderCharts