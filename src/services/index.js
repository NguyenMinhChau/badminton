import { actions } from '../../context';
import { axiosGet } from '../utils/axios';

export const TYPE_PLAY = {
	DON_NAM: 'ĐƠN NAM',
	DON_NU: 'ĐƠN NỮ',
	DOI_NAM: 'ĐÔI NAM',
	DOI_NU: 'ĐÔI NỮ',
	DOI_NAM_NU: 'ĐÔI NAM NỮ',
};

export const GET_LIST_PLAYERS = async (props = {}) => {
	const { dispatch } = { ...props };
	try {
		const resGet = await axiosGet('games/badminton/get-players');

		const DATA_DON_NAM = resGet?.payload?.filter(
			(item) => item?.noiDungDangKy === TYPE_PLAY.DON_NAM,
		);
		const DATA_DON_NU = resGet?.payload?.filter(
			(item) => item?.noiDungDangKy === TYPE_PLAY.DON_NU,
		);
		const DATA_DOI_NAM = resGet?.payload?.filter(
			(item) => item?.noiDungDangKy === TYPE_PLAY.DOI_NAM,
		);
		const DATA_DOI_NU = resGet?.payload?.filter(
			(item) => item?.noiDungDangKy === TYPE_PLAY.DOI_NU,
		);
		const DATA_DOI_NAM_NU = resGet?.payload?.filter(
			(item) => item?.noiDungDangKy === TYPE_PLAY.DOI_NAM_NU,
		);

		dispatch(
			actions.SET_DATA_PAYLOAD({
				key: 'data',
				value: {
					user_list_join: {
						donNam: DATA_DON_NAM,
						donNu: DATA_DON_NU,
						doiNam: DATA_DOI_NAM,
						doiNu: DATA_DOI_NU,
						doiNamNu: DATA_DOI_NAM_NU,
					},
				},
			}),
		);
	} catch (error) {
		console.log({ error });
	}
};
