const express=require('express')
const app=express()
const orderRouter=require('./server/orderList')
const goodsRouder=require('./server/goodsList')
const productRouter=require('./server/production')
const stockProductInRouter=require('./server/goodsGoIn')
const goodsGoOutRouter=require('./server/goodsGoOut')
const customerRouter=require('./server/customer')
const accountRouter=require('./server/account')
const userRouter=require('./server/signIn')

app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', ['mytoken','Content-Type']);
	next();
});



app.use('/orderList',orderRouter)

app.use('/goodsList',goodsRouder)

app.use('/production',productRouter)

app.use('/stock',stockProductInRouter)

app.use('/stock/goout/',goodsGoOutRouter)

app.use('/customer',customerRouter)

app.use('/account',accountRouter)

app.use('/user',userRouter)

app.use(express.json({limit: '50mb'}))

app.use(express.urlencoded({
	limit: '50mb',
	extended: true,
  }))

app.listen(5000,function(){
    console.log(`服务器已启动`)
})