import {
	ajax
} from '../../js/request.js';

function getCoinPay(data) {
	return ajax({
		url: '/coin_pay',
		data
	})
};
export {
	getCoinPay,
};
