import Image from 'next/image';
import React from 'react';

import userOneImg from '../../public/img/user1.jpg';

export const Testimonials = () => {
	return (
		<div>
			<div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
				<div className="lg:col-span-2 xl:col-auto">
					<div className="flex flex-col justify-between w-full h-full bg-gray-200 px-14 rounded-2xl py-14">
						<p className="text-2xl leading-normal text-black">
							Share a real <Mark>testimonial</Mark>
							that hits some of your benefits from one of your
							popular customer.
						</p>

						<Avatar
							image={userOneImg}
							name="Sarah Steiner"
							title="VP Sales at Google"
						/>
					</div>
				</div>
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
				<div className="">
					<div className="flex flex-col justify-between w-full h-full bg-gray-200 px-14 rounded-2xl py-14">
						<p className="text-2xl leading-normal text-black">
							This is an <Mark>awesome</Mark> landing page
							template I&apos;ve seen. I would use this for
							anything.
						</p>

						<Avatar
							image={userOneImg}
							name="Gabrielle Winn"
							title="Co-founder of Acme Inc"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

function Avatar(props) {
	return (
		<div className="flex items-center mt-8 space-x-3">
			<div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
				<Image
					src={props.image}
					width="40"
					height="40"
					alt="Avatar"
					placeholder="blur"
				/>
			</div>
			<div>
				<div className="text-lg font-medium text-black">
					{props.name}
				</div>
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
