import { TYPE_TOAST } from '@/components/Toast';
import { actions } from '../../context';
import { axiosGet, axiosPost, axiosPut } from '../utils/axios';
import moment from 'moment';
import { errorMessage } from '../utils/handleMessageAPI';
import uuidv4, { isExist } from '../utils/helpers';
import {
	deleteDataFromFirestore,
	TYPE_COLLECTIONS,
	writeDataToFirestore,
} from '../firebase';

export const TYPE_PLAY = {
	DON_NAM: 'ĐƠN NAM',
	DON_NU: 'ĐƠN NỮ',
	DOI_NAM: 'ĐÔI NAM',
	DOI_NU: 'ĐÔI NỮ',
	DOI_NAM_NU: 'ĐÔI NAM NỮ',
};

const RENDER_SEEDS = (data = []) => {
	const date = moment('2024-10-27')
		.set({
			hour: moment().hour(),
			minute: moment().minute(),
			second: moment().second(),
		})
		.locale('vi')
		.format('dddd, DD/MM/YYYY');
	return data?.payload?.map((item, index) => {
		const {
			_id,
			round,
			team1,
			team2,
			score_team1,
			score_team2,
			winner,
			type,
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
							date: date,
							teams: [
								{
									name: team1?.player1 || '',
									department: team1?.department1 || '',
									score: score_team1,
									image: team1?.imagePlayer1,
									winner: Number(score_team1 || 0) > Number(score_team2 || 0),
									team: 'team1',
									desc_bypass:
										type === 'BYPASS_THI_DAU' && isExist(team1?.player1)
											? 'Vận động viên trong lượt thi đấu này được bypass vào vòng tiếp theo'
											: '',
									...restTeam1,
								},
							],
							noiDungDangKy: item.noiDungDangKy,
							bypass: type === 'BYPASS_THI_DAU',
							round: round,
							teamId: team1?._id,
						},
						{
							id: _id,
							date: date,
							teams: [
								{
									name: team2?.player1 || '',
									department: team2?.department1 || '',
									score: score_team2,
									image: team2?.imagePlayer1,
									winner: Number(score_team2 || 0) > Number(score_team1 || 0),
									team: 'team2',
									desc_bypass:
										type === 'BYPASS_THI_DAU' && isExist(team2?.player1)
											? 'Vận động viên trong lượt thi đấu này được bypass vào vòng tiếp theo'
											: '',
									...restTeam2,
								},
							],
							noiDungDangKy: item.noiDungDangKy,
							bypass: type === 'BYPASS_THI_DAU',
							round: round,
							teamId: team2?._id,
						},
				  ]
				: [
						{
							id: _id,
							date: date,
							teams: [
								{
									name: team1?.player1 || '',
									department: team1?.department1 || '',
									score: score_team1,
									// winner: winner?._id === team1?._id,
									image: team1?.imagePlayer1,
									winner: Number(score_team1 || 0) > Number(score_team2 || 0),
									team: 'team1',
									...restTeam1,
								},
								{
									name: team1?.player2 || '',
									department: team1?.department2 || '',
									score: score_team1,
									// winner: winner?._id === team1?._id,
									image: team1?.imagePlayer2,
									winner: Number(score_team1 || 0) > Number(score_team2 || 0),
									team: 'team1',
									...restTeam1,
								},
							],
							noiDungDangKy: item.noiDungDangKy,
							desc_bypass:
								type === 'BYPASS_THI_DAU' &&
								isExist(team1?.player1) &&
								isExist(team1?.player2)
									? 'Vận động viên trong lượt thi đấu này được bypass vào vòng tiếp theo'
									: '',
							bypass: type === 'BYPASS_THI_DAU',
							round: round,
							teamId: team1?._id,
						},
						{
							id: _id,
							date: date,
							teams: [
								{
									name: team2?.player1 || '',
									department: team2?.department1 || '',
									score: score_team2,
									// winner: winner?._id === team2?._id,
									image: team2?.imagePlayer1,
									winner: Number(score_team2 || 0) > Number(score_team1 || 0),
									team: 'team2',
									...restTeam2,
								},
								{
									name: team2?.player2 || '',
									department: team2?.department2 || '',
									score: score_team2,
									// winner: winner?._id === team2?._id,
									image: team2?.imagePlayer2,
									winner: Number(score_team2 || 0) > Number(score_team1 || 0),
									team: 'team2',
									...restTeam2,
								},
							],
							noiDungDangKy: item.noiDungDangKy,
							desc_bypass:
								type === 'BYPASS_THI_DAU' &&
								isExist(team2?.player1) &&
								isExist(team2?.player2)
									? 'Vận động viên trong lượt thi đấu này được bypass vào vòng tiếp theo'
									: '',
							bypass: type === 'BYPASS_THI_DAU',
							round: round,
							teamId: team2?._id,
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
	const { dispatch, _setSubmitting, openToast } = { ...props };
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
		openToast({
			type: TYPE_TOAST.ERROR,
			message: errorMessage(error),
		});
	}
};

export const GET_LIST_SCHEDULE_MATCH = async (props = {}) => {
	const { dispatch, _setSubmitting, openToast } = { ...props };
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
						seed_donNam: FORMAT_SEED_BY_ROUND(DATA_SCHEDULE_DON_NAM),
						seed_donNu: FORMAT_SEED_BY_ROUND(DATA_SCHEDULE_DON_NU),
						seed_doiNam: FORMAT_SEED_BY_ROUND(DATA_SCHEDULE_DOI_NAM),
						seed_doiNu: FORMAT_SEED_BY_ROUND(DATA_SCHEDULE_DOI_NU),
						seed_doiNamNu: FORMAT_SEED_BY_ROUND(DATA_SCHEDULE_DOI_NAM_NU),
					},
				},
			}),
		);
		_setSubmitting();
	} catch (error) {
		_setSubmitting();
		openToast({
			type: TYPE_TOAST.ERROR,
			message: errorMessage(error),
		});
	}
};

