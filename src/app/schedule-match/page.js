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

	const handleChangeSeed = (roundIndex, seedIndex, position, value) => {
		if (value) {
			const newRounds = [..._rounds];
			if (
				newRounds[roundIndex].seeds[seedIndex].teams[
					position
				].score?.toString() !== value
			) {
				newRounds[roundIndex].seeds[seedIndex].teams[position].score =
					value;
				setRounds(newRounds);
				openToast({
					type: TYPE_TOAST.SUCCESS,
					message: 'Cập nhật tỉ số thành công',
				});
			}
		} else {
			openToast({
				type: TYPE_TOAST.WARNING,
				message: 'Vui lòng nhập tỉ số',
			});
			return;
		}
	};

	return (
		<Container className="!p-0">
			<div className="max-w-full overflow-y-hidden" id="schedule_match">
				<TournamentBrackets
					rounds={_rounds}
					handleChangeSeed={handleChangeSeed}
				/>
			</div>
		</Container>
	);
}
