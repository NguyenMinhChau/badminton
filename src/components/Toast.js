'use client';

import React from 'react';
import { useAppContext, useToast } from '../../hooks';

export const Toast = () => {
	const { state } = useAppContext();
	const { closeToast } = useToast();
	const { visible, type, message } = state.set_data.toast;

	React.useEffect(() => {
		if (visible) {
			const _id = setTimeout(() => {
				closeToast();
			}, 5000);
			return () => clearTimeout(_id);
		}
	}, [visible]);

	return (
		<>
			{visible && (
				<div
					id="toast-default"
					class="flex fixed top-5 right-5 z-50 items-center w-full max-w-xs p-4 text-black bg-white rounded-lg shadow "
					role="alert"
				>
					<div
						class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg"
						style={{
							backgroundColor:
								OPTIONS_BY_TOAST[type].backgroundColor,
							color: OPTIONS_BY_TOAST[type].textColor,
						}}
					>
						{OPTIONS_BY_TOAST[type].renderSVG()}
					</div>
					<div class="ms-3 text-sm font-normal">{message}</div>
					<button
						type="button"
						class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
						data-dismiss-target="#toast-default"
						aria-label="Đóng"
						onClick={() => {
							closeToast();
						}}
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
					</button>
				</div>
			)}
		</>
	);
};

export const TYPE_TOAST = {
	SUCCESS: 'SUCCESS',
	WARNING: 'WARNING',
	INFO: 'INFO',
	ERROR: 'ERROR',
};

const OPTIONS_BY_TOAST = {
	[TYPE_TOAST.SUCCESS]: {
		textColor: '#22c55e',
		backgroundColor: '#dcfce7',
		renderSVG: () => (
			<svg
				class="w-5 h-5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
			</svg>
		),
	},
	[TYPE_TOAST.WARNING]: {
		textColor: '#f97316',
		backgroundColor: '#ffedd5',
		renderSVG: () => (
			<svg
				class="w-5 h-5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
			</svg>
		),
	},
	[TYPE_TOAST.INFO]: {
		textColor: '#3b82f6',
		backgroundColor: '#dbeafe',
		renderSVG: () => (
			<svg
				class="w-5 h-5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
			</svg>
		),
	},
	[TYPE_TOAST.ERROR]: {
		textColor: '#ef4444',
		backgroundColor: '#fee2e2',
		renderSVG: () => (
			<svg
				class="w-5 h-5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
			</svg>
		),
	},
};
