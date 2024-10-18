/* eslint-disable @next/next/no-img-element */
'use client';
import { Container } from '@/components/Container';
import { Table } from '@/components/Table';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react';
import React from 'react';
import { useListUserJoin } from './hooks';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useModal } from '../../../hooks';
import { getDriveIdBeforeView } from '@/utils/helpers';

export default function ListUsersJoin() {
	const { _submitting, user_list_join, CallApiGetListPlayers } =
		useListUserJoin();
	const { openModal } = useModal();
	const { donNam, donNu, doiNam, doiNu, doiNamNu } = { ...user_list_join };

	const _columns = [
		{
			key: 'index',
			Header: 'STT',
			accessor: (row, index) => {
				return (
					<div className="flex flex-col gap-3">
						<div>{index + 1 || '---'}</div>
					</div>
				);
			},
		},
		{
			key: 'image',
			Header: 'Ảnh',
			accessor: (row) => {
				const _uriImgPlayer1 =
					getDriveIdBeforeView(row?.imagePlayer1) ||
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPHVvfXupg0nld10nBo2PfTM6Zi_l-CUy1GQ&s';
				const _uriImgPlayer2 =
					getDriveIdBeforeView(row?.imagePlayer2) ||
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPHVvfXupg0nld10nBo2PfTM6Zi_l-CUy1GQ&s';
				return (
					<div className="flex flex-col gap-1">
						<img
							src={_uriImgPlayer1}
							width="45"
							alt={row.player1}
							height="45"
							className="min-w-[25px] min-h-[25px] max-w-[35px] max-h-[35px] cursor-pointer rounded-full overflow-hidden object-cover aspect-auto"
							onClick={() => {
								openModal({
									title: `${row?.player1} [${row?.department1}]`,
									children: () => {
										return (
											<div className="flex items-center justify-center">
												<img
													src={_uriImgPlayer1}
													width="150"
													alt={row.player1}
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
						{row.player2 &&
							!row?.noiDungDangKy?.toLowerCase()?.includes('đơn') && (
								<img
									src={_uriImgPlayer2}
									width="45"
									alt={row.player2}
									height="45"
									className="min-w-[25px] min-h-[25px] max-w-[35px] max-h-[35px] cursor-pointer rounded-full overflow-hidden object-cover aspect-auto"
									onClick={() => {
										openModal({
											title: `${row?.player2} [${row?.department2}]`,
											children: () => {
												return (
													<div className="flex items-center justify-center">
														<img
															src={_uriImgPlayer2}
															width="150"
															alt={row.player2}
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
							)}
					</div>
				);
			},
		},
		{
			key: 'player1',
			Header: 'Họ và tên',
			accessor: (row) => {
				return (
					<div className="flex flex-col gap-4 w-full justify-between">
						<div>{row.player1 || '---'}</div>
						{row.player2 &&
							!row?.noiDungDangKy?.toLowerCase()?.includes('đơn') && (
								<div>{row.player2}</div>
							)}
					</div>
				);
			},
		},
		{
			key: 'department1',
			Header: 'Phòng ban',
			accessor: (row) => {
				return (
					<div className="flex flex-col gap-4 w-full justify-between">
						<div>{row.department1 || '---'}</div>
						{row.player2 &&
							!row?.noiDungDangKy?.toLowerCase()?.includes('đơn') && (
								<div>{row.department2 || '---'}</div>
							)}
					</div>
				);
			},
		},
	];

	const managementData = [
		{
			question: 'ĐƠN NAM',
			color: '#0ea5e9',
			file: null,
			data: donNam || [],
			columns: _columns,
		},
		{
			question: 'ĐƠN NỮ',
			color: '#6366f1',
			file: null,
			data: donNu || [],
			columns: _columns,
		},
		{
			question: 'ĐÔI NAM',
			color: '#a855f7',
			file: null,
			data: doiNam || [],
			columns: _columns,
		},
		{
			question: 'ĐÔI NỮ',
			color: '#ec4899',
			file: null,
			data: doiNu || [],
			columns: _columns,
		},
		{
			question: 'ĐÔI NAM NỮ',
			color: '#059669',
			file: null,
			data: doiNamNu || [],
			columns: _columns,
		},
	];

	React.useEffect(() => {
		CallApiGetListPlayers();
	}, []);

	const [dataManagement, setDataManagement] = React.useState(managementData);

	React.useEffect(() => {
		setDataManagement(managementData);
	}, [user_list_join]);

	return (
		<>
			{_submitting && <LoadingScreen />}
			<Container className="!p-1">
				{/* <div className="sticky top-2 right-2 z-50 w-full flex flex-col items-end justify-end">
					<div className="flex flex-row flex-wrap gap-2 items-center">
						<button
							className="px-6 py-2 text-[#ea580c] bg-white rounded-md font-bold disabled:bg-gray-400 disabled:text-white"
							onClick={handleDownloadFileTemplate}
							disabled={disabled}
						>
							Tải template danh sách
						</button>
						<button
							className="px-6 py-2 text-blue-500 bg-white rounded-md font-bold disabled:bg-gray-400 disabled:text-white"
							onClick={handleUploadFileTemplate}
							disabled={disabled}
						>
							Upload template danh sách
						</button>
					</div>
				</div> */}
				{dataManagement.map((item, index) => (
					<div key={index} className="mb-10 w-full">
						<Disclosure defaultOpen={index === 0}>
							{({ open }) => (
								<>
									<div className="flex flex-row">
										<DisclosureButton
											className={`flex items-center justify-between font-bold w-full px-2 py-3 text-l text-left rounded-tl-lg rounded-bl-lg  focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75`}
											style={{
												color: '#FFF',
											}}
										>
											<span className="text-xl underline">
												NỘI DUNG: {item.question}
											</span>
										</DisclosureButton>
									</div>
									<DisclosurePanel className="text-white rounded-lg">
										{item?.file && (
											<div className="p-2 rounded-lg flex flex-row items-center gap-2 bg-gray-200 mt-2">
												<div className="text-green-500">
													<SheetSVG />
												</div>
												<div className="flex flex-col flex-1">
													<span className="text-gray-500 text-[13px] font-bold">
														{item?.file?.name}
													</span>
													<span className="text-gray-500 text-[13px]">
														Size:{' '}
														{(item?.file?.size / (1024 * 1024)).toFixed(2)} MB
													</span>
												</div>
											</div>
										)}
										<Table columns={item.columns} data={item.data} />
									</DisclosurePanel>
								</>
							)}
						</Disclosure>
					</div>
				))}
			</Container>
		</>
	);
}

const SheetSVG = ({ size = 28 }) => (
	<svg
		role="img"
		width={size}
		height={size}
		fill="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<title>Google Sheets</title>
		<path d="M11.318 12.545H7.91v-1.909h3.41v1.91zM14.728 0v6h6l-6-6zm1.363 10.636h-3.41v1.91h3.41v-1.91zm0 3.273h-3.41v1.91h3.41v-1.91zM20.727 6.5v15.864c0 .904-.732 1.636-1.636 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.318v6.5h6.5zm-3.273 2.773H6.545v7.909h10.91v-7.91zm-6.136 4.636H7.91v1.91h3.41v-1.91z" />
	</svg>
);
