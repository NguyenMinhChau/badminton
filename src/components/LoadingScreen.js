'use client';
import React from 'react';
import { useAppContext } from '../../hooks';
import { actions } from '../../context';
import useToggle from '@/utils/useToogle';

export function LoadingScreen() {
	const { dispatch } = useAppContext();
	const { _setSubmitting } = useToggle();

	const closeLoading = () => {
		_setSubmitting();
		dispatch(
			actions.SET_TOGGLE_PAYLOAD({
				key: 'isLoading',
				value: false,
			}),
		);
	};

	return (
		<div className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
			{/* <div
				className="absolute top-5 right-5 cursor-pointer"
				onClick={closeLoading}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="56"
					height="56"
					viewBox="0 0 24 24"
					fill="#FFFFFF"
				>
					<path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V7h16l.001 12H4z"></path>
					<path d="m15.707 10.707-1.414-1.414L12 11.586 9.707 9.293l-1.414 1.414L10.586 13l-2.293 2.293 1.414 1.414L12 14.414l2.293 2.293 1.414-1.414L13.414 13z"></path>
				</svg>
			</div> */}
			<div className="loader">
				<div className="box box-1">
					<div className="side-left"></div>
					<div className="side-right"></div>
					<div className="side-top"></div>
				</div>
				<div className="box box-2">
					<div className="side-left"></div>
					<div className="side-right"></div>
					<div className="side-top"></div>
				</div>
				<div className="box box-3">
					<div className="side-left"></div>
					<div className="side-right"></div>
					<div className="side-top"></div>
				</div>
				<div className="box box-4">
					<div className="side-left"></div>
					<div className="side-right"></div>
					<div className="side-top"></div>
				</div>
			</div>
		</div>
	);
}
