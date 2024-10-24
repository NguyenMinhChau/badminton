'use client';
import Image from 'next/image';
import React, { useState, useMemo } from 'react';

export const Table = ({
	limitPage = 99999999,
	columns = [],
	data = [],
	title = '',
}) => {
	const rowsLimit = limitPage;
	const [productList, setProductList] = useState(data);
	const [rowsToShow, setRowsToShow] = useState(
		productList.slice(0, rowsLimit),
	);
	const [customPagination, setCustomPagination] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const totalPage = Math.ceil(productList?.length / rowsLimit);
	const nextPage = () => {
		const startIndex = rowsLimit * (currentPage + 1);
		const endIndex = startIndex + rowsLimit;
		const newArray = data.slice(startIndex, endIndex);
		setRowsToShow(newArray);
		setCurrentPage(currentPage + 1);
	};
	const changePage = (value) => {
		const startIndex = value * rowsLimit;
		const endIndex = startIndex + rowsLimit;
		const newArray = data.slice(startIndex, endIndex);
		setRowsToShow(newArray);
		setCurrentPage(value);
	};
	const previousPage = () => {
		const startIndex = (currentPage - 1) * rowsLimit;
		const endIndex = startIndex + rowsLimit;
		const newArray = data.slice(startIndex, endIndex);
		setRowsToShow(newArray);
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		} else {
			setCurrentPage(0);
		}
	};
	useMemo(() => {
		setCustomPagination(
			Array(Math.ceil(productList?.length / rowsLimit)).fill(null),
		);
	}, []);
	const renderPagination = () => {
		const pages = [];

		for (let i = 0; i <= totalPage - 1; i++) {
			if (
				i === 0 ||
				i === totalPage - 1 ||
				(i >= currentPage - 1 && i <= currentPage + 1)
			) {
				pages.push(
					<div
						key={i}
						onClick={() => changePage(i)}
						className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-solid border-[2px] cursor-pointer ${
							currentPage == i
								? 'text-white  bg-[#ea580c] border-[#ea580c]'
								: 'bg-[#5353535a] border-transparent'
						}`}
					>
						{i + 1}
					</div>,
				);
			} else if (
				(i === currentPage - 2 && i > 1) ||
				(i === currentPage + 1 && i < totalPage - 1)
			) {
				pages.push(
					<span
						key={i}
						className="flex items-center justify-center w-[36px] rounded-[6px] h-[36px]"
					>
						...
					</span>,
				);
			}
		}

		return pages;
	};

	React.useEffect(() => {
		setProductList(data);
		setRowsToShow(data?.slice(0, rowsLimit));
	}, [data]);
	return (
		<div className="flex items-center justify-center">
			<div className="w-full">
				{title && (
					<div>
						<h1 className="text-2xl font-bold">{title}</h1>
					</div>
				)}
				<div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none mt-2 rounded-xl overflow-hidden border">
					<table className="table-auto overflow-scroll md:overflow-auto w-full text-left">
						<thead className="rounded-lg text-base font-semibold w-full">
							<tr className="bg-white">
								{columns?.map((column, _idx) => (
									<th
										key={_idx}
										className="p-2 text-[#ea580c] sm:text-base font-bold whitespace-nowrap"
									>
										{column?.Header || '--'}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{rowsToShow?.length > 0 ? (
								rowsToShow?.map((data, index) => {
									return (
										<tr
											className={`${
												index % 2 == 0
													? 'bg-white bg-opacity-10'
													: 'bg-transparent'
											}`}
											key={index}
										>
											{columns?.map((column, idx) => (
												<td
													key={idx}
													className={`p-2 font-normal text-base ${
														index ==
														rowsToShow?.length
															? 'border-y'
															: 'border-t'
													} whitespace-nowrap`}
												>
													{column?.accessor
														? column?.accessor(
																data,
																index,
														  ) || '---'
														: `${
																data?.[
																	column?.key
																] || '---'
														  }`}
												</td>
											))}
										</tr>
									);
								})
							) : (
								<tr>
									<td
										className="text-center py-3 italic"
										colSpan={columns?.length}
									>
										Không có dữ liệu
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				{/* <div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
					<div className="text-lg text-[#ea580c]">
						Hiển thị{' '}
						{currentPage == 0 ? 1 : currentPage * rowsLimit + 1} đến{' '}
						{currentPage == totalPage - 1
							? productList?.length
							: (currentPage + 1) * rowsLimit}{' '}
						trên tổng {productList?.length} mục
					</div>
					<div className="flex">
						<ul
							className="flex justify-center items-center gap-x-[10px] z-30"
							role="navigation"
							aria-label="Pagination"
						>
							<li
								className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${
									currentPage == 0
										? 'bg-[#cccccc] pointer-events-none'
										: ' cursor-pointer'
								}
  `}
								onClick={previousPage}
							>
								<Image
									src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg"
									alt="Previous"
									width="16"
									height="16"
									className="w-[16px] h-[16px]"
								/>
							</li>
							{renderPagination()}
							<li
								className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
									currentPage == totalPage - 1
										? 'bg-[#cccccc] pointer-events-none'
										: ' cursor-pointer'
								}`}
								onClick={nextPage}
							>
								<Image
									src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg"
									alt="Next"
									width="16"
									height="16"
									className="w-[16px] h-[16px]"
								/>
							</li>
						</ul>
					</div>
				</div> */}
			</div>
		</div>
	);
};
