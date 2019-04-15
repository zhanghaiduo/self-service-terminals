<template>
	<view class="index">
		<dj-header></dj-header>
		<view class="content text-center">
			<image class="contentTitle" src="../../static/images/zhifuchenggong.png" mode=""></image>
			<view class="contentBox">
				<view class="successContent">
					<view class="margin-t20">
						<image class="gou" src="../../static/images/chenggong.png"></image>
					</view>
					<view class="titleA">
						请取走您的币
					</view>
					<view class="giveColor margin-t20">
						{{coins}}币
					</view>
				</view>
			</view>
		</view>
		<dj-model ref="djModel" confirmText="点击出币" @onConfirm="onConfirm">
			<view class="giveColor margin-t100">
				币不足，请联系工作人员
			</view>
			<view class="moneyText margin-t30">
				联系电话：138xxxx8888
			</view>
			<view class="moneyText  margin-t30">
				已出{{alreadyOut}}币，未出{{coins-alreadyOut}}币
			</view>
		</dj-model>
		<view class="dj-btn" @tap="goPage('/pages/home/home')">
			回到首页
		</view>
	</view>
</template>

<script>
	import {
		getCoinReport
	} from '../../common/api/pay/pay_success.js'
	export default {
		data() {
			return {
				alreadyOut: 0,
				coins: '',
				saveForm: {
					coins: '',
					orderId: '',
					type:false
				}
			}
		},
		onLoad(option) {
			this.saveForm.orderId = option.orderId;
			this.coins = option.coins * 1
			this.outCoin(this.coins)
		},
		methods: {
			onConfirm() {
				this.resetCoin();
			},
			resetCoin() {
				try {
					this.$store.dispatch('useAndroidClass', {
						name: 'resetCoinDevice'
					}).then((res) => {
						setTimeout(() => {
							this.outCoin(this.coins - this.alreadyOut)
						}, 500)
					}).catch((err) => {
						this.$store.state.Log.d(err)
					})
				} catch (e) {
					this.$store.state.Log.d('zqtest', 'calerr。。。。。。' + e)
				}

			},
			outCoin(coinsNum) {
				try {
					this.$store.dispatch('useAndroidClass', {
						name: 'startOutCoin',
						data: coinsNum
					}).then((res) => {
						this.saveForm.type=true;
						this.getSave(coinsNum);
						this.$store.state.Log.d('zqtest', '出币。。。。。。' + res);
						this.$refs.djModel.showModal = false;
					}).catch((res) => {		
						this.saveForm.type=false;
						this.getSave(res.coin * 1);
						this.alreadyOut += res.coin * 1;
						this.$refs.djModel.showModal = true;
						this.$store.state.Log.d('zqtest', '出币' + res)
					})
				} catch (e) {
					this.$store.state.Log.d('zqtest', 'calerr。。。。。。' + e)
				}
			},
			getSave(coinsNum) {
				this.saveForm.coins = coinsNum;
				getCoinReport(this.saveForm).then(res => {
					this.$store.state.Log.d('zqtest', '上报了' + coinsNum + '个币');
				}).catch((err) => {
					this.$store.state.Log.d('zqtest', '上报失败' + JSON.stringify(err))
				});
			},
			goPage(url) {
				uni.reLaunch({
					url: url
				})
			},
		}
	}
</script>
<style>
	.successContent {
		background: url('~@/static/images/bling.png');
		background-size: 100% 100%;
		height: 404upx;
		width: 334upx;
		margin: 80upx auto;
		padding: 20upx 0;
	}
</style>
