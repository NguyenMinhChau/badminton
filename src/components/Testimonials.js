import React from 'react';

export const Testimonials = ({ data }) => {
	return (
		<div>
			<div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
				{data?.map((item, index) => {
					const { fullName, position, content, image } = { ...item };
					return (
						<div key={index} className="lg:col-span-2 xl:col-auto">
							<div className="flex flex-col justify-between w-full h-full bg-gray-200 px-14 rounded-2xl py-14">
								<p className="text-2xl leading-normal text-black">
									{content}
								</p>

								<Avatar
									image={image}
									name={fullName}
									title={position}
								/>
							</div>
						</div>
					);
				})}
				{/* s
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
		<div className="flex items-center mt-8 space-x-3">
			<div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
				<img
					src={props.image}
					width="40"
					height="40"
					className="cursor-pointer"
					alt="Avatar"
					onClick={() => {
						window.open(props?.image, '_blank');
					}}
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
