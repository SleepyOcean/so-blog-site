import axios from '../../utils/axios';

export const login = (params) => {
	return axios.ajax('/login', 'post', params);
};

export const logout = () => {
	return axios.ajax('/logout', 'get');
};
