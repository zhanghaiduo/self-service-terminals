<template>
	<view class="index">
		<dj-header v-if="!saveForm.showMoney"></dj-header>
		<view class="content text-center">
			<image class="contentTitle" src="../../static/images/qingfangruzhibi.png" mode=""></image>
			<view class="contentBox">
				<view v-if="saveForm.showMoney">
					<view class="titleA margin-t30">
						请继续放入纸币或点击出币
					</view>
					<view class="moneyText margin-t20">
						不支持找零和退款
					</view>
					<view class="zhibiContent">
						<view class="zhibiBox">
							<view class="moneyText">已收现金(元)</view>
							<view class="giveColor margin-t20">{{saveForm.showMoney}}</view>
						</view>
						<view class="zhibiBox">
							<view class="moneyText">获得币数(币)</view>
							<view class="giveColor margin-t20">{{saveForm.totalCoins}}</view>
							<view class="give">
								已赠{{saveForm.extraCoins}}币
							</view>
						</view>
					</view>
					<view class="give margin-t20 bgNone">
						已为您选择最优套餐组合，享受最大优惠！
					</view>
				</view>
				<view v-else>
					<view class="margin-t20">
						<image src="../../static/images/help_cash.gif" style="width:100%;height: 600upx;border-radius: 20upx;"></image>
					</view>
					<view class="moneyText margin-t20">
						不支持找零和退款
					</view>
				</view>
			</view>
		</view>
		<dj-model ref="djModel" :confirmText="confirmText" :title="showReturn?'纸币已退回，请取走您的纸币':'收到纸币(元)'" @onConfirm="onConfirm">
			<view class="giveColor" v-if="!showReturn">{{newMoney}}</view>
		</dj-model>
		<view v-if="saveForm.showMoney" class="dj-btn" @tap="saveClick">
			点击出币
		</view>
	</view>
</template>

<script>
	import {
		getCoinPay
	} from '../../common/api/pay/coinPay.js'
	import {
		giveCoin,
		countDown
	} from '../../utils/index.js';
	export default {
		data() {
			return {
				showReturn: false,
				confirmText: '确定（5秒）',
				getMoney: '666',
				newMoney: 0,
				saveForm: {
					showMoney: '', //前端展示真实钱
					extraCoins: '',
					orderIndex: '',
					payMethod: 0,
					totalCoins: '',
					totalMoney: '',
					totalMoneyRec: '',
					packageId: 0,
					callBackData: false
				},
			}
		},
		computed: {
			btnTime() {
				return this.$store.state.btnTime
			}
		},
		watch: {
			btnTime(val) {
				this.confirmText = `确定（${val}）`
				console.log(val)
			}
		},
		onLoad() {
			this.initCallBack();
		},
		methods: {
			onConfirm() {
				if (this.showReturn) {
					this.showReturn = false;
					this.$refs.djModel.showModal = false;
					return;
				}
				this.$refs.djModel.showModal = false;
				setTimeout(() => {
					this.$store.dispatch('useAndroidClass', {
						name: 'receiveCash'
					}).then((res) => {
						try {
							countDown('clear');
							this.$store.state.Log.d('zqtest', 'then传回。。。。。。' + res);
							this.saveForm.showMoney = this.saveForm.showMoney * 1 + this.newMoney * 1;
							this.saveForm.totalMoney = this.saveForm.showMoney * 100;
							this.saveForm.totalMoneyRec = this.saveForm.showMoney * 100;
							this.saveForm.extraCoins = giveCoin(this.saveForm.showMoney, this.$store.state.meal_prices_list, this.$store
								.state
								.meal_giveCoins_list);
							this.saveForm.totalCoins = this.saveForm.extraCoins * 1 + this.saveForm.showMoney * 1;
							this.newMoney = 0;
							this.$refs.djModel.showModal = false;
							this.initCallBack();
						} catch (e) {
							this.$store.state.Log.d('zqtest', 'catch传回。。。。。。' + e)
						}
					}).catch((e) => {
						// this.$refs.djModel.showModal = true;
					})
				}, 100)
			},
			initCallBack() {
				this.callBackData = false;
				this.$store.state.Log.d('zqtest', 'cashstart````````````````````````');
				this.$store.state.DeviceAbility.setAbilityCallback(plus.android.implements("com.i3020.nativable.AbilityCallback", {
					"msgcallback": (res) => {
						try {
							this.$store.state.Log.d('zqtest', 'callback默认````````````````````````' + res)
							this.$store.state.Log.d('zqtest', '第一次现金````````````````````````' + JSON.parse(res).cash);
							if (!this.callBackData) {
								this.$store.state.Log.d('zqtest', 'callBackData2```````````````````````');
								this.callBackData = JSON.parse(res);
								this.newMoney = JSON.parse(res).cash;
								this.$refs.djModel.showModal = true;
								if (!this.showReturn) {
									countDown(3).then(() => {
										this.callBackData = false;
										this.showReturnModal();
									})
								}
							}
						} catch (e) {
							this.$store.state.Log.d('zqtest', 'calerr。。。。。。' + e)
						}
					}
				}));
			},
			showReturnModal() {
				this.showReturn = true;
				countDown(3).then(() => {
					this.showReturn = false;
					this.$refs.djModel.showModal = false;
					this.initCallBack();
				})
			},
			saveClick(authCode) {
				this.saveForm.orderIndex = new Date().getTime();
				getCoinPay(this.saveForm).then(res => {
					uni.reLaunch({
						url: `/pages/pay/pay_success?coins=${this.saveForm.totalCoins}&orderId=${res.data[0].orderId}`
					})
				});
			},

			showModal() {
				this.$refs.djModel.showModal = true;
				// this.onConfirm();
			},
		},
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.zhibiContent {
		height: 336upx;
		width: 454upx;
		background: url('~@/static/images/zhibi.png');
		background-size: 100% 100%;
		margin-top: 50upx;
		position: relative;

		.give {
			bottom: 66upx;
			right: 70upx;
		}

		.zhibiBox {
			padding-top: 40upx;
		}
	}

	.bgNone {
		background: none
	}
</style>
