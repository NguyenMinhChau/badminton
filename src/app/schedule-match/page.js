'use client';
import { Container } from '@/components/Container';
import { TournamentBrackets } from '@/components/TournamentBrackets';
import moment from 'moment';
import React from 'react';

export default function ScheduleMatch() {
	const rounds = [
		{
			title: 'Vòng 1',
			seeds: [
				{
					id: 1,
					date: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
					teams: [
						{ name: 'Team A', score: 2 },
						{ name: 'Team B', score: 1 },
					],
				},
				{
					id: 2,
					date: moment(new Date())
						.add(1.5, 'hours')
						.format('DD/MM/YYYY HH:mm:ss'),
					teams: [
						{ name: 'Team C', score: 2 },
						{ name: 'Team D', score: 1 },
					],
				},
				{
					id: 3,
					date: moment(new Date())
						.add(1.5, 'hours')
						.format('DD/MM/YYYY HH:mm:ss'),
					teams: [
						{ name: 'Team E', score: 3 },
						{ name: 'Team F', score: 0 },
					],
				},
				{
					id: 4,
					date: moment(new Date())
						.add(1.5, 'hours')
						.format('DD/MM/YYYY HH:mm:ss'),
					teams: [
						{ name: 'Team G', score: 1 },
						{ name: 'Team H', score: 2 },
					],
				},
			],
		},
		{
			title: 'Vòng 2',
			seeds: [
				{
					id: 6,
					date: moment(
						new Date().setDate(new Date().getDate() + 2),
					).format('DD/MM/YYYY HH:mm:ss'),
					teams: [
						{ name: 'Team A', score: 2 },
						{ name: 'Team C', score: 1 },
					],
				},
				{
					id: 7,
					date: moment(
						new Date().setDate(new Date().getDate() + 2),
					).format('DD/MM/YYYY HH:mm:ss'),
					teams: [
						{ name: 'Team E', score: 1 },
						{ name: 'Team H', score: 2 },
					],
				},
			],
		},
		{
			title: 'Vòng 3',
			seeds: [
				{
					id: 8,
					date: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
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
		const newRounds = [..._rounds];
		newRounds[roundIndex].seeds[seedIndex].teams[position].score = value;
		setRounds(newRounds);
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
