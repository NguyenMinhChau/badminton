'use client';
import { Container } from '@/components/Container';
import { TournamentBrackets } from '@/components/TournamentBrackets';
import moment from 'moment';
import 'moment/locale/vi';
import React from 'react';
import { useToast } from '../../../hooks';
import { TYPE_TOAST } from '@/components/Toast';

export default function ScheduleMatch() {
	const { openToast } = useToast();

	const rounds = [
		{
			title: 'Vòng đấu 1',
			seeds: [
				{
					id: 1,
					date: moment(new Date())
						.locale('vi')
						.format('dddd, DD/MM/YYYY HH:mm'),
					teams: [
						{ name: 'Team A', score: 2 },
						{ name: 'Team B', score: 1 },
					],
				},
				{
					id: 2,
					date: moment(new Date())
						.add(1.5, 'hours')
						.locale('vi')
						.format('dddd, DD/MM/YYYY HH:mm'),
					teams: [
						{ name: 'Team C', score: 2 },
						{ name: 'Team D', score: 1 },
					],
				},
				{
					id: 3,
					date: moment(new Date())
						.add(1.5, 'hours')
						.locale('vi')
						.format('dddd, DD/MM/YYYY HH:mm'),
					teams: [
						{ name: 'Team E', score: 3 },
						{ name: 'Team F', score: 0 },
					],
				},
				{
					id: 4,
					date: moment(new Date())
						.add(1.5, 'hours')
						.locale('vi')
						.format('dddd, DD/MM/YYYY HH:mm'),
					teams: [
						{ name: 'Team G', score: 1 },
						{ name: 'Team H', score: 2 },
					],
				},
			],
		},
		{
			title: 'Vòng đấu 2',
			seeds: [
				{
					id: 6,
					date: moment(new Date().setDate(new Date().getDate() + 2))
						.locale('vi')
						.format('dddd, DD/MM/YYYY HH:mm'),
					teams: [
						{ name: 'Team A', score: 2 },
						{ name: 'Team C', score: 1 },
					],
				},
				{
					id: 7,
					date: moment(new Date().setDate(new Date().getDate() + 2))
						.locale('vi')
						.format('dddd, DD/MM/YYYY HH:mm'),
					teams: [
						{ name: 'Team E', score: 1 },
						{ name: 'Team H', score: 2 },
					],
				},
			],
		},
		{
			title: 'Vòng đấu 3',
			seeds: [
				{
					id: 8,
					date: moment(new Date().setDate(new Date().getDate() + 4))
						.locale('vi')
						.format('dddd, DD/MM/YYYY HH:mm'),
					teams: [
						{ name: 'Team A', score: 2 },
						{ name: 'Team H', score: 1 },
					],
				},
			],
		},
	];

	const [_rounds, setRounds] = React.useState(rounds);

	const hasDataChanged = (currentData, initialData) => {
		return JSON.stringify(currentData) !== JSON.stringify(initialData);
	};

	function isNumeric(value) {
		return !isNaN(value) && !isNaN(parseFloat(value));
	}

	const handleChangeSeedScore = (roundIndex, seedIndex, position, value) => {
		const newRounds = [..._rounds];
		if (value) {
			if (Number(value) <= 31 && Number(value) >= 0 && isNumeric(value)) {
				if (
					newRounds[roundIndex].seeds[seedIndex].teams[
						position
					].score?.toString() !== value
				) {
					newRounds[roundIndex].seeds[seedIndex].teams[
						position
					].score = Number(value);
					setRounds(newRounds);
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

	const handleChangeSeedName = (roundIndex, seedIndex, position, value) => {
		if (value) {
			const newRounds = [..._rounds];
			if (
				newRounds[roundIndex].seeds[seedIndex].teams[
					position
				].name?.toString() !== value
			) {
				newRounds[roundIndex].seeds[seedIndex].teams[position].name =
					value;
				setRounds(newRounds);
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
			console.log(_rounds);
			openToast({
				type: TYPE_TOAST.SUCCESS,
				message: 'Cập nhật thay đổi thành công',
			});
		}
	};

	return (
		<Container className="!p-0">
			<Container className="mb-6 py-0">
				<button
					className="flex items-center justify-center rounded-md py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp bg-[#ea580c] disabled:bg-opacity-50 disabled:cursor-default cursor-pointer"
					onClick={handleSubmitted}
					disabled={!hasDataChanged(_rounds, rounds)}
				>
					Cập nhật thay đổi
				</button>
			</Container>
			<div className="max-w-full overflow-y-hidden" id="schedule_match">
				<TournamentBrackets
					rounds={_rounds}
					handleChangeSeedScore={handleChangeSeedScore}
					handleChangeSeedName={handleChangeSeedName}
				/>
			</div>
		</Container>
	);
}
