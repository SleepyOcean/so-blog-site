import axios from '../../utils/axios';
import Config from '../../utils/config';

export const compressImgUrl = (originImgUrl, ratio) => {
	return `${Config.getImgServerUrl()}/resource/img/compress?ratio=${ratio}&url=${originImgUrl}`;
};

export const srcImgUrlById = (id) => {
	return `${Config.getImgServerUrl()}/resource/img/${id}`;
};

export const uploadImg = (params) => {
	return axios.ajax(`${Config.getImgServerUrl()}/resource/img/save`, 'post', params);
};

export const searchImg = (params) => {
	return axios.ajax(`${Config.getImgServerUrl()}/resource/img/search`, 'post', params);
};

export const deleteImg = (params) => {
	return axios.ajax(`${Config.getImgServerUrl()}/resource/img/delete`, 'post', params);
};
