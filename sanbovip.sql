/*
 Navicat Premium Data Transfer

 Source Server         : supertrade.tv
 Source Server Type    : MariaDB
 Source Server Version : 50568 (5.5.68-MariaDB)
 Source Host           : 51.195.198.179:3306
 Source Schema         : sanbovip

 Target Server Type    : MariaDB
 Target Server Version : 50568 (5.5.68-MariaDB)
 File Encoding         : 65001

 Date: 12/03/2023 12:19:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `u_id` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT '0',
  `win` decimal(20,4) DEFAULT '0.0000',
  `lose` decimal(20,4) DEFAULT '0.0000',
  `balance` decimal(20,4) DEFAULT '0.0000',
  `deposit` int(11) DEFAULT '0',
  `withdrawal` int(11) DEFAULT '0',
  `order_amount` decimal(20,4) DEFAULT '0.0000',
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=505 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for add_money_history
-- ----------------------------
DROP TABLE IF EXISTS `add_money_history`;
CREATE TABLE `add_money_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nick_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT '0',
  `price_USDT` decimal(20,4) DEFAULT '0.0000',
  `price_ETH` decimal(20,4) DEFAULT '0.0000',
  `price_BTC` decimal(20,4) DEFAULT '0.0000',
  `price_VN` decimal(20,4) DEFAULT '0.0000',
  `price_PAYPAL` decimal(20,4) DEFAULT '0.0000',
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for bet_history
-- ----------------------------
DROP TABLE IF EXISTS `bet_history`;
CREATE TABLE `bet_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `id_account` varchar(255) DEFAULT NULL,
  `type_account` int(11) DEFAULT '0',
  `buy_sell` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `amount_win` decimal(20,4) DEFAULT '0.0000',
  `amount_lose` decimal(20,4) DEFAULT '0.0000',
  `amount_bet` decimal(20,4) DEFAULT '0.0000',
  `open` decimal(20,4) DEFAULT '0.0000',
  `close` decimal(20,4) DEFAULT '0.0000',
  `session` int(11) NOT NULL DEFAULT '0',
  `marketing` int(11) DEFAULT '0',
  `status` int(11) DEFAULT '1',
  `created_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=813 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for champions
-- ----------------------------
DROP TABLE IF EXISTS `champions`;
CREATE TABLE `champions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `dateStart` varchar(255) NOT NULL,
  `dateEnd` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `delete_status` int(11) DEFAULT '-1',
  `totalRewards` text,
  `background` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for commission_history
-- ----------------------------
DROP TABLE IF EXISTS `commission_history`;
CREATE TABLE `commission_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `from_upid` varchar(255) DEFAULT NULL,
  `ref_id` varchar(255) DEFAULT NULL,
  `upline_id` varchar(255) DEFAULT NULL,
  `pending_commission` decimal(20,4) DEFAULT '0.0000',
  `personal_trading_volume` decimal(20,4) DEFAULT '0.0000',
  `vip_commission` varchar(20) DEFAULT '0',
  `type` varchar(255) DEFAULT NULL,
  `marketing` int(11) DEFAULT '0',
  `session` int(11) DEFAULT '0',
  `created_at` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1037 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for copy_trade
-- ----------------------------
DROP TABLE IF EXISTS `copy_trade`;
CREATE TABLE `copy_trade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL DEFAULT '',
  `amount` decimal(10,2) DEFAULT '0.00',
  `day_win` decimal(20,4) DEFAULT '0.0000',
  `day_lose` decimal(20,4) DEFAULT '0.0000',
  `experts` varchar(255) DEFAULT NULL,
  `ai` tinyint(1) unsigned zerofill DEFAULT NULL,
  `rate` tinyint(1) unsigned zerofill DEFAULT NULL,
  `run` tinyint(1) unsigned zerofill DEFAULT NULL,
  `acc_type` tinyint(1) unsigned zerofill DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `money_per_day` decimal(20,4) DEFAULT '0.0000' COMMENT 'Tiền trade hằng ngày',
  `created_at` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `updated_at` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for copy_trade_history
-- ----------------------------
DROP TABLE IF EXISTS `copy_trade_history`;
CREATE TABLE `copy_trade_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL COMMENT 'Mã phiên',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'Email',
  `experts` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Tên chuyên gia',
  `acc_type` tinyint(4) DEFAULT NULL COMMENT 'Loại acc',
  `trend` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'buy - sell',
  `open` int(11) DEFAULT NULL COMMENT 'Giá mở',
  `close` int(11) DEFAULT NULL COMMENT 'Giá đóng',
  `value` decimal(20,4) DEFAULT NULL COMMENT 'Tiền vào',
  `sum` decimal(20,4) DEFAULT NULL COMMENT 'Trạng thái',
  `status` int(1) DEFAULT '0' COMMENT 'Tổng tiền',
  `created_at` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Thời gian trade',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3227 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for exchange_history
-- ----------------------------
DROP TABLE IF EXISTS `exchange_history`;
CREATE TABLE `exchange_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `from_e` varchar(255) DEFAULT NULL,
  `to_e` varchar(255) DEFAULT NULL,
  `send` varchar(255) DEFAULT NULL,
  `receive` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `delete_status` int(11) DEFAULT '0',
  `created_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for lucky_draw
-- ----------------------------
DROP TABLE IF EXISTS `lucky_draw`;
CREATE TABLE `lucky_draw` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` text,
  `nickname` text,
  `type` varchar(255) DEFAULT NULL,
  `day` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for notifi
-- ----------------------------
DROP TABLE IF EXISTS `notifi`;
CREATE TABLE `notifi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cu_email` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `views` int(11) DEFAULT '0',
  `created_at` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for telegram
-- ----------------------------
DROP TABLE IF EXISTS `telegram`;
CREATE TABLE `telegram` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `form` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for trade_history
-- ----------------------------
DROP TABLE IF EXISTS `trade_history`;
CREATE TABLE `trade_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `from_u` varchar(255) DEFAULT NULL,
  `to_u` varchar(255) DEFAULT NULL,
  `type_key` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `network` varchar(255) DEFAULT NULL,
  `paypal` decimal(20,4) DEFAULT '0.0000',
  `paypal_order_id` decimal(20,4) DEFAULT '0.0000',
  `pay_fee` decimal(20,4) DEFAULT '0.0000',
  `fee_withdraw` decimal(20,4) DEFAULT '0.0000',
  `currency` varchar(255) DEFAULT NULL,
  `amount` decimal(20,4) DEFAULT '0.0000',
  `real_amount` decimal(20,4) DEFAULT '0.0000',
  `note` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `delete_status` int(11) DEFAULT '0',
  `created_at` varchar(255) DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=472 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `permissions` varchar(255) DEFAULT NULL,
  `last_login` varchar(255) DEFAULT NULL,
  `ref_code` varchar(255) DEFAULT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `upline_id` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `secondary_address` varchar(255) DEFAULT NULL,
  `job_position` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `secondary_phone` varchar(255) DEFAULT NULL,
  `secondary_email` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `skype` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `google_plus` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  `github` varchar(255) DEFAULT NULL,
  `interest` varchar(255) DEFAULT NULL,
  `about` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `personal_quota` varchar(255) DEFAULT NULL,
  `active` int(11) DEFAULT '0',
  `verified` int(11) DEFAULT '0',
  `super_user` int(11) DEFAULT '0',
  `manage_supers` int(11) DEFAULT '0',
  `offer_account` int(11) DEFAULT '0',
  `money_eth` decimal(20,4) DEFAULT '0.0000',
  `money_btc` decimal(20,4) DEFAULT '0.0000',
  `money_usdt` decimal(20,4) DEFAULT '0.0000',
  `money_vn` decimal(20,4) DEFAULT '0.0000',
  `money_paypal` decimal(20,4) DEFAULT '0.0000',
  `money_deposit` decimal(20,4) DEFAULT '0.0000',
  `money_withdrawal` decimal(20,4) DEFAULT '0.0000',
  `super_account` int(11) DEFAULT '0',
  `wallet_his` varchar(255) DEFAULT NULL,
  `wallet_order_offer` decimal(20,2) DEFAULT NULL,
  `sponsor` varchar(255) DEFAULT NULL,
  `money_wallet_his` decimal(20,4) DEFAULT '0.0000',
  `vip_user` int(11) DEFAULT '0',
  `level_vip` int(11) DEFAULT '0',
  `id_front` varchar(255) DEFAULT NULL,
  `id_back` varchar(255) DEFAULT NULL,
  `pending_commission` int(11) DEFAULT '0',
  `commission_vip` int(11) DEFAULT '0',
  `commission_update` varchar(255) DEFAULT NULL,
  `address_BTC` varchar(255) DEFAULT NULL,
  `address_ETH` varchar(255) DEFAULT NULL,
  `address_USDT` varchar(255) DEFAULT NULL,
  `privateKey_BTC` varchar(255) DEFAULT NULL,
  `privateKey_ETH` varchar(255) DEFAULT NULL,
  `privateKey_USDT` varchar(255) DEFAULT NULL,
  `wif_BTC` varchar(255) DEFAULT NULL,
  `completed_profile` int(11) DEFAULT '0',
  `active_2fa` int(11) DEFAULT '0',
  `secret_2fa` varchar(255) DEFAULT NULL,
  `code_secure` varchar(255) DEFAULT NULL,
  `pricePlay` decimal(20,4) DEFAULT '0.0000',
  `priceWin` decimal(20,4) DEFAULT '0.0000',
  `priceLose` decimal(20,4) DEFAULT '0.0000',
  `marketing` int(11) DEFAULT '0',
  `so_cmnd` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=557 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
