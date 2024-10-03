'use client';
import React from 'react';
import { Container } from '@/components/Container';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

export const Faq = () => {
	return (
		<Container className="!p-0">
			<div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
				{faqdata.map((item, index) => (
					<div key={item.question} className="mb-5">
						<Disclosure>
							{({ open }) => (
								<>
									<DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-l text-left text-black rounded-lg bg-gray-200 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75">
										<span>{item.question}</span>
										<ChevronUpIcon
											className={`${
												open
													? 'transform rotate-180'
													: ''
											} w-5 h-5 text-[#ea580c]`}
										/>
									</DisclosureButton>
									<DisclosurePanel className="px-4 pt-4 pb-2 text-white">
										{item.answer}
									</DisclosurePanel>
								</>
							)}
						</Disclosure>
					</div>
				))}
			</div>
		</Container>
	);
};

const faqdata = [
	{
		question: 'Is this template completely free to use?',
		answer: 'Yes, this template is completely free to use.',
	},
];
