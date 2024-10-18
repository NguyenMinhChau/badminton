/* eslint-disable @next/next/no-img-element */
import React from 'react';

export const Testimonials = ({ data }) => {
	return (
		<div>
			<div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
				{data?.map((item, index) => {
					const { fullName, position, content, image } = { ...item };
					return (
						<div key={index} className="">
							<div className="flex flex-col w-full h-full bg-gray-200 rounded-2xl overflow-hidden">
								<Avatar image={image} name={fullName} title={position} />
								<p className="text-[18px] p-5 pt-0 leading-normal text-black text-justify mt-3">
									<q>{content}</q>
								</p>
							</div>
						</div>
					);
				})}
				{/*
					//lg:col-span-2 xl:col-auto
					<div className="">
						<div className="flex flex-col justify-between w-full h-full bg-gray-200 px-14 rounded-2xl py-14">
							<p className="text-2xl leading-normal text-black">
								Make sure you only pick the{' '}
								<Mark>right sentence</Mark>
								to keep it short and simple.
							</p>

							<Avatar
								image={userOneImg}
								name="Dylan Ambrose"
								title="Lead marketer at Netflix"
							/>
						</div>
					</div>
				 */}
			</div>
		</div>
	);
};

function Avatar(props) {
	return (
		<div className="flex flex-col items-start">
			<div className="w-full h-[300px] relative">
				<div
					className="absolute top-0 right-0 bottom-0 left-0 z-50"
					style={{
						backgroundImage: `url(${props.image})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						backgroundBlendMode: 'overlay',
						filter: 'blur(20px)',
					}}
				></div>
				<img
					src={props.image}
					width="100"
					height="100"
					className="cursor-pointer w-full h-full object-contain aspect-auto absolute top-0 right-0 bottom-0 left-0 z-50"
					alt="Avatar"
					onClick={() => {
						window.open(props?.image, '_blank');
					}}
				/>
			</div>
			<div className="px-5 pt-3">
				<div className="text-lg font-medium text-black">{props.name}</div>
				<div className="text-gray-400">{props.title}</div>
			</div>
		</div>
	);
}

function Mark(props) {
	return (
		<>
			{' '}
			<mark className="text-[#ea580c] bg-[#ea580c3a] rounded-md ring-[#ea580c3a] ring-4">
				{props.children}
			</mark>{' '}
		</>
	);
}
