import { Container } from '@/components/Container';
import { TournamentBrackets } from '@/components/TournamentBrackets';
import moment from 'moment';

export default function ScheduleMatch() {
	const rounds = [
		{
			title: 'Vòng 1',
			seeds: [
				{
					id: 1,
					date: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
					teams: [{ name: 'Team A' }, { name: 'Team B' }],
				},
				{
					id: 2,
					date: moment(new Date())
						.add(1.5, 'hours')
						.format('DD/MM/YYYY HH:mm:ss'),
					teams: [{ name: 'Team C' }, { name: 'Team D' }],
				},
				{
					id: 3,
					date: moment(new Date())
						.add(1.5, 'hours')
						.format('DD/MM/YYYY HH:mm:ss'),
					teams: [{ name: 'Team E' }, { name: 'Team F' }],
				},
				{
					id: 4,
					date: moment(new Date())
						.add(1.5, 'hours')
						.format('DD/MM/YYYY HH:mm:ss'),
					teams: [{ name: 'Team G' }, { name: 'Team H' }],
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
					teams: [{ name: 'Team A' }, { name: 'Team C' }],
				},
				{
					id: 7,
					date: moment(
						new Date().setDate(new Date().getDate() + 2),
					).format('DD/MM/YYYY HH:mm:ss'),
					teams: [{ name: 'Team E' }, { name: 'Team H' }],
				},
			],
		},
		{
			title: 'Vòng 3',
			seeds: [
				{
					id: 8,
					date: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
					teams: [{ name: 'Team A' }, { name: 'Team H' }],
				},
			],
		},
	];
	return (
		<Container className="!p-0">
			<div className="max-w-full overflow-y-hidden" id="schedule_match">
				<TournamentBrackets rounds={rounds} />
			</div>
		</Container>
	);
}
