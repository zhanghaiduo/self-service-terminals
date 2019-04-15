import {
	base_info,
	baseUrl,
	serverUrl
} from '../../common/js/base_info.js'
export function ajax(options) {
	return new Promise((resolve, reject) => {
		options = Object.assign({ // 合并对象
			method: 'POST',
			dataType: 'json',
			header: {},
		}, options)
		options.data = { ...options.data,
			...base_info()
		}
		options.url = `${uni.getStorageSync('BASE_URL')}${options.url}`;
		options.header['content-type'] = 'application/json; charset=utf-8';
		options.success = ({
			data,
			statusCode
		}) => {
			if (statusCode != 200) {
				uni.hideLoading();
				let text = `服务器小哥状态 ${statusCode} 啦,请稍后再试`
				uni.showModal({
					title: '提示',
					content: text,
					confirmColor: '#3296FA',
					showCancel: false,
					success: (res) => {
						if (res.confirm) {
							// #ifdef APP-PLUS
							plus.runtime.quit();
							// #endif
						}
					}
				});
				return;
			}
			if (data.result) {
				uni.hideLoading();
				resolve(data)
			} else {
				uni.hideLoading();
				if (data.errCode == -6||data.errCode == -5||data.errCode == -3) {
					uni.reLaunch({
						url: '/pages/reg/reg'
					})
				}
				uni.showToast({
					icon: 'none',
					title: data.hint,
				})
				reject(data)
			}
		}

		options.fail = (err) => {
			console.log(err)
			uni.hideLoading();
			uni.showModal({
				title: '网络异常',
				content: '连接失败，请检查网络后重试',
				confirmColor: '#3296FA',
				showCancel: false,
				success: (res) => {
					if (res.confirm) {
						// #ifdef APP-PLUS
						// plus.runtime.quit();
						// #endif
					}
				}
			});
			reject(err)
		}
		uni.request(options)
	})
}
