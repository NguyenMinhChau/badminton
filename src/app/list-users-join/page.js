'use client';
import { Container } from '@/components/Container';
import { Table } from '@/components/Table';
import { FileUploadSmall } from '@/components/FileUploadSmall';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { useListUserJoin } from './hooks';
import { LoadingScreen } from '@/components/LoadingScreen';

const _columns = [
	{
		key: 'index',
		Header: 'STT',
		accessor: (row, index) => {
			return (
				<div className="flex flex-col gap-3">
					<div>
						{index +
							(!row?.noiDungDangKy?.toLowerCase()?.includes('đơn')
								? index === 0
									? 1
									: index + 1
								: 1) || '---'}
					</div>
					{row.player2 &&
						!row?.noiDungDangKy?.toLowerCase()?.includes('đơn') && (
							<div>
								{index +
									(!row?.noiDungDangKy
										?.toLowerCase()
										?.includes('đơn')
										? index === 0
											? 2
											: index + 2
										: 2) || '---'}
							</div>
						)}
				</div>
			);
		},
	},
	{
		key: 'image',
		Header: 'Ảnh',
		accessor: (row) => {
			return (
				<div className="flex flex-col gap-3">
					<img
						src={
							row.image ||
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPHVvfXupg0nld10nBo2PfTM6Zi_l-CUy1GQ&s'
						}
						width="35"
						alt={row.full_name}
						height="35"
						className="w-[35px] h-[35px] cursor-pointer rounded-full overflow-hidden object-fill aspect-auto"
						onClick={() => {
							window.open(row.image, '_blank');
						}}
					/>
					{row.player2 &&
						!row?.noiDungDangKy?.toLowerCase()?.includes('đơn') && (
							<img
								src={
									row.image ||
									'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPHVvfXupg0nld10nBo2PfTM6Zi_l-CUy1GQ&s'
								}
								width="35"
								alt={row.full_name}
								height="35"
								className="w-[35px] h-[35px] cursor-pointer rounded-full overflow-hidden object-fill aspect-auto"
								onClick={() => {
									window.open(row.image, '_blank');
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
				<div className="flex flex-col gap-6 w-full justify-between">
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
				<div className="flex flex-col gap-6 w-full justify-between">
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

export default function ListUsersJoin() {
	const { _submitting, user_list_join, CallApiGetListPlayers } =
		useListUserJoin();
	const { donNam, donNu, doiNam, doiNu, doiNamNu } = { ...user_list_join };
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
			<Container className="!p-0">
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
											{/* <ChevronUpIcon
												className={`${
													open
														? 'transform rotate-180'
														: ''
												} w-5 h-5 font-bold`}
												style={{
													color: item.color,
												}}
											/> */}
										</DisclosureButton>
										{/* <FileUploadSmall
											color={item.color}
											onChange={(files) => {
												const _newDataManagement = [
													...dataManagement,
												];
												_newDataManagement[index].file =
													files[0];
												setDataManagement(
													_newDataManagement,
												);
											}}
											className="px-[12px] border-none h-full"
										/> */}
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
														{(
															item?.file?.size /
															(1024 * 1024)
														).toFixed(2)}{' '}
														MB
													</span>
												</div>
											</div>
										)}
										<Table
											columns={item.columns}
											data={item.data}
										/>
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
