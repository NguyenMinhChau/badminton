'use client';
import React from 'react';
import { Bracket, Seed, SeedItem, SeedTeam } from 'react-brackets';

export const TournamentBrackets = ({ rounds = [], handleChangeSeed }) => {
	const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }) => {
		const score0 = Number(seed?.teams[0]?.score);
		const score1 = Number(seed?.teams[1]?.score);
		return (
			<Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
				<SeedItem>
					<div>
						<div className="flex flex-row gap-1 items-center">
							<SeedTeam className="text-white text-[15px] flex-1">
								{seed.teams[0]?.name || 'NO TEAM '}
							</SeedTeam>
							<input
								type="text"
								defaultValue={score0?.toString()}
								onBlur={(e) => {
									handleChangeSeed(
										roundIndex,
										seedIndex,
										0,
										e.target.value,
									);
								}}
								className={`w-[30px] outline-none border-none text-[13px] mr-1 ${
									score0 > score1 || score0 === score1
										? 'text-green-500'
										: 'text-red-500'
								} font-bold p-[2px] rounded-md text-center`}
							/>
						</div>
						<div className="flex flex-row gap-1 items-center">
							<SeedTeam className="text-white text-[15px] flex-1">
								{seed.teams[1]?.name || 'NO TEAM '}
							</SeedTeam>
							<input
								type="text"
								defaultValue={score1?.toString()}
								onBlur={(e) => {
									handleChangeSeed(
										roundIndex,
										seedIndex,
										1,
										e.target.value,
									);
								}}
								className={`w-[30px] outline-none border-none text-[13px] mr-1 ${
									score1 > score0 || score1 === score0
										? 'text-green-500'
										: 'text-red-500'
								} font-bold p-[2px] rounded-md text-center`}
							/>
						</div>
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
