import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: ``,
});

axiosInstance.interceptors.request.use(
	async (config) => {
		//   config.headers.Authorization = `Bearer ${tokenAccess}`
		//   config.headers.token = securityToken
		//   config.headers.tokenAPI = tokenAccess
		config.data = {
			...config.data,
		};

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export const axiosGet = async (path, options = {}, others = {}) => {
	const res = await axiosInstance.get(path, options, others);
	return res.data;
};

export const axiosPost = async (path, options = {}, others = {}) => {
	const res = await axiosInstance.post(path, options, others);
	return res.data;
};
export const axiosPut = async (path, options = {}, others = {}) => {
	const res = await axiosInstance.put(path, options, others);
	return res.data;
};

export const axiosDelete = async (path, options = {}, others = {}) => {
	const res = await axiosInstance.delete(path, options, others);
	return res.data;
};
