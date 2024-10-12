'use client';
import React from 'react';
import { Bracket, Seed, SeedItem } from 'react-brackets';

export const TournamentBrackets = ({
	rounds = [],
	handleChangeSeedScore,
	paramsFunc = {},
}) => {
	const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }) => {
		const _checkDisabled = roundIndex !== rounds?.length - 1;

		const score0 = Number(seed?.teams[0]?.score);

		const _checkWin0 = seed?.teams[0]?.winner;

		const textWin = _checkWin0 ? 'text-green-500' : 'text-gray-500';
		const bgWin = _checkWin0 ? 'bg-green-500' : 'bg-gray-500';

		return (
			<Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
				<SeedItem>
					<div>
						{/* <div className="text-center text-orange-500 mt-1 capitalize">
							{seed?.date}
						</div> */}
						<div
							className="flex flex-row gap-1 my-2"
							style={{
								alignItems: seed.teams[1]?.name
									? 'center'
									: 'start',
							}}
						>
							<div className="flex flex-col gap-1">
								<div className="flex flex-row gap-1 items-start">
									<div className="flex-1 flex flex-col items-start">
										<input
											type="text"
											value={
												(seed.teams[0]?.name ||
													'NO TEAM') +
												` [${
													seed?.teams[0]
														?.department || '---'
												}]`
											}
											className={`bg-opacity-30 w-[200px] outline-none border-none py-2 text-[14px] mx-1 ${textWin} ${bgWin} font-bold p-[2px] rounded-tl-md rounded-br-md text-center`}
										/>
									</div>
								</div>
								{seed.teams[1]?.name && (
									<div className="flex flex-row gap-1 items-start">
										<div className="flex flex-col items-start">
											<input
												type="text"
												value={
													(seed.teams[1]?.name ||
														'NO TEAM') +
													` [${
														seed?.teams[1]
															?.department ||
														'---'
													}]`
												}
												className={`bg-opacity-30 py-2 w-[200px] outline-none border-none text-[14px] mx-1 ${textWin} ${bgWin} font-bold p-[2px] rounded-tl-md rounded-br-md text-center`}
											/>
										</div>
									</div>
								)}
							</div>
							<input
								type="text"
								defaultValue={
									score0 || score0 === 0
										? score0?.toString()
										: '-'
								}
								onBlur={(e) => {
									handleChangeSeedScore(
										roundIndex,
										seedIndex,
										0,
										e.target.value,
										paramsFunc,
									);
								}}
								className={`w-[50px] bg-opacity-30 py-2 outline-none border-none text-[14px] mr-1 ${textWin} ${bgWin} font-bold p-[2px] rounded-tr-md rounded-bl-md text-center`}
								disabled={_checkDisabled}
								readOnly={_checkDisabled}
							/>
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
