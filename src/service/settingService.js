import axios from '../../utils/axios';

export const getSetting = (params) => {
	return axios.ajax('/config/get', 'post', params);
};

export const saveSetting = (params) => {
	return axios.ajax('/config/save', 'post', params);
};