<template>
	<view class="index">
		<dj-header></dj-header>
		<view class="content text-center">
			<image class="contentTitle" src="../../static/images/qingsuanzetaocan.png" mode=""></image>
			<view class="contentBox">
				<view class="titleA">
					自定金额也可享受套餐优惠
				</view>
				<view class="textA margin-t30 margin-b30">
					不支持找零和退款
				</view>
				<view class="numContent">
					<view class="numBox">
						<view class="numInput ">{{value}}
							<view class="cursor" :style="{visibility: cursor ? 'visible' : 'hidden'}"></view>
							<view class="totalCoin" v-if="coins*1>0">
								<text class="moneyText">获得 </text><text class="giveColor"> {{coins}}币</text>
							</view>
							<text class="give" v-if="coins*1- value*1>0">已赠{{coins*1- value*1}}币</text>
						</view>
						<view class="" v-for="(item,index) in key_list" :key="index">
							<view class="uni-flex uni-row numKey">
								<view v-for="(item2,index2) in item" :key="index2+100" :style="{background: item2.is_clicked ? '#753f00' : 'none'}"
								 class="grow1" @touchend="keyTouchEnd(item2)" @touchcancel="keyTouchEnd(item2)" @touchstart="keyTouch(item2)">{{item2.key}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="dj-btn" @tap="goPage('/pages/pay/pay_scan')">
			确认
		</view>
		<dj-footer></dj-footer>
	</view>
</template>

<script>
	import {
		giveCoin
	} from '../../utils/index.js';
	export default {
		data() {
			return {
				key_list: [
					[{
						key: '1',
						is_clicked: false
					}, {
						key: '2',
						is_clicked: false
					}, {
						key: '3',
						is_clicked: false
					}],
					[{
						key: '4',
						is_clicked: false
					}, {
						key: '5',
						is_clicked: false
					}, {
						key: '6',
						is_clicked: false
					}],
					[{
						key: '7',
						is_clicked: false
					}, {
						key: '8',
						is_clicked: false
					}, {
						key: '9',
						is_clicked: false
					}],
					[{
						key: '清空',
						is_clicked: false
					}, {
						key: '0',
						is_clicked: false
					}, {
						key: '退格',
						is_clicked: false
					}]
				],
				cursor: true,
				value: '',
				coins: '',
				list: null,
			}
		},
		onLoad() {
			this.cursorF();
		},
		methods: {
			keyTouch(row) {
				row.is_clicked = true;
				switch (row.key) {
					case '退格':
						this.value = this.value.substring(0, this.value.length - 1)
						break;
					case '清空':
						this.value = ''
						break;
					default:
						if (!this.value && row.key == '0' || this.value.length > 3) {
							return;
						}
						this.value += row.key;
				}
			},
			keyTouchEnd(row) {
				this.coins = giveCoin(this.value * 1, this.$store.state.meal_prices_list, this.$store.state.meal_giveCoins_list) +this.value * 1;
				row.is_clicked = false;
			},
			cursorF() {
				setInterval(() => {
					this.cursor = !this.cursor;
				}, 500);
			},
			goPage(url) {
				if (!this.value) return;
				uni.navigateTo({
					url: `${url}?payMethod=1&packageId=0&extraCoins=${this.coins-this.value*1}&totalCoins=${this.coins}&totalMoney=${this.value*100}&totalMoneyRec=${this.value*100}`
				});
			},
		},
	}
</script>
