import {
	ajax
} from '../../js/request.js';

function getPackage(data) {
	return ajax({
		url: '/query_package',
		data
	})
};
export {
	getPackage,
};
