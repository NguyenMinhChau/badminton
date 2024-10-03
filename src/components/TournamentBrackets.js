'use client';
import { Bracket, Seed, SeedItem, SeedTeam } from 'react-brackets';

export const TournamentBrackets = ({ rounds = [] }) => {
	// const rounds = [
	// 	{
	// 		title: 'Vòng 1',
	// 		seeds: [
	// 			{
	// 				id: 1,
	// 				date: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
	// 				teams: [{ name: 'Team A' }, { name: 'Team B' }],
	// 			},
	// 			{
	// 				id: 2,
	// 				date: moment(new Date())
	// 					.add('hours', 1.5)
	// 					.format('DD/MM/YYYY HH:mm:ss'),
	// 				teams: [{ name: 'Team C' }, { name: 'Team D' }],
	// 			},
	// 			{
	// 				id: 3,
	// 				date: moment(new Date())
	// 					.add('hours', 1.5)
	// 					.format('DD/MM/YYYY HH:mm:ss'),
	// 				teams: [{ name: 'Team E' }, { name: 'Team F' }],
	// 			},
	// 			{
	// 				id: 4,
	// 				date: moment(new Date())
	// 					.add('hours', 1.5)
	// 					.format('DD/MM/YYYY HH:mm:ss'),
	// 				teams: [{ name: 'Team G' }, { name: 'Team H' }],
	// 			},
	// 		],
	// 	},
	// 	{
	// 		title: 'Vòng 2',
	// 		seeds: [
	// 			{
	// 				id: 6,
	// 				date: moment(
	// 					new Date().setDate(new Date().getDate() + 2),
	// 				).format('DD/MM/YYYY HH:mm:ss'),
	// 				teams: [{ name: 'Team A' }, { name: 'Team C' }],
	// 			},
	// 			{
	// 				id: 7,
	// 				date: moment(
	// 					new Date().setDate(new Date().getDate() + 2),
	// 				).format('DD/MM/YYYY HH:mm:ss'),
	// 				teams: [{ name: 'Team E' }, { name: 'Team H' }],
	// 			},
	// 		],
	// 	},
	// 	{
	// 		title: 'Vòng 3',
	// 		seeds: [
	// 			{
	// 				id: 8,
	// 				date: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
	// 				teams: [{ name: 'Team A' }, { name: 'Team H' }],
	// 			},
	// 		],
	// 	},
	// ];

	const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }) => {
		return (
			<Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
				<SeedItem>
					<div>
						<SeedTeam className="text-white text-[15px]">
							{seed.teams[0]?.name || 'NO TEAM '}
						</SeedTeam>
						<SeedTeam className="text-white  text-[15px]">
							{seed.teams[1]?.name || 'NO TEAM '}
						</SeedTeam>
					</div>
				</SeedItem>
				<div className="text-center text-orange-500">{seed?.date}</div>
			</Seed>
		);
	};

	return (
		<>
			{rounds?.length > 0 ? (
				<Bracket
					mobileBreakpoint={0} // clear
					// bracketClassName="flex flex-row flex-wrap"
					rounds={rounds}
					roundTitleComponent={(title, roundIndex) => {
						return (
							<div className="font-bold text-center uppercase text-green-500">
								{title}
							</div>
						);
					}}
					renderSeedComponent={CustomSeed}
				/>
			) : (
				<div className="text-center text-white text-[16px] italic my-10">
					Hiện tại chưa có lịch thi đấu, vui lòng quay lại sau
				</div>
			)}
		</>
	);
};
