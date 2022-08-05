import { MailOutlined, AppstoreOutlined, SettingOutlined ,
    ContainerOutlined,SelectOutlined,ImportOutlined,
    InteractionOutlined,FormOutlined,InboxOutlined,
    UserOutlined,BarChartOutlined,LineChartOutlined,PieChartOutlined,
    ContactsOutlined,StockOutlined,UnorderedListOutlined,
    ProjectOutlined
} from '@ant-design/icons';

export const adminUser = [
    {
        title: "订单",
        path: '/order',
        icon: <FormOutlined />,
        children: [
            {
                title: "订货单",
                path: '/order/orderList',
                icon: <ContainerOutlined />,
            }
        ]
    },
    {
        title: "商品",
        path: '/goods',
        icon: <AppstoreOutlined />,
        children: [
            {
                title: "商品列表",
                path: '/goods/goodsList',
                icon: <UnorderedListOutlined />,
            }
        ]
    },
    {
        title:"库存",
        path:'/stock',
        icon:<StockOutlined />,
        children: [
            {
                title: "商品库存",
                path: '/order/goodsStock',
                icon: <InboxOutlined />,
            },
            {
                title: "商品出库记录",
                path: '/goods/goodsExWarehousing',
                icon: <ImportOutlined />,
            },
            {
                title: "商品入库记录",
                path: '/goods/goodsWarehousing',
                icon: <ImportOutlined />,
            },
            {
                title: "生产订单入库",
                path: '/goods/productionGoIn',
                icon: <ImportOutlined />,
            },
            {
                title: "订单出库",
                path: '/order/orderExWarehouse',
                icon: <SelectOutlined />,
            },
        ]
    },
    {
        title:"生产",
        path:'/production',
        icon:<InteractionOutlined />,
        children: [
            {
                title: "待生产订单",
                path: '/production/order',
                icon: <ContainerOutlined />,
            },
            {
                title: "生产商品统计",
                path: '/production/Statistics',
                icon: <ProjectOutlined />,
            },
        ]
    },
    {
        title:'客户',
        path:'/customer',
        icon:<ContactsOutlined />,
    },
    {
        title:"账户",
        path:'/account',
        icon:<UserOutlined />,
    },
    // {
    //     title:"统计表",
    //     path:'charts',
    //     icon:<BarChartOutlined />,
    //     children:[
    //         {
    //             title:"订单统计报表",
    //             path:'/charts/order',
    //             icon:<LineChartOutlined />,
    //         },
    //         {
    //             title:"商品销售报表",
    //             path:'/charts/goods',
    //             icon:<PieChartOutlined />,
    //         },
    //     ]
    // },
]

export const stock=[
    {
        title: "商品库存",
        path: '/order/goodsStock',
        icon: <InboxOutlined />,
    },
    {
        title: "商品入库记录",
        path: '/goods/goodsWarehousing',
        icon: <ImportOutlined />,
    },
    {
        title: "商品出库记录",
        path: '/goods/goodsExWarehousing',
        icon: <ImportOutlined />,
    },
    {
        title: "生产订单入库",
        path: '/goods/productionGoIn',
        icon: <ImportOutlined />,
    },
    {
        title: "订单出库",
        path: '/order/orderExWarehouse',
        icon: <SelectOutlined />,
    },
]

export const production=[
    {
        title: "生产订单",
        path: '/production/order',
        icon: <ContainerOutlined />,
    },
    {
        title: "生产商品统计",
        path: '/production/Statistics',
        icon: <ProjectOutlined />,
    },
]

export const order=[
    {
        title: "订货单",
        path: '/order/orderList',
        icon: <ContainerOutlined />,
    }
]