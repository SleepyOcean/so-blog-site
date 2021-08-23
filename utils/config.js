import util from "./util";

let Config = {};
let configHolder = {};
function getHost() {
	return util.getHost() + '/';
}

Config.setConfig = function (config) {
	configHolder = config;
}
/**
 * 获取基础服务地址
 * @returns {*}
 */
Config.getBaseRequestUrl = function () {
    return getHost() + configHolder.ServerConfig.serviceUrl;
};

/**
 * 获取图片服务地址
 * @returns {*}
 */
Config.getImgServerUrl = function () {
    return getHost() + configHolder.ServerConfig.imgServerUrl;
};

/**
 * 获取图片服务地址完整url前缀
 * @returns {*}
 */
Config.getImgRequestUrl = function () {
	return configHolder.ServerConfig.imgServerUrl + configHolder.ServerConfig.imgUrlPrefix;
};

/**
 * 获取图片URL服务地址占位符
 * @returns {*}
 */
Config.getImgUrlPlaceHolder = function () {
    return configHolder.BaseConfig.imgUrlPlaceHolder;
};

/**
 * 获取ajax请求超时时间
 * @returns {*}
 */
Config.getAjaxTimeout = function () {
    return configHolder.BaseConfig.ajaxTimeout;
};

/**
 * 获取头像地址
 * @returns {*}
 */
Config.getAvatarImgUrl = function () {
	return Config.getImageUrl(configHolder.ThemeConfig.avatarUrl);
}

/**
 * 获取品牌logo地址
 * @returns {*}
 */
Config.getBrandUrl = function () {
	return Config.getImageUrl(configHolder.ThemeConfig.brandUrl);
}

/**
 * 获取全局背景地址
 * @returns {*}
 */
Config.getBackgroundUrl = function () {
	return Config.getImageUrl(configHolder.ThemeConfig.backgroundUrl);
}

/**
 * 通过ImgId获取全局图片地址
 * @returns {*}
 */
Config.getImageUrlById = function (imageId) {
	return Config.getImgRequestUrl() + imageId;
}

/**
 * 获取图片地址
 * @param imgStr
 * @returns {*}
 */
Config.getImageUrl = function (imgStr) {
	if (imgStr.indexOf('/') < 0) {
		// 只有ID，属于个人图床图片源
		return Config.getImageUrlById(imgStr);
	} else {
		// 配置三方地址，直接返回
		return imgStr;
	}
}
/**
 * 获取番茄钟音效地址
 * @returns {*}
 */
Config.getPomodoroSound = function (type) {
	if (type == 'start') {
		return configHolder.PomodoroTimer.startSound;
	} else {
		return configHolder.PomodoroTimer.endSound;
	}
}
export default Config;
