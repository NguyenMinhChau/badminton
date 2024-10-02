import React from 'react';

export function LoadingScreen() {
	return (
		<div className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-black bg-opacity-50 flex flex-col gap-[60px] items-center justify-center">
			<div className="absolute top-5 right-5" onClick={() => {}}>
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
			</div>
			<div class="loader">
				<div class="box box-1">
					<div class="side-left"></div>
					<div class="side-right"></div>
					<div class="side-top"></div>
				</div>
				<div class="box box-2">
					<div class="side-left"></div>
					<div class="side-right"></div>
					<div class="side-top"></div>
				</div>
				<div class="box box-3">
					<div class="side-left"></div>
					<div class="side-right"></div>
					<div class="side-top"></div>
				</div>
				<div class="box box-4">
					<div class="side-left"></div>
					<div class="side-right"></div>
					<div class="side-top"></div>
				</div>
			</div>
			<div className="bg-transparent text-white">
				Đang xử lý dữ liệu, vui lòng đợi...
			</div>
		</div>
	);
}
