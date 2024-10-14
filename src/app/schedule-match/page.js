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
import { isExist } from '../../utils/helpers';

export default function ScheduleMatch() {
	const {
		_submitting,
		schedule_match,
		CallApiGetListScheduleMatch,
		CallApiUpdate,
		CallApiUpdateVer2,
		CallApiCreateMatchNextRound,
	} = useScheduleMatch();
	const { seed_donNam, seed_donNu, seed_doiNam, seed_doiNu, seed_doiNamNu } =
		{ ...schedule_match };

	const { openToast } = useToast();

	const seedData = [
		{
			question: 'ĐƠN NAM',
			color: '#0ea5e9',
			data: seed_donNam || [],
		},
		{
			question: 'ĐƠN NỮ',
			color: '#6366f1',
			data: seed_donNu || [],
		},
		{
			question: 'ĐÔI NAM',
			color: '#a855f7',
			data: seed_doiNam || [],
		},
		{
			question: 'ĐÔI NỮ',
			color: '#ec4899',
			data: seed_doiNu || [],
		},
		{
			question: 'ĐÔI NAM NỮ',
			color: '#059669',
			data: seed_doiNamNu || [],
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
				const _seedIndex =
					newRounds[index].data[roundIndex].seeds[seedIndex];
				if (`${_seedIndex.teams[position].score}` !== value) {
					_seedIndex.teams[position].score = Number(value);
					setSeeds(newRounds);
					// const payload = {
					// 	score_team1:
					// 		_seedIndex?.teams[0].team === 'team1'
					// 			? _seedIndex?.teams[0].score
					// 			: null,
					// 	score_team2:
					// 		_seedIndex?.teams[0].team === 'team2'
					// 			? _seedIndex?.teams[0].score
					// 			: null,
					// };
					// CallApiUpdate(_seedIndex?.id, payload);

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
		// console.log({ uniqueData });
		CallApiUpdateVer2(uniqueData);
		setSeedsSubmit([]);
	};

	return (
		<>
			{_submitting && <LoadingScreen />}
			<Container className="!p-1">
				<div className="sticky top-2 right-2 z-50 w-full flex items-end justify-end">
					<div className="flex flex-row flex-wrap gap-2 items-center">
						<button
							className="px-6 py-2 text-[#ea580c] bg-white rounded-md font-bold"
							onClick={() => {
								CallApiCreateMatchNextRound();
								setSeedsSubmit([]);
							}}
						>
							Tạo lịch thi đấu vòng tiếp theo
						</button>
						<button
							className="px-6 py-2 text-blue-500 bg-white rounded-md font-bold disabled:bg-gray-400 disabled:text-white"
							onClick={handleSubmitSeed}
							disabled={!isExist(_seedsSubmit)}
						>
							Cập nhật tỉ số thi đấu
						</button>
					</div>
				</div>
				{_seeds.map((item, index) => (
					<div key={index} className="mb-5 w-full">
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
										</DisclosureButton>
									</div>
									<DisclosurePanel className="text-white rounded-lg p-2 bg-white bg-opacity-10">
										<div
											className="max-w-full overflow-y-hidden"
											id="schedule_match"
										>
											<TournamentBrackets
												rounds={item?.data}
												handleChangeSeedScore={
													handleChangeSeedScore
												}
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
