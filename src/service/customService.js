import axios from '../../utils/axios';

export const requestProxy = (params) => {
	return axios.ajax('/custom/request/post', 'post', params);
};

export const getRequestTask = (params) => {
	return axios.ajax('/custom/task/request/get?' + params, 'get');
};

export const cancelRequestTask = (params) => {
	return axios.ajax('/custom/task/request/cancel', 'post', params);
};

export const addRequestTask = (params) => {
	return axios.ajax('/custom/task/request', 'post', params);
};
