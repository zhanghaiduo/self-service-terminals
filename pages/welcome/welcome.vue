<template>
	<view class="index">

	</view>
</template>
<script>
	export default {
		onLoad() {
			this.goPage();
		},
		methods: {
			goPage() {
				if (uni.getStorageSync('C_INFO')) {
					uni.reLaunch({
						url: '/pages/home/home'
					})
				} else {
					uni.reLaunch({
						url: '/pages/reg/reg'
					})
				}
			},
		},
	}
</script>
