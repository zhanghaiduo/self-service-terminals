<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS    
			this.$store.dispatch('init')
			// #endif  
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	/* dj一些公共样式 */
	@import "./common/css/dj.scss";
	/* 默认样式 */
	@import "./common/css/index.scss";

	// home------------------------------
	.banner {
		image {
			width: 100%;
			height: 200upx;
		}
	}

	.priceOld {
		text-decoration: line-through;
		font-size: 20upx;
		color: #a0865d;
	}

	.priceNew {
		font-size: 30upx;
		color: #ff4b4b;
	}

	.priceTitle {
		font-size: 48upx;
		text-shadow: -2upx 6upx 0 rgb(0, 15, 36);
		color: #fff;
		text-align: center;
		margin-top: 68upx
	}

	.itemBtn:active {
		background: #e5c28a;
		border-radius: 8upx;
		color: #fff;
	}

	.priceList {
		height: 570upx;
		width: 601upx;
		background: url('~@/static/images/jiamu.png');
		background-size: 100% 100%;
		margin: 32upx auto 0;
		text-align: center;
		font-size: 30upx;
		color: #7b4408;

		.priceBox {
			padding: 14upx 80upx;
		}

		.priceItem {
			align-items: center;
			justify-content: center;
			height: 78upx;
			position: relative;

			.hot {
				position: absolute;
				left: -30upx;
				width: 52upx;
				height: 54upx;
				top: 14upx;
			}
		}


	}

	// meal_list-------------------
	.mealItem {
		width: 184upx;
		background: url('~@/static/images/d_taocan.png');
		background-size: 100% 100%;
		margin: 42upx auto 0upx;
		padding: 24upx 0;
		position: relative;

		.hot {
			position: absolute;
			left: -20upx;
			top: -20upx;
			width: 52upx;
			height: 54upx;
		}

		.give {
			top: -14upx;
			right: -20upx;
		}
	}

	.coinCustomItem {
		padding: 40upx 0;
	}

	.mealCheck {
		background: url('~@/static/images/c_taocan.png');
		background-size: 100% 100%;
	}

	// meal_custom-------------------
	.numBox {
		height: 438upx;
		background: url('~@/static/images/d_taocan.png');
		background-size: 100% 100%;
		margin: 0 auto;
		padding: 20upx;

		.numInput {
			height: 94upx;
			line-height: 94upx;
			margin: auto;
			background: url('~@/static/images/shuru.png');
			background-size: 100% 100%;
			text-align: left;
			padding: 0 30upx;
			font-size: 32upx;
			color: #753f00;
			position: relative
		}

		.totalCoin {
			position: absolute;
			top: 0;
			right: 28upx;
		}

		.give {
			top: -30upx;
			right: -72upx;
		}

		.giveColor {
			font-size: 32upx;
			margin-left: 6upx
		}

		.cursor {
			background: #feb723;
			width: 4upx;
			height: 46upx;
			margin: -10upx 2upx;
			display: inline-block
		}

		.numKey {

			view {
				padding: 8upx;
				margin: 10upx;
				flex: 1;
				flex-grow: 1;
				border-radius: 8upx;
				color: #fff;
			}
		}
	}
</style>
