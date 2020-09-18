import axios from '../../utils/axios';

let host = 'http://localhost:8001';

export const getOrderList = (params) => {
	return axios.ajax(host + '/order/list', 'post', params);
};
