import React from 'react';
import { Container } from '@/components/Container';

export const SectionTitle = (props) => {
	return (
		<div
			className={`flex w-full flex-col mt-10 mb-5 ${
				props.align === 'left'
					? ''
					: 'items-center justify-center text-center'
			}`}
		>
			{/* {props.preTitle && (
				<div className="text-sm font-bold tracking-wider text-[#ea580c] uppercase">
					{props.preTitle}
				</div>
			)} */}

			{props.title && (
				<h2 className="max-w-2xl mt-3 text-2xl font-bold leading-snug tracking-tight text-white lg:leading-tight lg:text-4xl">
					{props.title}
				</h2>
			)}

			{props.children && (
				<p className="max-w-2xl py-4 text-l leading-normal text-white lg:text-xl xl:text-xl">
					{props.children}
				</p>
			)}
		</div>
	);
};
