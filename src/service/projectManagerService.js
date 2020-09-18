import axios from '../../utils/axios';

export const saveModule = (params) => {
	return axios.ajax('/project/save', 'post', params);
};

export const getModule = (params) => {
	return axios.ajax('/project/get', 'post', params);
};

export const deleteModule = (params) => {
	return axios.ajax('/project/delete', 'post', params);
};

export const updateModule = (params) => {
	return axios.ajax('/project/update', 'post', params);
};
