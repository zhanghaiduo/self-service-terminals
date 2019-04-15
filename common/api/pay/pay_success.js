import {
	ajax
} from '../../js/request.js';

function getCoinReport(data) {
	return ajax({
		url: '/coin_exchange',
		data
	})
};
export {
	getCoinReport,
};
