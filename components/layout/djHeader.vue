<template>
	<view class="index">
		<view class="header">
			<image class="back btnImg" src="../../static/images/back.png" @touchstart="goBack"></image>
			<view class="timeBox">
				<image class="time btnImge" src="../../static/images/time.png"></image>
				<view class="">
					66s
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},

		},
	}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
