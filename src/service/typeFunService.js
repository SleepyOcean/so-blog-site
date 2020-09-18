import axios from '../../utils/axios';
import Utils from '../../utils/util';

export const getChinese = () => {
	return axios.ajax(Utils.getHost() + '/static/Chinese.json', 'get');
};
