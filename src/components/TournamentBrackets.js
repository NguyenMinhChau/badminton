/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import { Bracket, Seed, SeedItem } from 'react-brackets';
import { useAppContext, useModal } from '../../hooks';
import { getDriveIdBeforeView, isExist } from '@/utils/helpers';

export const TournamentBrackets = ({
	rounds = [],
	handleChangeSeedScore,
	paramsFunc = {},
}) => {
	const { state } = useAppContext();

	const { data } = state.set_data;
	const { user } = { ...data };

	const disabled = !user?.isLogin;

	const { openModal } = useModal();

	const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }) => {
		const score0 = isExist(seed?.teams[0]?.score)
			? Number(seed?.teams[0]?.score)
			: '-';
		const _noiDungDon = seed?.noiDungDangKy?.toLowerCase()?.includes('đơn');
		const desc_bypass = _noiDungDon
			? seed?.teams[0]?.desc_bypass
			: seed?.desc_bypass;
		const bypass = seed.bypass;
		const _checkDisabled = roundIndex !== rounds?.length - 1 || bypass;

		const _checkWin0 = seed?.teams[0]?.winner;
		const _checkWinFinal = seed?.isWinner;

		const textWin = _checkWinFinal
			? 'text-orange-500'
			: _checkWin0 && !desc_bypass
			? 'text-green-500'
			: 'text-gray-500';
		const bgWin = _checkWinFinal
			? 'bg-orange-500'
			: _checkWin0 && !desc_bypass
			? 'bg-green-500'
			: 'bg-gray-500';

		const _uriImgPlayer1 =
			getDriveIdBeforeView(seed?.teams[0]?.image) ||
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPHVvfXupg0nld10nBo2PfTM6Zi_l-CUy1GQ&s';

		const _uriImgPlayer2 =
			getDriveIdBeforeView(seed?.teams[1]?.image) ||
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPHVvfXupg0nld10nBo2PfTM6Zi_l-CUy1GQ&s';

		const checkHideSeed = _noiDungDon
			? !seed?.teams[0]?.name
			: !seed?.teams[0]?.name && !seed?.teams[1]?.name;

		return (
			<Seed
				mobileBreakpoint={breakpoint}
				className={`hidden_before_tournament ${
					checkHideSeed ? 'hidden_link' : ''
				} ${desc_bypass ? 'hide_all_link' : ''} `}
				style={{
					fontSize: 12,
					padding: '0.3em 1.5em',
					marginBottom: seedIndex % 2 === 0 ? 0 : 30,
				}}
			>
				{!checkHideSeed && (
					<SeedItem
						style={{
							backgroundColor: _checkWinFinal ? '#fde047' : '#FFF',
						}}
						className={`border-color-tournament`}
					>
						<div>
							<div
								className="flex flex-row gap-1 m-2"
								style={{
									alignItems: seed.teams[1]?.name ? 'center' : 'start',
								}}
							>
								<div className="flex flex-col gap-1">
									<div className="flex flex-row gap-1 items-center">
										<img
											src={_uriImgPlayer1}
											width="45"
											alt={seed.teams[0]?.name}
											height="45"
											className="min-w-[25px] min-h-[25px] max-w-[35px] max-h-[35px] cursor-pointer rounded-lg overflow-hidden object-cover aspect-auto"
											onClick={() => {
												openModal({
													title: `${seed.teams[0]?.name} [${seed.teams[0]?.department}]`,
													children: () => {
														return (
															<div className="flex items-center justify-center">
																<img
																	src={_uriImgPlayer1}
																	width="150"
																	alt={seed.teams[0]?.name}
																	height="150"
																	className="w-[300px] h-[300px] cursor-pointer object-contain aspect-auto rounded-lg"
																	onClick={() => {
																		window.open(_uriImgPlayer1, '_blank');
																	}}
																/>
															</div>
														);
													},
												});
											}}
										/>
										<div className="flex-1 flex flex-col items-start">
											<input
												type="text"
												value={
													(seed.teams[0]?.name || '-') +
													`${
														seed?.teams[0]?.department
															? ` [${seed?.teams[0]?.department}]`
															: ''
													}`
												}
												className={`bg-opacity-30 w-[200px] outline-none border-none py-2 text-[14px] ${
													desc_bypass && seed.teams[0]?.name
														? 'text-blue-500'
														: textWin
												} ${
													desc_bypass && seed.teams[0]?.name
														? 'bg-blue-500'
														: bgWin
												} font-bold p-[2px] rounded-tl-md rounded-br-md text-center`}
											/>
										</div>
									</div>
									{seed.teams[1]?.name && (
										<div className="flex flex-row gap-1 items-center">
											<img
												src={_uriImgPlayer2}
												width="45"
												alt={seed.teams[1]?.name}
												height="45"
												className="min-w-[25px] min-h-[25px] max-w-[35px] max-h-[35px] cursor-pointer rounded-lg overflow-hidden object-cover aspect-auto"
												onClick={() => {
													openModal({
														title: `${seed.teams[1]?.name} [${seed.teams[1]?.department}]`,
														children: () => {
															return (
																<div className="flex items-center justify-center">
																	<img
																		src={_uriImgPlayer2}
																		width="150"
																		alt={seed.teams[1]?.name}
																		height="150"
																		className="w-[300px] h-[300px] cursor-pointer object-contain aspect-auto rounded-lg"
																		onClick={() => {
																			window.open(_uriImgPlayer2, '_blank');
																		}}
																	/>
																</div>
															);
														},
													});
												}}
											/>
											<div className="flex flex-col items-start">
												<input
													type="text"
													value={
														(seed.teams[1]?.name || '-') +
														`${
															seed?.teams[1]?.department
																? ` [${seed?.teams[1]?.department}]`
																: ''
														}`
													}
													className={`bg-opacity-30 py-2 w-[200px] outline-none border-none text-[14px] ${
														desc_bypass ? 'text-blue-500' : textWin
													} ${
														desc_bypass ? 'bg-blue-500' : bgWin
													} font-bold p-[2px] rounded-tl-md rounded-br-md text-center`}
												/>
											</div>
										</div>
									)}
								</div>
								{_checkWinFinal ? (
									<div className="w-[40px] h-[35px]">
										<img
											src="./crown-vector.png"
											width="35"
											height="35"
											className="w-full h-full aspect-auto object-contain"
										/>
									</div>
								) : (
									<input
										type="text"
										defaultValue={
											bypass
												? '-'
												: score0 || score0 === 0
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
										className={`w-[50px] bg-opacity-30 py-2 outline-none border-none text-[14px] ${textWin} ${bgWin} font-bold p-[2px] rounded-tr-md rounded-bl-md text-center`}
										disabled={_checkDisabled || disabled}
										readOnly={_checkDisabled || disabled}
									/>
								)}
							</div>
							{desc_bypass && !_checkWinFinal && (
								<div className="text-[13px] italic text-blue-500 m-1">
									{desc_bypass}
								</div>
							)}
						</div>
					</SeedItem>
				)}
			</Seed>
		);
	};

	return (
		<>
			{rounds?.length > 0 ? (
				<Bracket
					mobileBreakpoint={0} // clear
					bracketClassName="flex flex-row gap-[50px]"
					rounds={rounds}
					roundTitleComponent={(title, roundIndex) => {
						const _checkWinner = title === 'WINNER';
						return (
							<div className="flex flex-row gap-2 items-center justify-center">
								<div
									className={`font-bold text-center uppercase ${
										_checkWinner ? 'text-[#fcbd4a]' : 'text-green-500'
									}`}
								>
									{title}
								</div>
								{_checkWinner && (
									<img
										src="./crown-vector.png"
										width="35"
										height="35"
										className="w-[35px] h-[35px] aspect-auto object-contain"
									/>
								)}
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
