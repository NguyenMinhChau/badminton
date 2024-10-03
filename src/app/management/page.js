'use client';
import { Container } from '@/components/Container';
import { FileUpload } from '@/components/FileUpload';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import React from 'react';

export default function Management() {
	const [fileDonNam, setFileDonNam] = React.useState(null);
	const [fileDonNu, setFileDonNu] = React.useState(null);
	const [fileDoiNam, setFileDoiNam] = React.useState(null);
	const [fileDoiNu, setFileDoiNu] = React.useState(null);
	const managementData = [
		{
			question: 'ĐƠN NAM',
			color: '#0ea5e9',
			onChange: (files) => {
				setFileDonNam(files?.[0]);
			},
			file: fileDonNam,
		},
		{
			question: 'ĐƠN NỮ',
			color: '#6366f1',
			onChange: (files) => {
				setFileDonNu(files?.[0]);
			},
			file: fileDonNu,
		},
		{
			question: 'ĐÔI NAM',
			color: '#a855f7',
			onChange: (files) => {
				setFileDoiNam(files?.[0]);
			},
			file: fileDoiNam,
		},
		{
			question: 'ĐÔI NỮ',
			color: '#ec4899',
			onChange: (files) => {
				setFileDoiNu(files?.[0]);
			},
			file: fileDoiNu,
		},
	];
	const [dataManagement, setDataManagement] = React.useState(managementData);

	React.useEffect(() => {
		setDataManagement([
			...dataManagement,
			{
				question: 'ĐƠN NAM',
				color: '#0ea5e9',
				onChange: (files) => {
					setFileDonNam(files?.[0]);
				},
				file: fileDonNam,
			},
		]);
	}, [fileDonNam]);
	React.useEffect(() => {
		setDataManagement([
			...dataManagement,
			{
				question: 'ĐƠN NỮ',
				color: '#6366f1',
				onChange: (files) => {
					setFileDonNu(files?.[0]);
				},
				file: fileDonNu,
			},
		]);
	}, [fileDonNu]);
	React.useEffect(() => {
		setDataManagement([
			...dataManagement,
			{
				question: 'ĐÔI NAM',
				color: '#a855f7',
				onChange: (files) => {
					setFileDoiNam(files?.[0]);
				},
				file: fileDoiNam,
			},
		]);
	}, [fileDoiNam]);
	React.useEffect(() => {
		setDataManagement([
			...dataManagement,
			{
				question: 'ĐÔI NỮ',
				color: '#ec4899',
				onChange: (files) => {
					setFileDoiNu(files?.[0]);
				},
				file: fileDoiNu,
			},
		]);
	}, [fileDoiNu]);

	return (
		<Container className="!p-0">
			<div className="w-full p-2 mx-auto rounded-2xl">
				{managementData.map((item, index) => (
					<div key={item.question} className="mb-5">
						<Disclosure>
							{({ open }) => (
								<>
									<DisclosureButton
										className={`flex items-center justify-between w-full px-4 py-4 text-l text-left text-white rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75`}
										style={{
											backgroundColor: item.color,
										}}
									>
										<span>{item.question}</span>
										<ChevronUpIcon
											className={`${
												open
													? 'transform rotate-180'
													: ''
											} w-5 h-5 text-white`}
										/>
									</DisclosureButton>
									<DisclosurePanel className="px-4 pt-4 pb-2 text-white bg-black bg-opacity-30 rounded-lg">
										{item?.file && (
											<div className="p-2 rounded-lg flex flex-row items-center gap-2 bg-white mb-3">
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
										<FileUpload
											color={item.color}
											onChangeFile={(files) => {
												item?.onChange(files);
											}}
										/>
									</DisclosurePanel>
								</>
							)}
						</Disclosure>
					</div>
				))}
			</div>
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
