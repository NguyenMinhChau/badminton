'use client';
import { Container } from '@/components/Container';
import { TournamentBrackets } from '@/components/TournamentBrackets';
import 'moment/locale/vi';
import React from 'react';
import { useToast } from '../../../hooks';
import { TYPE_TOAST } from '@/components/Toast';
import { useListUserJoin } from '../list-users-join/hooks';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function ScheduleMatch() {
	const { _submitting, schedule_match, CallApiGetListScheduleMatch } =
		useListUserJoin();
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

	React.useEffect(() => {
		setSeeds(seedData);
	}, [schedule_match]);

	const hasDataChanged = (currentData, initialData) => {
		return JSON.stringify(currentData) !== JSON.stringify(initialData);
	};

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
		if (value) {
			if (Number(value) <= 31 && Number(value) >= 0 && isNumeric(value)) {
				if (
					newRounds[index].data[roundIndex].seeds[seedIndex].teams[
						position
					].score?.toString() !== value
				) {
					newRounds[index].data[roundIndex].seeds[seedIndex].teams[
						position
					].score = Number(value);
					setSeeds(newRounds);
				}
			} else {
				openToast({
					type: TYPE_TOAST.WARNING,
					message:
						'Tỉ số phải là số, lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 31',
				});
				return;
			}
		} else {
			openToast({
				type: TYPE_TOAST.WARNING,
				message: 'Tỉ số không được để trống',
			});
			return;
		}
	};

	const handleChangeSeedName = (
		roundIndex,
		seedIndex,
		position,
		value,
		{ index },
	) => {
		if (value) {
			const newRounds = [..._seeds];
			if (
				newRounds[index].data[roundIndex].seeds[seedIndex].teams[
					position
				].name?.toString() !== value
			) {
				newRounds[index].data[roundIndex].seeds[seedIndex].teams[
					position
				].name = value;
				setSeeds(newRounds);
			}
		} else {
			openToast({
				type: TYPE_TOAST.WARNING,
				message: 'Nhân sự thi đấu không được để trống',
			});
			return;
		}
	};

	const handleSubmitted = () => {
		const isConfirmed = window.confirm(
			'Bạn có chắc muốn cập nhật những thay đổi??',
		);
		if (isConfirmed) {
			console.log(_seeds);
			openToast({
				type: TYPE_TOAST.SUCCESS,
				message: 'Cập nhật thay đổi thành công',
			});
		}
	};

	return (
		<>
			{_submitting && <LoadingScreen />}
			<Container className="!p-0">
				{_seeds.map((item, index) => (
					<div key={index} className="mb-5 w-full">
						<Disclosure defaultOpen={index === 0}>
							{({ open }) => (
								<>
									<div className="flex flex-row">
										<DisclosureButton
											className={`flex items-center bg-gray-200 justify-between font-bold w-full px-2 py-3 text-l text-left rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75`}
											style={{
												color: item.color,
											}}
										>
											<span>{item.question}</span>
											<ChevronUpIcon
												className={`${
													open
														? 'transform rotate-180'
														: ''
												} w-5 h-5 font-bold`}
												style={{
													color: item.color,
												}}
											/>
										</DisclosureButton>
									</div>
									<DisclosurePanel className="text-white rounded-lg p-2">
										{/* {item?.data?.length > 0 && (
											<button
												className="flex items-center mb-3 justify-center rounded-md py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp bg-[#ea580c] disabled:bg-opacity-50 disabled:cursor-default cursor-pointer"
												onClick={handleSubmitted}
												disabled={
													!hasDataChanged(
														item?.data[0],
														_seeds,
													)
												}
											>
												Cập nhật thay đổi
											</button>
										)} */}
										<div
											className="max-w-full overflow-y-hidden"
											id="schedule_match"
										>
											<TournamentBrackets
												rounds={item?.data}
												handleChangeSeedScore={
													handleChangeSeedScore
												}
												paramsHandleChangeSeedScore={{
													index: index,
												}}
												handleChangeSeedName={
													handleChangeSeedName
												}
												paramsHandleChangeSeedName={{
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
