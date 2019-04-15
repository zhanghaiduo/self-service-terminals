<template>
	<view class="index">
		<dj-header></dj-header>
		<view class="content text-center">
			<image class="contentTitle" src="../../static/images/qingsuanzetaocan.png" mode=""></image>
			<view class="uni-flex uni-row  flex-center contentBox">
				<view class="grow1 uni-flex-item" v-for="(item,index) in list" :key="index">
					<view class="mealItem" :class="{ 'mealCheck': item.is_check}" @touchstart="itemClick(item,index)">
						<image v-if="item.showCommend==1" class="hot" src="../../static/images/jian.png"></image>
						<text class="give" v-if="item.coins>item.price">已赠{{item.coins-item.price}}币</text>
						<view class="coinText">
							{{item.coins}}币
						</view>
						<view class="moneyText">
							{{item.price}}元
						</view>
					</view>
				</view>

				<view class="grow1 uni-flex-item">
					<view class="mealItem coinCustomItem" @tap="goPage('/pages/meal/meal_custom')">
						<view class="coinText">
							自定金额
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footerBtn">
			<view class="dj-btn" @tap="goPage('/pages/pay/pay_scan',1)">
				确认
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
		onLoad() {
			this.fetchData();
		},
		methods: {
			itemClick(row, index) {
				this.list.forEach(val => val.is_check = false);
				row.is_check = true;
			},
			goPage(url, type) {
				let check_item = this.list.find(item => item.is_check);
				if (type) {
					if (!check_item) return;
				}
				uni.navigateTo({
					url: type ?
						`${url}?payMethod=1&packageId=${check_item.pid}&extraCoins=${check_item.coins-check_item.price}&totalCoins=${check_item.coins}&totalMoney=${check_item.price*100}&totalMoneyRec=${check_item.price*100}` :
						url
				});
			},
			fetchData() {
				getPackage({}).then(res => {
					if (res.data[0].detail.length > 7) {
						res.data[0].detail.splice(7)
					}
					res.data[0].detail.forEach(val => {
						val.is_check = false;
					})
					this.list = res.data[0].detail;
				});
			}
		},
	}
</script>
