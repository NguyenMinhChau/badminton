import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export const axiosInstanceFormData = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	maxBodyLength: Infinity,
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

axiosInstanceFormData.interceptors.request.use(
	async (config) => {
		//   config.headers.Authorization = `Bearer ${tokenAccess}`
		//   config.headers.token = securityToken
		//   config.headers.tokenAPI = tokenAccess
		config.headers['Content-Type'] = 'multipart/form-data';
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

export const axiosPostFormData = async (path, options = {}, others = {}) => {
	const res = await axiosInstanceFormData.post(path, options, others);
	return res.data;
};

export const axiosPutFormData = async (path, options = {}, others = {}) => {
	const res = await axiosInstanceFormData.put(path, options, others);
	return res.data;
};
