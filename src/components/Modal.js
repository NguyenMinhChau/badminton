'use client';

import React from 'react';
import { useAppContext, useModal } from '../../hooks';
import Image from 'next/image';
import { isExist } from '@/utils/helpers';

export const Modal = () => {
	const { state } = useAppContext();
	const { closeModal } = useModal();
	const { showSubmitted, funcSubmitted, funcCancel, visible, title, children } =
		state.set_data.modal;
	return (
		<>
			{visible && (
				<div
					tabindex="-1"
					class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-30 flex"
				>
					<div class="relative p-4 w-full max-w-md max-h-full">
						<div class="relative rounded-lg shadow bg-gray-700">
							<button
								type="button"
								class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-hide="popup-modal"
								onClick={closeModal}
							>
								<svg
									class="w-3 h-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
								<span class="sr-only">Đóng</span>
							</button>
							<div class="p-4 md:p-5 text-center">
								<div className="flex items-center justify-center mb-5">
									<Image
										src="/fpt-logo.png"
										width="130"
										alt="FPT TELECOM"
										height="130"
										className="w-[130px]"
									/>
								</div>
								<h3 class="mb-3 text-lg font-normal text-white">{title}</h3>
								{children && <div className="mb-2">{children()}</div>}
								<button
									data-modal-hide="popup-modal"
									type="button"
									class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
									onClick={() => {
										funcCancel && funcCancel();
										closeModal();
									}}
								>
									Đóng
								</button>
								{showSubmitted && (
									<button
										data-modal-hide="popup-modal"
										type="button"
										class="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-blue-500 rounded-lg  hover:bg-blue-800 focus:z-10 focus:ring-4 focus:ring-blue-800"
										onClick={() => {
											funcSubmitted && funcSubmitted();
											closeModal();
										}}
									>
										Xác nhận
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
