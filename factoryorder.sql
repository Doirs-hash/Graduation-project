/*
Navicat MySQL Data Transfer

Source Server         : MySQL1
Source Server Version : 50540
Source Host           : localhost:3306
Source Database       : factoryorder

Target Server Type    : MYSQL
Target Server Version : 50540
File Encoding         : 65001

Date: 2022-08-05 16:47:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES ('1', '岳阳冠凯技术有限公司', '0021889655', '湖南省岳阳市');
INSERT INTO `customer` VALUES ('2', '常德德仕贸易', '597846231', '湖南省常德市武陵区');
INSERT INTO `customer` VALUES ('3', '湖南阳鑫有限公司', '18444554570', '湖南省长沙市雨花区');
INSERT INTO `customer` VALUES ('4', '湖南隆丰有限公司', '18397321570', '湖南省长沙市天心区');
INSERT INTO `customer` VALUES ('5', '湖南永业技术', '12987654820', '湖南省郴州市');
INSERT INTO `customer` VALUES ('6', '湖南兴隆科技', '7895235205', '湖南省郴州市');
INSERT INTO `customer` VALUES ('7', '湖南娜美科技', '7895589223', '湖南省郴州市');
INSERT INTO `customer` VALUES ('8', '张星星', '18397526897', '湖南省郴州市');
INSERT INTO `customer` VALUES ('9', '张鑫影', '7895235205', '湖南省长沙市');
INSERT INTO `customer` VALUES ('10', '匡沅洪', '12987654820', '湖南省郴州市');

-- ----------------------------
-- Table structure for goodscheckin
-- ----------------------------
DROP TABLE IF EXISTS `goodscheckin`;
CREATE TABLE `goodscheckin` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `goodsid` varchar(255) DEFAULT NULL,
  `goodsname` varchar(255) DEFAULT NULL,
  `goodsspecs` varchar(255) DEFAULT NULL,
  `goodsunit` varchar(255) DEFAULT NULL,
  `num` int(10) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `operator` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodscheckin
-- ----------------------------
INSERT INTO `goodscheckin` VALUES ('1', '2003591', '手机支架', '8cm*25cm', '个', '300', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('2', '2003592', '水壶', '20cm*20cm*25cm', '个', '100', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('3', '2003593', '勺子', '3cm*15cm', '个', '100', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('4', '2003602', '铅笔', '10cm*2cm', '支', '100', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('5', '2003617', '蝴蝶结', '100cm*12cm', '个', '200', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('6', '2003591', '手机支架', '8cm*25cm', '个', '300', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('7', '2003592', '水壶', '20cm*20cm*25cm', '个', '100', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('8', '2003593', '勺子', '3cm*15cm', '个', '100', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('9', '2003602', '铅笔', '10cm*2cm', '支', '100', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('10', '2003617', '蝴蝶结', '100cm*12cm', '个', '200', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('11', '2003591', '手机支架', '8cm*25cm', '个', '300', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('12', '2003592', '水壶', '20cm*20cm*25cm', '个', '100', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('13', '2003593', '勺子', '3cm*15cm', '个', '100', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('14', '2003602', '铅笔', '10cm*2cm', '支', '100', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('15', '2003617', '蝴蝶结', '100cm*12cm', '个', '200', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('16', '2003591', '手机支架', '8cm*25cm', '个', '300', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('17', '2003592', '水壶', '20cm*20cm*25cm', '个', '100', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('18', '2003593', '勺子', '3cm*15cm', '个', '100', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('19', '2003602', '铅笔', '10cm*2cm', '支', '100', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('20', '2003617', '蝴蝶结', '100cm*12cm', '个', '200', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('21', '2003591', '手机支架', '8cm*25cm', '个', '300', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('22', '2003592', '水壶', '20cm*20cm*25cm', '个', '100', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('23', '2003593', '勺子', '3cm*15cm', '个', '100', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('24', '2003602', '铅笔', '10cm*2cm', '支', '100', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('25', '2003617', '蝴蝶结', '100cm*12cm', '个', '200', '2022-05-08 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('26', '2003595', '文具盒', '20cm*12cm', '个', '80', '2022-05-09 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('27', '2003617', '蝴蝶结', '100cm*12cm', '个', '50', '2022-05-09 00:00:00', '入库员一');
INSERT INTO `goodscheckin` VALUES ('28', '2003591', '手机支架', '8cm*25cm', '个', '300', '2022-05-11 00:00:00', '李一');
INSERT INTO `goodscheckin` VALUES ('29', '2003593', '勺子', '3cm*15cm', '个', '258', '2022-05-11 00:00:00', '李一');
INSERT INTO `goodscheckin` VALUES ('30', '2003595', '文具盒', '20cm*12cm', '个', '100', '2022-05-11 00:00:00', '李一');
INSERT INTO `goodscheckin` VALUES ('31', '2003602', '铅笔', '10cm*2cm', '支', '200', '2022-05-11 00:00:00', '李一');
INSERT INTO `goodscheckin` VALUES ('32', '2003617', '蝴蝶结', '100cm*12cm', '个', '200', '2022-05-11 00:00:00', '李一');

-- ----------------------------
-- Table structure for goodscheckout
-- ----------------------------
DROP TABLE IF EXISTS `goodscheckout`;
CREATE TABLE `goodscheckout` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `goodsid` varchar(255) DEFAULT NULL,
  `goodsname` varchar(255) DEFAULT NULL,
  `goodsspecs` varchar(255) DEFAULT NULL,
  `goodsunit` varchar(255) DEFAULT NULL,
  `num` int(10) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `operator` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodscheckout
-- ----------------------------
INSERT INTO `goodscheckout` VALUES ('1', '2003602', '铅笔', '10cm*2cm', '支', '100', '2022-05-08 00:00:00', '入库员003');
INSERT INTO `goodscheckout` VALUES ('2', '2003593', '勺子', '3cm*15cm', '个', '100', '2022-05-08 00:00:00', '入库员003');
INSERT INTO `goodscheckout` VALUES ('3', '2003592', '水壶', '20cm*20cm*25cm', '个', '100', '2022-05-08 00:00:00', '入库员003');
INSERT INTO `goodscheckout` VALUES ('4', '2003593', '勺子', '3cm*15cm', '个', '258', '2022-05-08 00:00:00', '入库员003');
INSERT INTO `goodscheckout` VALUES ('5', '2003591', '手机支架', '8cm*25cm', '个', '300', '2022-05-08 00:00:00', '入库员003');
INSERT INTO `goodscheckout` VALUES ('6', '2003617', '蝴蝶结', '100cm*12cm', '个', '200', '2022-05-08 00:00:00', '入库员003');
INSERT INTO `goodscheckout` VALUES ('7', '2003617', '蝴蝶结', '100cm*12cm', '个', '50', '2022-05-12 00:00:00', '李一');
INSERT INTO `goodscheckout` VALUES ('8', '2003595', '文具盒', '20cm*12cm', '个', '80', '2022-05-12 00:00:00', '李一');

-- ----------------------------
-- Table structure for goodslist
-- ----------------------------
DROP TABLE IF EXISTS `goodslist`;
CREATE TABLE `goodslist` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT '' COMMENT '商品名称',
  `size` varchar(255) CHARACTER SET gbk DEFAULT NULL COMMENT '规格',
  `color` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '颜色',
  `classify` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '类别',
  `company` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '单位',
  `stock` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '库存',
  `sellingprice` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '销售价',
  `extend` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '扩展信息',
  `safetyStock` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '安全存量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2003658 DEFAULT CHARSET=latin1 COMMENT='商品名称';

-- ----------------------------
-- Records of goodslist
-- ----------------------------
INSERT INTO `goodslist` VALUES ('2003590', '水杯', '8cm*8cm*15cm', '白色', '生活用品', '支', '498', '20', '', '100');
INSERT INTO `goodslist` VALUES ('2003591', '手机支架', '8cm*25cm', '银色', '生活用品', '个', '1656', '22', '', '100');
INSERT INTO `goodslist` VALUES ('2003592', '水壶', '20cm*20cm*25cm', '白色', '生活用品', '个', '557', '35', '', '50');
INSERT INTO `goodslist` VALUES ('2003593', '勺子', '3cm*15cm', '银色', '生活用品', '个', '458', '8', '', '50');
INSERT INTO `goodslist` VALUES ('2003595', '文具盒', '20cm*12cm', '蓝色', '文具', '个', '200', '18', null, '100');
INSERT INTO `goodslist` VALUES ('2003602', '铅笔', '10cm*2cm', '红色', '文具', '支', '600', '3', null, '100');
INSERT INTO `goodslist` VALUES ('2003617', '蝴蝶结', '100cm*12cm', '红色', '文具', '个', '1100', '18', null, '55');
INSERT INTO `goodslist` VALUES ('2003657', '钢笔', '2cm*2cm*10cm', '红色', '文具', '支', '100', '18', null, '100');

-- ----------------------------
-- Table structure for orderlist
-- ----------------------------
DROP TABLE IF EXISTS `orderlist`;
CREATE TABLE `orderlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `xdtime` date DEFAULT NULL,
  `customer` varchar(255) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `deliver` varchar(255) DEFAULT NULL,
  `people` varchar(255) DEFAULT NULL,
  `cm` varchar(255) DEFAULT NULL,
  `orderStates` varchar(255) DEFAULT NULL,
  `jhtime` date DEFAULT NULL,
  `goodslist` varchar(1024) DEFAULT NULL,
  `cktime` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1100313 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orderlist
-- ----------------------------
INSERT INTO `orderlist` VALUES ('1100300', '2022-05-03', '湖南永乐技术', '9000', '', '张三', '已支付/微信支付', '待入库', '2022-06-25', '2003657,钢笔,200,3600,2003617,蝴蝶结,300,5400,', null);
INSERT INTO `orderlist` VALUES ('1100301', '2022-05-12', '岳阳正泰有限公司', '2340', '', '李四', '已支付/微信支付', '已完成', '2022-07-10', '2003617,蝴蝶结,50,900,2003595,文具盒,80,1440,', null);
INSERT INTO `orderlist` VALUES ('1100302', '2022-04-26', '	湖南兴隆正业', '4600', '', '王五', '已支付/支付宝支付', '待入库', '2022-06-05', '2003602,铅笔,100,300,2003593,勺子,100,800,2003592,水壶,100,3500,', null);
INSERT INTO `orderlist` VALUES ('1100303', '2022-05-19', '长沙一二三玩具', '12264', '', '李四', '未支付', '待出库', '2022-07-21', '2003593,勺子,258,2064,2003591,手机支架,300,6600,2003617,蝴蝶结,200,3600,', null);
INSERT INTO `orderlist` VALUES ('1100304', '2022-04-26', '张晓霞', '4800', '', '张三', '已支付/微信支付', '待出库', '2022-05-28', '2003595,文具盒,100,1800,2003602,铅笔,200,600,2003593,勺子,300,2400,', null);
INSERT INTO `orderlist` VALUES ('1100305', '2022-05-10', '李新一', '7725', '', '张三', '已支付/微信支付', '待入库', '2022-07-02', '2003595,文具盒,158,2844,2003602,铅笔,199,597,2003657,钢笔,238,4284,', null);
INSERT INTO `orderlist` VALUES ('1100306', '2022-05-29', '张尔', '14978', '', '张三', '已支付/微信支付', '生产中', '2022-07-22', '2003657,钢笔,123,2214,2003593,勺子,123,984,2003595,文具盒,234,4212,2003591,手机支架,344,7568,', null);
INSERT INTO `orderlist` VALUES ('1100307', '2022-05-20', '李依依', '9740', '', '李四', '已支付/微信支付', '待入库', '2022-08-19', '2003590,水杯,200,4000,2003593,勺子,200,1600,2003617,蝴蝶结,230,4140,', null);
INSERT INTO `orderlist` VALUES ('1100308', '2022-05-19', '张兮兮', '7800', null, '李一', '已支付/微信支付', '生产中', '2022-07-30', '2003657,钢笔,100,1800,2003595,文具盒,150,2700,2003591,手机支架,150,3300,', null);
INSERT INTO `orderlist` VALUES ('1100309', '2022-05-11', '王莉莉', '19800', null, '李一', '已支付/支付宝支付', '生产中', '2022-07-10', '2003657,钢笔,100,1800,2003595,文具盒,1000,18000,', null);
INSERT INTO `orderlist` VALUES ('1100310', '2022-05-14', '李海红', '6800', null, '李一', '已支付/微信支付', '生产中', '2022-07-10', '2003602,铅笔,100,300,2003591,手机支架,100,2200,2003593,勺子,100,800,2003592,水壶,100,3500,', null);
INSERT INTO `orderlist` VALUES ('1100311', '2022-05-04', '张毅', '6300', null, '李一', '已支付/微信支付', '待生产', '2022-06-25', '2003617,蝴蝶结,150,2700,2003657,钢笔,200,3600,', null);
INSERT INTO `orderlist` VALUES ('1100312', '2022-05-19', '李金', '6105', null, '李一', '已支付/微信支付', '待生产', '2022-06-18', '2003617,蝴蝶结,100,1800,2003592,水壶,123,4305,', null);

-- ----------------------------
-- Table structure for production
-- ----------------------------
DROP TABLE IF EXISTS `production`;
CREATE TABLE `production` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `orderstatus` varchar(255) DEFAULT NULL,
  `goodslist` varchar(1024) DEFAULT NULL,
  `creattime` date DEFAULT NULL,
  `finishtime` date DEFAULT NULL,
  `operator` varchar(255) DEFAULT NULL,
  `member` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of production
-- ----------------------------
INSERT INTO `production` VALUES ('6', '待出库', '2003591,手机支架,300,2003592,水壶,100,2003593,勺子,100,2003602,铅笔,100,2003617,蝴蝶结,200,', '2022-05-08', '2022-05-08', '张三', '1100303,1100302,');
INSERT INTO `production` VALUES ('7', '待出库', '2003595,文具盒,80,2003617,蝴蝶结,50,', '2022-05-09', '2022-05-09', '张三', '1100301,');
INSERT INTO `production` VALUES ('8', '待出库', '2003591,手机支架,300,2003593,勺子,258,2003595,文具盒,100,2003602,铅笔,200,2003617,蝴蝶结,200,', '2022-05-11', '2022-05-11', '张三', '1100304,1100303,');
INSERT INTO `production` VALUES ('9', '待入库', '2003592,水壶,100,2003593,勺子,100,2003602,铅笔,100,', '2022-05-12', '2022-05-12', '张三', '1100302,');
INSERT INTO `production` VALUES ('10', '待入库', '2003590,水杯,200,2003593,勺子,200,2003617,蝴蝶结,230,', '2022-05-12', '2022-05-12', '张三', '1100307,');
INSERT INTO `production` VALUES ('11', '生产中', '2003591,手机支架,344,2003593,勺子,123,2003595,文具盒,234,2003657,钢笔,123,', '2022-05-12', null, '张三', '1100306,');
INSERT INTO `production` VALUES ('12', '待入库', '2003595,文具盒,158,2003602,铅笔,199,2003617,蝴蝶结,300,2003657,钢笔,200,', '2022-05-14', '2022-05-14', '张三', '1100305,1100300,');
INSERT INTO `production` VALUES ('13', '生产中', '2003595,文具盒,1000,2003657,钢笔,100,', '2022-05-14', null, '张三', '1100309,');
INSERT INTO `production` VALUES ('14', '生产中', '2003591,手机支架,150,2003592,水壶,100,2003593,勺子,100,2003595,文具盒,150,2003602,铅笔,100,2003657,钢笔,100,', '2022-05-14', null, '张三', '1100310,1100308,');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  `account` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '仓管员', '1832472937', '123456', 'Lucy', '19364822003');
INSERT INTO `user` VALUES ('2', '报单员', '002255896', '123456', 'Jack', '19264822003');
INSERT INTO `user` VALUES ('3', '生产员', '002255897', '123456', 'Lily', '19364822003');
INSERT INTO `user` VALUES ('4', '管理员', '18397321570', '123456', '李一', '18397321570');
INSERT INTO `user` VALUES ('7', '报单员', '0088', '123698', '王五', '7895589223');
INSERT INTO `user` VALUES ('10', '报单员', '008', '123698', '匡沅洪', '7895235205');
