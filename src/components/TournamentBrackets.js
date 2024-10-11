'use client';
import React from 'react';
import { Bracket, Seed, SeedItem } from 'react-brackets';

export const TournamentBrackets = ({
	rounds = [],
	handleChangeSeedScore,
	paramsHandleChangeSeedScore = {},
	handleChangeSeedName,
	paramsHandleChangeSeedName = {},
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
						<div
							className="flex flex-row gap-1 my-2"
							style={{
								alignItems: seed.teams[1]?.name
									? 'center'
									: 'start',
							}}
						>
							<div className="flex flex-col gap-3">
								<div className="flex flex-row gap-1 items-start">
									<div className="flex-1 flex flex-col items-start">
										<input
											type="text"
											defaultValue={
												seed.teams[0]?.name ||
												'NO TEAM '
											}
											onBlur={(e) => {
												handleChangeSeedName(
													roundIndex,
													seedIndex,
													0,
													e.target.value,
													paramsHandleChangeSeedName,
												);
											}}
											style={{
												width: '-webkit-fill-available',
											}}
											className={`bg-opacity-30 outline-none border-none py-2 text-[14px] mx-1 text-green-500 bg-green-500 font-bold p-[2px] rounded-tl-md rounded-br-md text-center`}
										/>
										<span className="font-bold mx-2 text-[8px] italic">
											Phòng Ban:{' '}
											{seed?.teams[0]?.department ||
												'---'}
										</span>
									</div>
									{/* <input
									type="text"
									defaultValue={score0?.toString()}
									onBlur={(e) => {
										handleChangeSeedScore(
											roundIndex,
											seedIndex,
											0,
											e.target.value,
											paramsHandleChangeSeedScore,
										);
									}}
									className={`w-[50px] bg-opacity-30 py-2 outline-none border-none text-[14px] mr-1 text-green-500 bg-green-500 font-bold p-[2px] rounded-tr-md rounded-bl-md text-center`}
								/> */}
								</div>
								{seed.teams[1]?.name && (
									<div className="flex flex-row gap-1 items-start">
										<div className="flex flex-col items-start">
											<input
												type="text"
												defaultValue={
													seed.teams[1]?.name ||
													'NO TEAM '
												}
												onBlur={(e) => {
													handleChangeSeedName(
														roundIndex,
														seedIndex,
														1,
														e.target.value,
														paramsHandleChangeSeedName,
													);
												}}
												className={`bg-opacity-30 py-2 outline-none border-none text-[14px] mx-1 text-green-500 bg-green-500 font-bold p-[2px] rounded-tl-md rounded-br-md text-center`}
											/>
											<span className="font-bold mx-2 text-[8px] italic">
												Phòng Ban:{' '}
												{seed?.teams[1]?.department ||
													'---'}
											</span>
										</div>
										{/* <input
											type="text"
											defaultValue={score1?.toString()}
											onBlur={(e) => {
												handleChangeSeedScore(
													roundIndex,
													seedIndex,
													1,
													e.target.value,
													paramsHandleChangeSeedScore,
												);
											}}
											className={`w-[50px] py-2 bg-opacity-30 outline-none border-none text-[14px] mr-1 text-green-500 bg-green-500 font-bold p-[2px] rounded-tr-md rounded-bl-md text-center`}
										/> */}
									</div>
								)}
							</div>
							<input
								type="text"
								defaultValue={score0?.toString()}
								onBlur={(e) => {
									handleChangeSeedScore(
										roundIndex,
										seedIndex,
										0,
										e.target.value,
										paramsHandleChangeSeedScore,
									);
								}}
								className={`w-[50px] bg-opacity-30 py-2 outline-none border-none text-[14px] mr-1 text-green-500 bg-green-500 font-bold p-[2px] rounded-tr-md rounded-bl-md text-center`}
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
