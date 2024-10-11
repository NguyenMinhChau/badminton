import { actions } from '../../context';
import { axiosGet } from '../utils/axios';
import moment from 'moment';

export const TYPE_PLAY = {
	DON_NAM: 'ĐƠN NAM',
	DON_NU: 'ĐƠN NỮ',
	DOI_NAM: 'ĐÔI NAM',
	DOI_NU: 'ĐÔI NỮ',
	DOI_NAM_NU: 'ĐÔI NAM NỮ',
};

const RENDER_SEEDS = (data = []) => {
	return data?.payload?.map((item, index) => {
		const {
			_id,
			round,
			team1,
			team2,
			score_team1,
			score_team2,
			winner,
			...rest
		} = { ...item };
		const { player1, department1, ...restTeam1 } = { ...team1 };
		const { player2, department2, ...restTeam2 } = { ...team2 };
		return {
			title: `${round}`?.toUpperCase(),
			seeds: item.noiDungDangKy?.toLowerCase()?.includes('đơn')
				? [
						{
							id: _id,
							date: moment(new Date())
								.locale('vi')
								.format('dddd, DD/MM/YYYY HH:mm'),
							teams: [
								{
									name: team1?.player1 || '',
									department: team1?.department1 || '---',
									score: score_team1 || 0,
									winner: winner?._id === team1?._id,
									...restTeam1,
								},
							],
						},
						{
							id: _id,
							date: moment(new Date())
								.locale('vi')
								.format('dddd, DD/MM/YYYY HH:mm'),
							teams: [
								{
									name: team2?.player1 || '',
									department: team2?.department1 || '---',
									score: score_team2 || 0,
									winner: winner?._id === team2?._id,
									...restTeam2,
								},
							],
						},
				  ]
				: [
						{
							id: _id,
							date: moment(new Date())
								.locale('vi')
								.format('dddd, DD/MM/YYYY HH:mm'),
							teams: [
								{
									name: team1?.player1 || '',
									department: team1?.department1 || '---',
									score: score_team1 || 0,
									winner: winner?._id === team1?._id,
									...restTeam1,
								},
								{
									name: team1?.player2 || '',
									department: team1?.department2 || '---',
									score: score_team1 || 0,
									winner: winner?._id === team1?._id,
									...restTeam1,
								},
							],
						},
						{
							id: _id,
							date: moment(new Date())
								.locale('vi')
								.format('dddd, DD/MM/YYYY HH:mm'),
							teams: [
								{
									name: team2?.player1 || '',
									department: team2?.department1 || '---',
									score: score_team2 || 0,
									winner: winner?._id === team2?._id,
									...restTeam2,
								},
								{
									name: team2?.player2 || '',
									department: team2?.department2 || '---',
									score: score_team2 || 0,
									winner: winner?._id === team2?._id,
									...restTeam2,
								},
							],
						},
				  ],
			...rest,
		};
	});
};

const FORMAT_SEED_BY_ROUND = (data) => {
	const _reduceData = data?.reduce((acc, item) => {
		if (!acc[item.title]) {
			acc[item.title] = [];
		}
		acc[item.title].push(item);
		return acc;
	}, {});
	return Object.entries(_reduceData)?.map(([key, val], index) => {
		const dataSeeds = val?.reduce((acc, cur) => {
			acc.push(...cur.seeds);
			return acc;
		}, []);
		return {
			title: key,
			seeds: dataSeeds?.flat(),
		};
	});
};

export const GET_LIST_PLAYERS = async (props = {}) => {
	const { dispatch, _setSubmitting } = { ...props };
	_setSubmitting();
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
		_setSubmitting();
	} catch (error) {
		_setSubmitting();
		console.log({ error });
	}
};

export const GET_LIST_SCHEDULE_MATCH = async (props = {}) => {
	const { dispatch, _setSubmitting } = { ...props };
	_setSubmitting();
	try {
		const resGetDonNam = await axiosGet(
			`games/badminton/get-schedules/${TYPE_PLAY.DON_NAM}`,
		);
		const resGetDonNu = await axiosGet(
			`games/badminton/get-schedules/${TYPE_PLAY.DON_NU}`,
		);
		const resGetDoiNam = await axiosGet(
			`games/badminton/get-schedules/${TYPE_PLAY.DOI_NAM}`,
		);
		const resGetDoiNu = await axiosGet(
			`games/badminton/get-schedules/${TYPE_PLAY.DOI_NU}`,
		);
		const resGetDoiNamNu = await axiosGet(
			`games/badminton/get-schedules/${TYPE_PLAY.DOI_NAM_NU}`,
		);

		const DATA_SCHEDULE_DON_NAM = RENDER_SEEDS(resGetDonNam);
		const DATA_SCHEDULE_DON_NU = RENDER_SEEDS(resGetDonNu);
		const DATA_SCHEDULE_DOI_NAM = RENDER_SEEDS(resGetDoiNam);
		const DATA_SCHEDULE_DOI_NU = RENDER_SEEDS(resGetDoiNu);
		const DATA_SCHEDULE_DOI_NAM_NU = RENDER_SEEDS(resGetDoiNamNu);

		dispatch(
			actions.SET_DATA_PAYLOAD({
				key: 'data',
				value: {
					schedule_match: {
						seed_donNam: FORMAT_SEED_BY_ROUND(
							DATA_SCHEDULE_DON_NAM,
						),
						seed_donNu: FORMAT_SEED_BY_ROUND(DATA_SCHEDULE_DON_NU),
						seed_doiNam: FORMAT_SEED_BY_ROUND(
							DATA_SCHEDULE_DOI_NAM,
						),
						seed_doiNu: FORMAT_SEED_BY_ROUND(DATA_SCHEDULE_DOI_NU),
						seed_doiNamNu: FORMAT_SEED_BY_ROUND(
							DATA_SCHEDULE_DOI_NAM_NU,
						),
					},
				},
			}),
		);
		_setSubmitting();
	} catch (error) {
		_setSubmitting();
		console.log({ error });
	}
};
