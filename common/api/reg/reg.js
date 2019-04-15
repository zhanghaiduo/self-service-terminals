import {
	ajax
} from '../../js/request.js';

function getReg(data) {
	return ajax({
		url: '/register',
		data
	})
};
export {
	getReg,
};
