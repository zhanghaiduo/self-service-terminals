<template>
	<view class="index">
		<dj-header></dj-header>
		<input v-if="inputShow" focus="true" v-model="saveForm.authCode" @input="onInput" @blur="inputBlur" />
		<view class="content text-center">
			<image class="contentTitle" src="../../static/images/qingsuanzetaocan.png" mode=""></image>
			<view class="contentBox">
				<view class="titleA">
					打开手机付款码
					<br>
					对准扫码口扫码支付
				</view>
				<view class="giveColor margin-t20">
					￥{{saveForm.totalMoney/100}}
				</view>
				<view class="margin-t20">
					<image src="../../static/images/help_scan.gif" style="width:100%;height: 440upx;border-radius: 20upx;"></image>
				</view>
				<view class="moneyText margin-t20">
					不支持找零和退款
				</view>
			</view>
		</view>
		<dj-footer></dj-footer>
	</view>
</template>

<script>
	import {
		getCoinPay
	} from '../../common/api/pay/coinPay.js'
	export default {
		data() {
			return {
				inputShow: true,
				saveForm: {
					authCode: '',
					extraCoins: '',
					orderIndex: '',
					payMethod: '',
					totalCoins: '',
					totalMoney: '',
					totalMoneyRec: '',
					packageId:''
				},
				lastTime: 0,
				nextTime: 0,
				lastCode: 0,
				nextCode: 0,
				code: '',
				val: '',
			}
		},
		// 		watch: {
		// 			newValue(val, oldVal) {
		// 				if (val.length == 18) {
		// 					console.log(val)
		// 				}
		// 			}
		// 		},
		// 		computed: {
		// 			newValue() {
		// 				return this.saveForm.authCode
		// 			}
		// 		},
		onLoad(option) {
			this.saveForm = { ...this.saveForm,
				...option
			}
			console.log(this.saveForm)
		},
		methods: {
			inputBlur() {
				this.inputShow = false;
				setTimeout(() => {
					this.inputShow = true;
				}, 0)
			},
			onInput(e) {
				// this.$store.state.Log.d('zqtest', '扫码内容A：' + e.detail.value);
				console.log(e.detail.value)
				console.log(e.detail.value.length)
				if (e.detail.value.length == 18) {
					this.saveClick(e.detail.value);
					// this.$store.state.Log.d('zqtest', '扫码内容B：' + e.detail.value);
					return;
				}
				// 				this.nextTime = new Date().getTime();
				// 				if (this.lastTime == null) {
				// 					this.code = this.nextCode;
				// 				} else if (this.lastCode != null && this.lastTime != null && (this.nextTime - this.lastTime) > 1000) {
				// 					this.code = ""; //超时清空
				// 				}
				// 				this.lastCode = this.nextCode;
				// 				this.lastTime = this.nextTime;
			},
			saveClick(authCode) {
				this.saveForm.orderIndex = new Date().getTime();
				this.saveForm.authCode = authCode;
				getCoinPay(this.saveForm).then(res => {
					this.saveForm.authCode = ''
					uni.reLaunch({
						url: `/pages/pay/pay_success?coins=${this.saveForm.totalCoins}&orderId=${res.data[0].orderId}`
					})
				}).catch((err) => {
					this.saveForm.authCode = ''
				});
			}
		},
	}
</script>
<style>
	input {
		height:calc(100% - 116upx) ;
		width: 100%;
		position: absolute;
		z-index: 2000;
		/* opacity: 0; */
	}
</style>