export const UPDATE_CA_THI_DAU = async (props = {}) => {
	const { dispatch, _setSubmitting, openToast, data, _seeds } = { ...props };
	_setSubmitting();
	const arrayData = data?.map((item) => {
		const _getNoiDung = _seeds.find((x) => {
			return x?.question === item?.noiDungDangKy;
		});
		const _getRound = _getNoiDung?.data?.find((x) => {
			return x?.title?.toLowerCase() === item?.round?.toLowerCase();
		});
		const _getSeeds = _getRound?.seeds?.filter((x) => {
			return x?.id === item?.id;
		});
		return {
			id: item?.id,
			payload: {
				score_team1: _getSeeds?.[0]?.teams[0].score || 0,
				score_team2: _getSeeds?.[1]?.teams[0].score || 0,
			},
		};
	});
	const requests = arrayData?.map((item) =>
		axiosPut(`/games/badminton/update-schedules/${item?.id}`, {
			...item?.payload,
			username: process.env.NEXT_PUBLIC_EMAIL,
			password: process.env.NEXT_PUBLIC_PASSWORD,
			secretKey: process.env.NEXT_PUBLIC_SECRET,
		})
			.then((response) => {
				return 'Cập nhật thành công!';
			})
			.catch((error) => {
				const msg = errorMessage(error);
				return msg;
			}),
	);
	const results = await Promise.all(requests);
	GET_LIST_SCHEDULE_MATCH({
		dispatch,
		_setSubmitting,
		openToast,
	});
	_setSubmitting();
	openToast({
		type: TYPE_TOAST.INFO,
		Message: () => {
			return results?.map((msg, index) => {
				return (
					<p key={index} className="mb-3">
						{msg}
					</p>
				);
			});
		},
		autoClose: false,
	});
};

export const CREATE_FIRST_ROUND = async (props = {}) => {
	const { dispatch, _setSubmitting, openToast } = { ...props };
	_setSubmitting();
	try {
		await axiosPost('/games/badminton/schedule/create', {
			username: process.env.NEXT_PUBLIC_EMAIL,
			password: process.env.NEXT_PUBLIC_PASSWORD,
			secretKey: process.env.NEXT_PUBLIC_SECRET,
		});
		setTimeout(async () => {
			GET_LIST_SCHEDULE_MATCH({
				dispatch,
				_setSubmitting,
				openToast,
			});
			_setSubmitting();
			openToast({
				type: TYPE_TOAST.SUCCESS,
				message: 'Tạo lịch thi đấu vòng đầu tiên thành công!',
			});
		}, 3000);
	} catch (error) {
		_setSubmitting();
		openToast({
			type: TYPE_TOAST.ERROR,
			message: errorMessage(error),
		});
	}
};

