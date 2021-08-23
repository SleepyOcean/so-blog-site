import axios from 'axios';
import Config from './config';

// 开发环境
axios.setConfig = function (config, supportOld) {
	if(supportOld){ // 适配旧版本
		axios.defaults.timeout = Config.getAjaxTimeout() || 30000;
		// // 解决跨域时丢失 cookie 问题,设置请求超时时间
		axios.defaults.withCredentials = false;
	} else {
		for(let key in config){
			axios.defaults[key] = config[key];
		}
	}
};

const httpRequest = function (resolve, reject, config, isRetry, customize, responseState) {
	if (!customize) {
		customize = {};
	}
	if (customize.headers) {
		for (let key in customize.headers) {
			config.headers[key] = customize.headers[key];
		}
	}
	axios.defaults.timeout = Config.getAjaxTimeout() || 30000;
	axios(config)
		.then(response => {
			// 请求接口正确且成功时
			if (response.data.status === 200) {
				resolve(response.data);
			} else {
				// 请求接口错误或不成功时
				resolve(response.data.result ? response.data.result : response.data);
			}
		}).catch(error => {
		reject(error);
		console.log('http请求失败', error);
	});
};

axios.ajax = function (url, method, params, form = false, customize = {}, responseState = 1) {
	return new Promise((resolve, reject) => {
		let config = null;
		if(url && (url.toLowerCase().indexOf('http://') !== 0 && url.toLowerCase().indexOf('https://') !== 0)){
			url = Config.getBaseRequestUrl() + url;
		}
		if (form) {
			config = {
				url: url,
				method: method,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			};

			config.transformRequest = [
				function (data) {
					let ret = '';
					for (let it in data) {
						ret +=
							encodeURIComponent(it) +
							'=' +
							encodeURIComponent(data[it]) +
							'&';
					}
					return ret;
				}
			];
		} else {
			config = {
				url: url,
				method: method
			};
			config.headers = {
				'Content-type': 'application/json;charset=utf-8'
			};
		}
		if (method && method.toLowerCase() === 'get') {
			config.params = params;
		} else {
			config.data = params;
		}
		//本案例中将token保存到了localStorage，将其添加到请求头
		if (localStorage.token) {
			let tokenInfo = localStorage.token.split(' @');
			let tokenDate = tokenInfo[1];
			let nowDate = (new Date()).getTime();
			let df = (nowDate - tokenDate) / (1000 * 60 * 60);
			// 判断 token 是否超过一天
			if(df < 24){
				config.headers.Authorization = tokenInfo[0];
			} else {
				delete localStorage.token;
			}
		}
		httpRequest(resolve, reject, config, false, customize, responseState);
	});
};

export default axios;
