<!-- 模态弹窗 -->
<template>
	<div class="modalContent" v-if='showModal' @touchmove.stop.prevent>
		<!-- 自定义内容 -->
		<view class="modalBox">
			<view class="modalTitle">
				{{title}}
			</view>
			<slot></slot>
			<view class="dj-btn btn-sm modalBtn" @click="confirmClick">
				{{confirmText}}
			</view>
		</view>
	</div>
</template>
<script>
	export default {
		name: 'djModal',
		data() {
			return {
				showModal: false
			}
		},
		props: {
			// 			styleObj: { // 用于承接样式类
			// 				type: Object,
			// 				default: function() {
			// 					return {
			// 						position: 'absolute',
			// 						bottom: 0,
			// 						top: 0,
			// 						left: 0,
			// 						width: '100%',
			// 						background: 'rgba(0, 0, 0, 0.5)'
			// 					}
			// 				}
			// 			},
			title: {
				type: String,
				default: '',
			},
			confirmText: {
				type: String,
				default: '确定',
			}
		},
		methods: {
			// 确定
			confirmClick() {
				// this.showModal = false;// 确认逻辑放父组件处理
				this.$emit('onConfirm');
			},
			// 取消
			cancelClick() {
				this.showModal = false
				return new Promise((resolve) => {
					resolve('cancel')
				}, (reject) => {

				})
			}
		}
	}
</script>
<style scoped lang='scss'>
	.modalContent {
		display: box;
		/* OLD - Android 4.4- */
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		text-align: center;
		position: absolute;
		bottom: 0;
		top: 0;
		left: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0.5)
	}

	.modalBox {
		background: #fff;
		width: 620upx;
		height: 440upx;
		border-radius: 20upx;
		padding: 10upx;
		position: relative;
	}

	.modalTitle {
		font-size: 32upx;
		color: #753f00;
		margin: 50upx;
	}

	.modalBtn {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.dj-btn2 {
		background: url('~@/static/images/anniu2.png');
		background-size: 100% 100%;
	}

	.btn-sm {
		background: url('~@/static/images/anniu3.png');
		background-size: 100% 100%;
		width: 344upx;
		height: 80upx;
		font-size: 24upx;
		line-height: 80upx;
		margin: 48upx auto;
		text-shadow: #753f00 1px 0 0, #753f00 0 1px 0, #753f00 -1px 0 0, #753f00 0 -1px 0;
		color: #fff;
		text-align: center;
	}
</style>
