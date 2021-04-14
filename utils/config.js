import util from './util';

let Config = {};

// 服务端配置
let serverConfig;

// 基础配置
let baseConfig;

// 主题配置
let themeConfig;

Config.setConfig = function (config) {
    if (typeof config === 'string') {
        config = util.jsonToObject(config) || {};
    }

    // 服务配置
    let {ServerConfig} = config;
    if (typeof ServerConfig === 'string') {
        ServerConfig = util.jsonToObject(ServerConfig);
    }
    serverConfig = {
        serviceUrl: ServerConfig.serviceUrl,
        imgServerUrl: ServerConfig.imgServerUrl,
		imgUrlPrefix: ServerConfig.imgUrlPrefix
    };

    // 基础配置
    let {BaseConfig} = config;
    if (typeof BaseConfig === 'string') {
        BaseConfig = util.jsonToObject(BaseConfig);
    }
    baseConfig = {
        ajaxTimeout: BaseConfig.ajaxTimeout,
        imgUrlPlaceHolder: BaseConfig.imgUrlPlaceHolder
    };

	// 主题配置
	let {ThemeConfig} = config;
	if (typeof ThemeConfig === 'string') {
		ThemeConfig = util.jsonToObject(ThemeConfig);
	}
	themeConfig = {
		avatarUrl: ThemeConfig.avatarUrl,
		brandUrl: ThemeConfig.brandUrl,
		backgroundUrl: ThemeConfig.backgroundUrl
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

/**
 * 获取头像地址
 * @returns {*}
 */
Config.getAvatarImgUrl = function () {
	return themeConfig.avatarUrl;
}

/**
 * 获取品牌logo地址
 * @returns {*}
 */
Config.getBrandUrl = function () {
	return themeConfig.brandUrl;
}

/**
 * 获取全局背景地址
 * @returns {*}
 */
Config.getBackgroundUrl = function () {
	return themeConfig.backgroundUrl;
}

/**
 * 获取全局背景地址
 * @returns {*}
 */
Config.getImageUrl = function (imageId) {
	return Config.getImgRequestUrl() + imageId;
}
export default Config;
