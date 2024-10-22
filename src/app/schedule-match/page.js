'use client';
import { Container } from '@/components/Container';
import { TournamentBrackets } from '@/components/TournamentBrackets';
import 'moment/locale/vi';
import React from 'react';
import { useToast } from '../../../hooks';
import { TYPE_TOAST } from '@/components/Toast';
import { useScheduleMatch } from './hooks';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { fList, isExist } from '../../utils/helpers';

export default function ScheduleMatch() {
	const {
		_submitting,
		schedule_match,
		user,
		CallApiGetListScheduleMatch,
		CallApiUpdate,
		CallApiCreateMatchFirstRound,
		CallApiCreateMatchNextRound,
	} = useScheduleMatch();
	const { seed_donNam, seed_donNu, seed_doiNam, seed_doiNu, seed_doiNamNu } = {
		...schedule_match,
	};

	const disabled = !user?.isLogin;

	const { openToast } = useToast();

	const checkDone = (data) => {
		const _data = data[data?.length - 1]?.seeds;
		const _data_pre = data[data?.length - 2]?.seeds;
		const isAllScoresValid = _data?.every((match) =>
			match?.teams?.every((team) => team?.score !== null && team?.score >= 0),
		);
		const isCheckPlaceholderValid = _data_pre?.every((match) =>
			match?.teams?.some((team) => team?.isPlaceHolder),
		);
		return _data?.length === 2 && isCheckPlaceholderValid
			? true
			: isAllScoresValid;
	};

	const handleGetPlayerWinner = (checkDone, data) => {
		if (checkDone) {
			const _dataFinal = data[data?.length - 1]?.seeds;
			const _playerWinner = fList(_dataFinal).reduce((prev, curr) => {
				if (prev.teams[0]?.score > curr?.teams[0]?.score) return prev;
				return curr;
			});
			return {
				..._playerWinner,
				isWinner: true,
			};
		}
		return {};
	};

	const seedData = [
		{
			question: 'ĐƠN NAM',
			color: '#0ea5e9',
			data: seed_donNam
				? [
						...seed_donNam,
						...(checkDone(seed_donNam)
							? [
									{
										title: 'WINNER',
										seeds: [
											{
												...handleGetPlayerWinner(
													checkDone(seed_donNam),
													seed_donNam,
												),
											},
										],
									},
							  ]
							: []),
				  ]
				: [],
		},
		{
			question: 'ĐƠN NỮ',
			color: '#6366f1',
			data: seed_donNu
				? [
						...seed_donNu,
						...(checkDone(seed_donNu)
							? [
									{
										title: 'WINNER',
										seeds: [
											{
												...handleGetPlayerWinner(
													checkDone(seed_donNu),
													seed_donNu,
												),
											},
										],
									},
							  ]
							: []),
				  ]
				: [],
		},
		{
			question: 'ĐÔI NAM',
			color: '#a855f7',
			data: seed_doiNam
				? [
						...seed_doiNam,
						...(checkDone(seed_doiNam)
							? [
									{
										title: 'WINNER',
										seeds: [
											{
												...handleGetPlayerWinner(
													checkDone(seed_doiNam),
													seed_doiNam,
												),
											},
										],
									},
							  ]
							: []),
				  ]
				: [],
		},
		{
			question: 'ĐÔI NỮ',
			color: '#ec4899',
			data: seed_doiNu
				? [
						...seed_doiNu,
						...(checkDone(seed_doiNu)
							? [
									{
										title: 'WINNER',
										seeds: [
											{
												...handleGetPlayerWinner(
													checkDone(seed_doiNu),
													seed_doiNu,
												),
											},
										],
									},
							  ]
							: []),
				  ]
				: [],
		},
		{
			question: 'ĐÔI NAM NỮ',
			color: '#059669',
			data: seed_doiNamNu
				? [
						...seed_doiNamNu,
						...(checkDone(seed_doiNamNu)
							? [
									{
										title: 'WINNER',
										seeds: [
											{
												...handleGetPlayerWinner(
													checkDone(seed_doiNamNu),
													seed_doiNamNu,
												),
											},
										],
									},
							  ]
							: []),
				  ]
				: [],
		},
	];

	React.useEffect(() => {
		CallApiGetListScheduleMatch();
	}, []);

	const [_seeds, setSeeds] = React.useState(seedData);
	const [_seedsSubmit, setSeedsSubmit] = React.useState([]);

	React.useEffect(() => {
		setSeeds(seedData);
	}, [schedule_match]);

	function isNumeric(value) {
		return !isNaN(value) && !isNaN(parseFloat(value));
	}

	const handleChangeSeedScore = (
		roundIndex,
		seedIndex,
		position,
		value,
		{ index },
	) => {
		const newRounds = [..._seeds];
		if (isExist(value) && value !== '-') {
			if (Number(value) <= 31 && Number(value) >= 0 && isNumeric(value)) {
				const _seedIndex = newRounds[index].data[roundIndex].seeds[seedIndex];
				if (`${_seedIndex.teams[position].score}` !== value) {
					_seedIndex.teams[position].score = Number(value);
					setSeeds(newRounds);
					setSeedsSubmit([..._seedsSubmit, _seedIndex]);
				}
			} else {
				openToast({
					type: TYPE_TOAST.WARNING,
					message:
						'Tỉ số phải là số, lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 31',
				});
				return;
			}
		}
		//  else {
		// 	openToast({
		// 		type: TYPE_TOAST.WARNING,
		// 		message: 'Tỉ số không được để trống',
		// 	});
		// 	return;
		// }
	};

	const handleSubmitSeed = () => {
		const uniqueTeamsMap = new Map();

		// Duyệt ngược mảng để ưu tiên lấy phần tử cuối cùng có `_id` trùng lặp
		for (let i = _seedsSubmit.length - 1; i >= 0; i--) {
			const teamId = _seedsSubmit[i]?.teams[0]?._id;
			if (teamId && !uniqueTeamsMap.has(teamId)) {
				uniqueTeamsMap.set(teamId, _seedsSubmit[i]);
			}
		}

		const uniqueData = Array.from(uniqueTeamsMap.values());
		CallApiUpdate(uniqueData, _seeds);
		setSeedsSubmit([]);
	};

	const _checkHaveFirstRounded = _seeds?.some((item) => isExist(item?.data));

	return (
		<>
			{_submitting && <LoadingScreen />}
			<Container className="!p-1">
				<div className="sticky top-2 right-2 z-30 w-full flex flex-col items-end justify-end">
					<div className="flex flex-row flex-wrap gap-2 items-center">
						<button
							className="px-6 py-2 text-[#ea580c] bg-white rounded-md font-bold disabled:bg-gray-400 disabled:text-white"
							onClick={() => {
								if (!_checkHaveFirstRounded) {
									CallApiCreateMatchFirstRound();
								} else {
									CallApiCreateMatchNextRound();
								}
								setSeedsSubmit([]);
							}}
							disabled={disabled}
						>
							Tạo lịch thi đấu vòng{' '}
							{!_checkHaveFirstRounded ? 'đầu tiên' : 'tiếp theo'}
						</button>
						<button
							className="px-6 py-2 text-blue-500 bg-white rounded-md font-bold disabled:bg-gray-400 disabled:text-white"
							onClick={handleSubmitSeed}
							disabled={!isExist(_seedsSubmit) || disabled}
						>
							Cập nhật tỉ số thi đấu
						</button>
					</div>
				</div>
				{_seeds.map((item, index) => (
					<div key={index} className="my-5 w-full">
						<Disclosure defaultOpen={index === 0}>
							{({ open }) => (
								<>
									<div className="flex flex-row">
										<DisclosureButton
											className={`flex items-center justify-between gap-3 font-bold w-full px-2 py-3 text-l text-left rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75`}
											style={{
												color: '#FFF',
											}}
										>
											<span className="text-xl underline">
												NỘI DUNG: {item.question}
											</span>
											{/* <button
												className="px-6 py-2 text-[#ea580c] bg-white rounded-md font-bold disabled:bg-gray-400 disabled:text-white"
												onClick={(e) => {
													e.stopPropagation();
													if (
														!item?.data?.some((item) => isExist(item?.data))
													) {
														CallApiCreateMatchFirstRound(item?.question);
													} else {
														CallApiCreateMatchNextRound();
													}
													setSeedsSubmit([]);
												}}
												disabled={disabled}
											>
												Tạo lịch thi đấu vòng{' '}
												{!item?.data?.some((item) => isExist(item?.data)) ? 'đầu tiên' : 'tiếp theo'}
											</button> */}
										</DisclosureButton>
									</div>
									<DisclosurePanel className="text-white rounded-lg p-2 bg-white bg-opacity-10">
										<div
											className="max-w-full overflow-y-hidden"
											id="schedule_match"
										>
											<TournamentBrackets
												rounds={item?.data}
												handleChangeSeedScore={handleChangeSeedScore}
												paramsFunc={{
													index: index,
												}}
											/>
										</div>
									</DisclosurePanel>
								</>
							)}
						</Disclosure>
					</div>
				))}
			</Container>
		</>
	);
}
