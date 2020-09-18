import Vue from 'vue';
import axios from "./axios";
import Config from "./config";

let util = {};

util.objectToMap = function(obj) {
	let map = new Map();
	for (let o of Object.keys(obj)) {
		map.set(o, obj[o]);
	}
	return map;
};
util.jsonToMap = function(jsonstr) {
	return this.objectToMap(JSON.parse(jsonstr));
};
util.parseJson = function(jsonstr) {
	try {
		return JSON.parse(jsonstr);
	} catch (e) {
		window.error(e);
	}
};
util.jsonToObject = function(jsonStr){
	if (typeof jsonStr === 'object') {
		return jsonStr;
	}
	try {
		return JSON.parse(jsonStr);
	} catch (e) {
		console.error('JSON parse 出错： ' + e);
	}
};

util.StringToArray = function(str) {
	return str.split(",");
};
// 对象数组中通过对象中其他字段、值和需要返回的字段，来获取值
util.getValueByName = function(arr, inName, inValue, outputName) {
	var res = "";
	arr.forEach((obj, index) => {
		if (obj[inName] === inValue) {
			if (outputName) {
				res = obj[outputName] + " ";
			} else {
				res = obj;
			}
		}
	});
	return res;
};
// 输出数组元素对象中某一字段的集合
util.getArrByName = function(arr, outputName) {
	var res = [];
	arr.forEach((obj, index) => {
		res.push(obj[outputName]);
	});
	return res;
};

util.getType = function(obj) {
	let str = Object.prototype.toString.call(obj);
	let map = {
		"[object Boolean]": "boolean",
		"[object Number]": "number",
		"[object String]": "string",
		"[object Function]": "function",
		"[object Array]": "array",
		"[object Date]": "date",
		"[object RegExp]": "regExp",
		"[object Undefined]": "undefined",
		"[object Null]": "null",
		"[object Object]": "object"
	};
	if (obj instanceof Element) {
		// 判断是否是dom元素，如div等
		return "element";
	}
	return map[str];
};

// 会忽略 undefined
// 不能序列化函数，会被忽略
// 不能解决循环引用的对象
util.deepClone = function(obj) {
	var _obj = JSON.stringify(obj);
	var objClone = JSON.parse(_obj);
	return objClone;
};

// 通用
util.deepClone2 = function clone(p) {
	let obj;
	let str = util.getType(p);
	if (str === "array") {
		obj = [];
		for (let i = 0; i < p.length; i++) {
			obj.push(clone(p[i])); // 回调自己
		}
	} else if (str === "object") {
		obj = {};
		for (let i in p) {
			obj[i] = clone(p[i]);
		}
	} else {
		return p;
	}
	return obj;
};

util.isEmpty = function(value) {
	if (
		value === undefined ||
		value === null ||
		value === "null" ||
		value === "" ||
		value.length <= 0
	) {
		return true;
	} else {
		return false;
	}
};

util.arrayContains = function contains(arr, obj) {
	let i = arr.length;
	while (i--) {
		if (arr[i] === obj) {
			return true;
		}
	}
	return false;
};

// 生成从minNum到maxNum的随机数
util.randomNum = function(minNum, maxNum) {
	switch (arguments.length) {
		case 1:
			return parseInt(Math.random() * minNum + 1, 10);
			break;
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			break;
		default:
			return 0;
			break;
	}
};

/**
 * 设置全局缓存
 * @param name
 * @param value
 */
util.setGlobalCache = function(name, value) {
	localStorage.setItem(name, value);
};

/**
 * 获取全局缓存
 * @param name
 * @returns {string}
 */
util.getGlobalCache = function(name) {
	return localStorage.getItem(name);
};

/**
 * 更新设置缓存
 */
util.updateSettingCache = function() {
	let params = {};
	axios
		.ajax("/config/get", "post", params)
		.then(data => {
			if (data.status === 200) {
				data.resultList.forEach(item => {
					util.setGlobalCache(item.configKey, item.configValue);
				});
			} else {
				console.warn(`请求配置信息失败！${data.message}`);
			}
		})
		.catch(e => {
			console.error(`更新缓存出错！${e}`);
		});
};

/**
 * 获取设置缓存
 * @param name
 * @returns {string}
 */
util.getSettingCache = function(name) {
	let result = util.getGlobalCache(name);
	if (result) {
		return result;
	} else {
		util.updateSettingCache();
		return util.getGlobalCache(name);
	}
};

/**
 * 获取网页host地址
 * @returns {string}
 */
util.getHost = function() {
	let pathname = location.pathname.split("/");
	pathname.splice(pathname.length - 1, 1);
	let str = pathname.join("/");
	let baseUrl = location.protocol + "//" + location.host + str;
	return baseUrl;
};

/**
 * 图片服务地址纠正， 将 “图片服务URL占位符” 替换为 “部署后的图片服务URL”
 * @param placeholderUrl
 * @returns {*}
 */
util.imgUrlRectify = function(placeholderUrl) {
	return placeholderUrl.replace(
		new RegExp(Config.getImgUrlPlaceHolder(), "gm"),
		Config.getImgRequestUrl()
	);
};
/**
 * 图片服务地址纠正回退， 将 “部署后的图片服务URL” 替换为 “图片服务URL占位符”
 * @param placeholderUrl
 * @returns {*}
 */
util.imgUrlRectifyFallback = function(url) {
	return url.replace(
		new RegExp(Config.getImgRequestUrl(), "gm"),
		Config.getImgUrlPlaceHolder()
	);
};

/**
 * 获取压缩图片
 * @param placeholderUrl
 * @returns {*}
 */
util.getCompressImg = function(url, ratio) {
	return Config.getImgRequestUrl() + `compress?url=${url}&ratio=${ratio}`;
};

/**
 * 获取图片缩略图
 * @param placeholderUrl
 * @returns {*}
 */
util.getThumbnailImg = function(id) {
	return Config.getImgRequestUrl() + `thumbnail/${id}`;
};

/**
 * 该obj对象不参与vue的监听
 */
const pseudo = Vue.observable({});
util.noneWatch = (obj) => {
	if (obj && typeof obj === 'object') {
		try {
			!obj.__ob__ && Object.defineProperty(obj, '__ob__', {
				value: pseudo.__ob__
			});
		} catch (e) {
			console.error(e.message);
		}
	}
	return obj;
};

export default util;
