export default {
	init({
		commit
	}, data) {
		commit('INIT')
	},
	useAndroidClass({
		commit
	}, data) {
		uni.showLoading();
		return new Promise((resolve, reject) => {
			try {
				this.state.AbilityCallback = plus.android.implements("com.i3020.nativable.AbilityCallback", {
					"msgcallback": (res) => {
						if (JSON.parse(res).code == 2) { // 修改后端代码2为成功结束
							uni.showToast({
								title: JSON.parse(res).msg,
							})
							resolve(JSON.parse(res));
						} else if (JSON.parse(res).code == -1) {
							this.state.Log.d('zqtest', 'resolve其他```````````' + res);
							uni.showToast({
								icon: 'none',
								title: JSON.parse(res).msg,
							})
							reject(JSON.parse(res));
						}
						uni.hideLoading();
					}
				});
				if (data.data) {
					this.state.DeviceAbility[data.name](data.data)
				} else {
					this.state.DeviceAbility[data.name]()
				}
				this.state.DeviceAbility.setAbilityCallback(this.state.AbilityCallback);
			} catch (e) {
				this.state.Log.d('zqtest', 'error```````````' + e);
			}
		})
	},
}
