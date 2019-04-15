<template>
	<view class="index">
		<view class="content">
			<view class="contentBox text-center textA">
				<view class="titleA">
					注册
				</view>
				<view class="uni-flex flex-center  margin-t30">
					<view style="width: 240upx;">主键id</view>
					<input class=" border_b" v-model="saveForm.cid">
				</view>
				<view class="uni-flex flex-center">
					<view style="width: 240upx;">物理地址（有线）</view>
					<input class="border_b" v-model="saveForm.mac1">
				</view>
				<view class="uni-flex flex-center">
					<view style="width: 240upx;">物理地址（无线）</view>
					<input class="border_b" v-model="saveForm.mac2">
				</view>
			</view>
		</view>
		<view class="dj-btn" @tap="regClick">
			注册
		</view>
	</view>
</template>
<script>
	import {
		getReg
	} from '../../common/api/reg/reg.js'
	export default {
		data() {
			return {
				saveForm: {
					cid: '',
					mac1: '',
					mac2: ''
				}
			}
		},
		methods: {
			regClick() {
				getReg(this.saveForm).then(res => {
					console.log(res)
					uni.showToast({
						title: res.hint,
					})
					// 缓存登录成功信息
					uni.setStorage({
						key: 'C_INFO',
						data: {
							cid: this.saveForm.cid,
							token: res.data[0].token
						},
					});
					uni.reLaunch({
						url: '/pages/home/home'
					})
				});
			},
		},
	}
</script>
