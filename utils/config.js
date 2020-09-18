import util from './util';

let Config = {};

// 服务端配置
let serverConfig;

// 基础配置
let baseConfig;

Config.setConfig = function (config) {
    if (typeof config === 'string') {
        config = util.jsonToObject(config) || {};
    }
    let {ServerConfig} = config;
    if (typeof ServerConfig === 'string') {
        ServerConfig = util.jsonToObject(ServerConfig);
    }
    serverConfig = {
        serviceUrl: ServerConfig.serviceUrl,
        imgServerUrl: ServerConfig.imgServerUrl,
		imgUrlPrefix: ServerConfig.imgUrlPrefix
    };

    let {BaseConfig} = config;
    if (typeof BaseConfig === 'string') {
        BaseConfig = util.jsonToObject(BaseConfig);
    }
    baseConfig = {
        ajaxTimeout: BaseConfig.ajaxTimeout,
        imgUrlPlaceHolder: BaseConfig.imgUrlPlaceHolder
    };
};
/**
 * 获取基础服务地址
 * @returns {*}
 */
Config.getBaseRequestUrl = function () {
    return serverConfig.serviceUrl;
};

/**
 * 获取图片服务地址
 * @returns {*}
 */
Config.getImgServerUrl = function () {
    return serverConfig.imgServerUrl;
};

/**
 * 获取图片服务地址完整url前缀
 * @returns {*}
 */
Config.getImgRequestUrl = function () {
	return serverConfig.imgServerUrl + serverConfig.imgUrlPrefix;
};

/**
 * 获取图片URL服务地址占位符
 * @returns {*}
 */
Config.getImgUrlPlaceHolder = function () {
    return baseConfig.imgUrlPlaceHolder;
};

/**
 * 获取ajax请求超时时间
 * @returns {*}
 */
Config.getAjaxTimeout = function () {
    return baseConfig.ajaxTimeout;
};
export default Config;
