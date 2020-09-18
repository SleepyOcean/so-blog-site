import axios from '../../utils/axios';

export const getHotArticle = (params) => {
	return axios.ajax('/article/hot-articles', 'post', params);
};

export const getRelatedArticle = (params) => {
	return axios.ajax('/article/related-articles', 'post', params);
};

export const saveArticle = (params) => {
	return axios.ajax('/article/save', 'post', params);
};

export const searchArticle = (params) => {
	return axios.ajax('/article/search', 'post', params);
};

export const getArticle = (params) => {
	return axios.ajax('/article/get', 'post', params);
};

export const deleteArticle = (params) => {
	return axios.ajax('/article/delete', 'post', params);
};

export const getTags = (params) => {
	return axios.ajax('/article/tags', 'post', params);
};

export const searchCollection = (params) => {
	return axios.ajax('/article/collection-get', 'post', params);
};

export const uploadImg = (params) => {
	return axios.ajax('/resource/img/save', 'post', params);
};
