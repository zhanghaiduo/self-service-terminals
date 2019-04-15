import store from '.././store/index.js';
// 计算最大币值 最高价格居然不是最优结果，移除
/*
 *data 套餐数组，
 *in_p 输入的价格
 *maxC 返回最优的币数 
 */
// export function giveCoin(data, in_p, maxC = 0) {
// 	for (let i = data.length - 1; i < data.length; i--) {
// 		if (i === -1) {
// 			return;
// 		}
// 		if (in_p >= data[i].price) {
// 			maxC += data[i].coins;
// 			return giveCoin(data, in_p - data[i].price, maxC);
// 		}
// 		if (i === 0) {
// 			maxC += in_p;
// 			return maxC
// 		}
// 	}
// }
// 背包函数，返回套餐最优赠送币数
export function giveCoin(maxw, weight, val) {
	console.log(maxw, weight, val)
	if (weight == null || val == null || weight.length != val.length)
		return 0;
	let f = []
	for (let i = 0; i < maxw + 1; i++) {
		f[i] = 0;
	}
	for (let i = 0; i < val.length; i++) {
		for (let j = weight[i]; j < f.length; j++) {
			f[j] = Math.max(f[j], f[j - weight[i]] + val[i]);
		}
	}
	return f[maxw];
}
export function countDown(t) {
	return new Promise((resolve, reject) => {
		if(t=='clear'){
			clearInterval(f);
			store.state.btnTime = '';
			return;
		}
		clearInterval(f);
		store.state.btnTime = t;
		let f = setInterval(() => {
			t--
			if (t == 0) {
				store.state.btnTime = null;
				clearInterval(f);
				resolve()
			}
			store.state.btnTime = t;
		}, 1000)
	})
}
