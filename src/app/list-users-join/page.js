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

const data = [
	{
		image: 'https://plus.unsplash.com/premium_photo-1728033936981-600bffc3fda4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D',
		full_name: 'Nguyễn Văn A',
		phone: '0398.365.xxx',
	},
	{
		image: 'https://images.unsplash.com/photo-1726293993561-ae9901d8c6d0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
		full_name: 'Nguyễn Văn B',
		phone: '0398.365.xxx',
	},
];
const _columns = [
	{
		key: 'image',
		Header: 'Ảnh',
		accessor: (row) => {
			return (
				<img
					src={row.image}
					width="50"
					alt={row.full_name}
					height="50"
					className="w-[50px] h-[50px] cursor-pointer rounded-full overflow-hidden object-fill aspect-auto"
					onClick={() => {
						window.open(row.image, '_blank');
					}}
				/>
			);
		},
	},
	{
		key: 'full_name',
		Header: 'Họ và tên',
	},
	{
		key: 'phone',
		Header: 'Số điện thoại',
	},
];

export default function ListUsersJoin() {
	const managementData = [
		{
			question: 'ĐƠN NAM',
			color: '#0ea5e9',
			file: null,
			data: data,
			columns: _columns,
		},
		{
			question: 'ĐƠN NỮ',
			color: '#6366f1',
			file: null,
			data: data,
			columns: _columns,
		},
		{
			question: 'ĐÔI NAM',
			color: '#a855f7',
			file: null,
			data: data,
			columns: _columns,
		},
		{
			question: 'ĐÔI NỮ',
			color: '#ec4899',
			file: null,
			data: data,
			columns: _columns,
		},
		{
			question: 'ĐÔI NAM NỮ',
			color: '#059669',
			file: null,
			data: data,
			columns: _columns,
		},
	];

	const [dataManagement, setDataManagement] = React.useState(managementData);

	return (
		<Container className="!p-0">
			{dataManagement.map((item, index) => (
				<div key={index} className="mb-5 w-full">
					<Disclosure defaultOpen={true}>
						{({ open }) => (
							<>
								<div className="flex flex-row">
									<DisclosureButton
										className={`flex items-center bg-gray-200 justify-between font-bold w-full px-2 py-3 text-l text-left rounded-tl-lg rounded-bl-lg  focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75`}
										style={{
											color: item.color,
										}}
									>
										<span>{item.question}</span>
										<ChevronUpIcon
											className={`${
												open
													? 'transform rotate-180'
													: ''
											} w-5 h-5 font-bold`}
											style={{
												color: item.color,
											}}
										/>
									</DisclosureButton>
									<FileUploadSmall
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
										className="rounded-tl-none rounded-bl-none px-[6px] rounded-tr-lg rounded-br-lg border-0 border-l-2 h-full"
									/>
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
