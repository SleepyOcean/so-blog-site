import axios from '../../utils/axios';

let getRequest = () => {
	return localStorage.getItem('fileServer') ? localStorage.getItem('fileServer') : '';
};

export const getDir = (params) => {
	return axios.ajax(getRequest() + '/resource/file/get?dir=' + params, 'get');
};

export const checkExist = (params) => {
	return axios.ajax(getRequest() + '/resource/file/checkExist/' + params, 'get');
};

export const merge = (params) => {
	return axios.ajax(getRequest() + '/resource/file/merge/' + params, 'get');
};

