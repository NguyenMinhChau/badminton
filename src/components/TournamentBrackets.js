'use client';
import React from 'react';
import { Bracket, Seed, SeedItem } from 'react-brackets';

export const TournamentBrackets = ({
	rounds = [],
	handleChangeSeedScore,
	handleChangeSeedName,
}) => {
	const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }) => {
		const score0 = Number(seed?.teams[0]?.score);
		const score1 = Number(seed?.teams[1]?.score);
		return (
			<Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
				<SeedItem>
					<div>
						<div className="text-center text-orange-500 mt-1 capitalize">
							{seed?.date}
						</div>
						<div className="flex flex-col gap-2 my-2">
							<div className="flex flex-row gap-1 items-center">
								<input
									type="text"
									defaultValue={
										seed.teams[0]?.name || 'NO TEAM '
									}
									onBlur={(e) => {
										handleChangeSeedName(
											roundIndex,
											seedIndex,
											0,
											e.target.value,
										);
									}}
									className={`flex-1 bg-opacity-30 outline-none border-none text-[13px] mx-1 ${
										score0 > score1 || score0 === score1
											? 'text-green-500'
											: 'text-gray-500'
									} ${
										score0 > score1 || score0 === score1
											? 'bg-green-500'
											: 'bg-gray-500'
									} font-bold p-[2px] rounded-tl-md rounded-br-md text-center`}
								/>
								<input
									type="text"
									defaultValue={score0?.toString()}
									onBlur={(e) => {
										handleChangeSeedScore(
											roundIndex,
											seedIndex,
											0,
											e.target.value,
										);
									}}
									className={`w-[30px] bg-opacity-30 outline-none border-none text-[13px] mr-1 ${
										score0 > score1 || score0 === score1
											? 'text-green-500'
											: 'text-gray-500'
									} ${
										score0 > score1 || score0 === score1
											? 'bg-green-500'
											: 'bg-gray-500'
									} font-bold p-[2px] rounded-tr-md rounded-bl-md text-center`}
								/>
							</div>
							<div className="flex flex-row gap-1 items-center">
								<input
									type="text"
									defaultValue={
										seed.teams[1]?.name || 'NO TEAM '
									}
									onBlur={(e) => {
										handleChangeSeedName(
											roundIndex,
											seedIndex,
											1,
											e.target.value,
										);
									}}
									className={`flex-1 bg-opacity-30 outline-none border-none text-[13px] mx-1 ${
										score1 > score0 || score1 === score0
											? 'text-green-500'
											: 'text-gray-500'
									} ${
										score1 > score0 || score1 === score0
											? 'bg-green-500'
											: 'bg-gray-500'
									} font-bold p-[2px] rounded-tl-md rounded-br-md text-center`}
								/>
								<input
									type="text"
									defaultValue={score1?.toString()}
									onBlur={(e) => {
										handleChangeSeedScore(
											roundIndex,
											seedIndex,
											1,
											e.target.value,
										);
									}}
									className={`w-[30px] bg-opacity-30 outline-none border-none text-[13px] mr-1 ${
										score1 > score0 || score1 === score0
											? 'text-green-500'
											: 'text-gray-500'
									} ${
										score1 > score0 || score1 === score0
											? 'bg-green-500'
											: 'bg-gray-500'
									} font-bold p-[2px] rounded-tr-md rounded-bl-md text-center`}
								/>
							</div>
						</div>
					</div>
				</SeedItem>
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
