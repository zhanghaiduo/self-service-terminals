<template>
	<view class="index">
		<view class="banner">
			<image src="../../static/images/guanggao.png"></image>
		</view>
		<view class="priceList">
			<view class="priceBox">
				<view class="uni-flex uni-row priceItem">
					<view class="grow1 uni-flex-item">
						<view class="">
							售价
						</view>
					</view>
					<view class="grow1 uni-flex-item">
						获得币数
					</view>
				</view>
				<view v-for="(item,index) in list" class="uni-flex uni-row priceItem itemBtn" :key="index" @tap="goPage('/pages/pay/pay_scan',item)">
					<view class="grow1 uni-flex-item">
						<image v-if="item.showCommend==1" class="hot" src="../../static/images/jian.png" mode=""></image>
						<view class="priceNew">
							{{item.price}}元
						</view>
					</view>
					<view class="grow1 uni-flex-item">
						{{item.coins}}币
					</view>
					<text class="tri_left" v-if="item.coins>item.price">已赠{{item.coins-item.price}}币</text>
				</view>
			</view>
		</view>
		<view class="footerBtn">
			<view class="dj-btn" @tap="goPage('/pages/pay/pay_cash')">
				现金购币
			</view>
			<view class="dj-btn dj-btn2" @tap="goPage('/pages/meal/meal_list')">
				扫码购币
			</view>
		</view>
		<dj-footer></dj-footer>
	</view>
</template>
<script>
	import {
		getPackage
	} from '../../common/api/home/home.js'
	export default {
		data() {
			return {
				list: null,
			}
		},
		onShow() {
			this.fetchData();
		},
		methods: {
			goPage(url, row) {
				uni.navigateTo({
					url: row ?
						`${url}?payMethod=1&packageId=${row.pid}&extraCoins=${row.coins-row.price}&totalCoins=${row.coins}&totalMoney=${row.price*100}&totalMoneyRec=${row.price*100}` :
						url
				});
			},
			fetchData() {
				getPackage({}).then(res => {
					this.$store.state.meal_prices_list = [];//套餐价格列表
					this.$store.state.meal_giveCoins_list = [];//赠币数列表
					res.data[0].detail.forEach(val => {
						this.$store.state.meal_prices_list.push(val.price);
						this.$store.state.meal_giveCoins_list.push(val.coins * 1 - val.price * 1);
					})
					if (res.data[0].detail.length > 6) {
						res.data[0].detail.splice(6)
					}
					this.list = res.data[0].detail;
				});
			}
		},
	}
</script>
