import Image from 'next/image';
import React from 'react';

export const Benefits = (props) => {
	const { data } = props;
	return (
		<div className="flex flex-wrap mb-10 lg:gap-10 lg:flex-nowrap">
			{/* <div
				className={`flex items-center justify-center w-full lg:w-1/2 ${
					props.imgPos === 'right' ? 'lg:order-1' : ''
				}`}
			>
				<div>
					<Image
						src={data.image}
						width={521}
						height={521}
						alt="Benefits Image"
						className={'object-cover'}
						placeholder="blur"
						blurDataURL={data.image.src}
					/>
				</div>
			</div> */}

			<div
				// lg:w-1/2 ${data.imgPos === 'right' ? 'lg:justify-end' : ''}
				className={`flex flex-wrap items-center w-full`}
			>
				<div>
					{(data?.title || data?.desc) && (
						<div className="flex flex-col w-full mt-4">
							<h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-white lg:leading-tight lg:text-4xl">
								{data.title}
							</h3>

							<p className="max-w-2xl py-4 text-lg leading-normal text-white lg:text-xl xl:text-xl">
								{data.desc}
							</p>
						</div>
					)}

					{/* add: flex flex-row flex-wrap */}
					<div className="flex flex-row flex-wrap w-full mt-5">
						{data.bullets.map((item, index) => (
							<Benefit
								key={index}
								title={item.title}
								icon={item.icon}
							>
								{item.desc}
							</Benefit>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

function Benefit(props) {
	return (
		<div className="flex items-start mt-8 space-x-3">
			<div className="flex items-center justify-center flex-shrink-0 mt-1 bg-[#ea580c] rounded-md w-11 h-11 ">
				{React.cloneElement(props.icon, {
					className: 'w-7 h-7 text-indigo-50',
				})}
			</div>
			<div>
				<h4 className="text-xl font-medium text-white">
					{props.title}
				</h4>
				<p className="mt-1 text-gray-300">{props.children}</p>
			</div>
		</div>
	);
}
