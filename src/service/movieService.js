import axios from '../../utils/axios';
import Utils from '../../utils/util';

export const getTestMovieData = () => {
	return axios.ajax(Utils.getHost() + '/static/movieTestData.json', 'get');
};
