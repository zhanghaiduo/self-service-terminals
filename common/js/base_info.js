const serverUrl = 'dev' //真实服务器地址

let baseUrl = '';
switch (serverUrl) {
	case 'local':
		baseUrl = 'http://xxxx';
		break;
	case 'dev':
		baseUrl = 'http://xxxx';
		break;
	case 'testpre':
		baseUrl = 'http://xxxx';
		break;
	case 'testpro':
		baseUrl = 'http://xxxx';
		break;
	case 'test':
		baseUrl = 'http://xxxx';
		break;
	case 'online':
		baseUrl = 'http://xxxx';
		break;
	default:
		baseUrl = '';
		break;
}
uni.setStorageSync('BASE_URL', baseUrl);

function base_info() {
	const base_info = {};
	try {
		if (uni.getStorageSync('C_INFO')) {
			base_info.cid = uni.getStorageSync('C_INFO').cid;
			base_info.token = uni.getStorageSync('C_INFO').token;
		}
	} catch (e) {
		console.log(e)
	}
	return base_info
};

export {
	base_info,
	baseUrl,
	serverUrl,
};