export const UPLOAD_TEMPLATE = async (props = {}) => {
	const { dispatch, _setSubmitting, openToast } = { ...props };
	_setSubmitting();
	try {
		await axiosPost('/games/badminton/import-player', {
			username: process.env.NEXT_PUBLIC_EMAIL,
			password: process.env.NEXT_PUBLIC_PASSWORD,
			secretKey: process.env.NEXT_PUBLIC_SECRET,
		});
		GET_LIST_PLAYERS({
			dispatch,
			_setSubmitting,
			openToast,
		});
		_setSubmitting();
		openToast({
			type: TYPE_TOAST.SUCCESS,
			message: 'Upload danh sách tham gia thành công!',
		});
	} catch (error) {
		_setSubmitting();
		openToast({
			type: TYPE_TOAST.ERROR,
			message: errorMessage(error),
		});
	}
};

export const CREATE_MATCH_NEXT_ROUND = async (props = {}) => {
	const { dispatch, _setSubmitting, openToast } = { ...props };
	_setSubmitting();
	try {
		const resPost = await axiosPost(
			'/games/badminton/schedule/create-match-next-round',
			{
				username: process.env.NEXT_PUBLIC_EMAIL,
				password: process.env.NEXT_PUBLIC_PASSWORD,
				secretKey: process.env.NEXT_PUBLIC_SECRET,
			},
		);
		// GET SCHEDULE_MATCH
		setTimeout(async () => {
			GET_LIST_SCHEDULE_MATCH({
				dispatch,
				_setSubmitting,
				openToast,
			});
			_setSubmitting();
			openToast({
				type: TYPE_TOAST.INFO,
				message: isExist(resPost.payload)
					? ''
					: 'Tạo lịch thi đấu vòng tiếp theo thành công!',
				Message: () => {
					return (
						<>
							{Object.entries(resPost.payload || {})?.map(
								([key, val], index) => {
									return (
										<p key={index} className="mb-3">
											{key}:{' '}
											{typeof val === 'string'
												? val
												: 'Đã tạo lịch thi đấu vòng tiếp theo thành công!'}
										</p>
									);
								},
							)}
						</>
					);
				},
				autoClose: !isExist(resPost.payload),
			});
		}, 3000);
	} catch (error) {
		_setSubmitting();
		openToast({
			type: TYPE_TOAST.ERROR,
			message: errorMessage(error),
		});
	}
};

export const HANDLE_LOGIN = async (props = {}) => {
	const { dispatch, email, password, router, _setSubmitting, openToast } = {
		...props,
	};
	_setSubmitting();
	setTimeout(async () => {
		if (
			email !== process.env.NEXT_PUBLIC_EMAIL ||
			password !== process.env.NEXT_PUBLIC_PASSWORD
		) {
			_setSubmitting();
			openToast({
				type: TYPE_TOAST.ERROR,
				message: 'Sai tài khoản hoặc mật khẩu!',
			});
		} else {
			let userID = localStorage.getItem('user_id');
			if (!userID) {
				userID = uuidv4();
				localStorage.setItem('user_id', userID);
			}
			const payload = { isLogin: true };
			dispatch(
				actions.SET_DATA_PAYLOAD({
					key: 'data',
					value: {
						user: payload,
					},
				}),
			);
			writeDataToFirestore({
				collection: TYPE_COLLECTIONS.BADMINTON_FTEL,
				data: payload,
				docId: userID,
			});
			router.push('/');
			_setSubmitting();
			openToast({
				type: TYPE_TOAST.SUCCESS,
				message: 'Đăng nhập thành công!',
			});
		}
	}, 3000);
};

export const HANDLE_LOGOUT = async (props = {}) => {
	const { dispatch, router, _setSubmitting, openToast, user } = { ...props };
	_setSubmitting();
	if (user?.isLogin) {
		setTimeout(() => {
			let userID = localStorage.getItem('user_id');
			const payload = { isLogin: false };
			dispatch(
				actions.SET_DATA_PAYLOAD({
					key: 'data',
					value: {
						user: payload,
					},
				}),
			);
			deleteDataFromFirestore({
				collection: TYPE_COLLECTIONS.BADMINTON_FTEL,
				docId: userID,
			});
			router.push('/');
			_setSubmitting();
			openToast({
				type: TYPE_TOAST.SUCCESS,
				message: 'Đăng xuất thành công!',
			});
		}, 3000);
	} else {
		router.push('/login');
		_setSubmitting();
	}
};
