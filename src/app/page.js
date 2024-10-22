'use client';
import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { SectionTitle } from '@/components/SectionTitle';
import { Benefits } from '@/components/Benefits';
import { Testimonials } from '@/components/Testimonials';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useAppContext } from '../../hooks/';
import prizeStructureImg from '../../public/img/prize_structure.png';

import { benefitOne } from '@/components/data';
import Image from 'next/image';
import useToggle from '@/utils/useToogle';

const DATA_TESTIMONIALS = [
	{
		fullName: 'Anh Hoàng Mạnh Thắng',
		position: 'Phó GĐ Trung tâm Kinh doanh CCD FTI - FPT Telecom',
		content:
			'Chơi cầu lông cũng như làm kinh doanh, không phải cứ đập mạnh là thắng, mà phải biết tính toán để đưa cầu vào đúng chỗ! Đập cầu giống như chốt hợp đồng: lúc nào cũng phải đúng thời điểm.',
		image: 'https://i.imgur.com/IM2xONq.jpeg',
	},
	{
		fullName: 'Chị Đỗ Xuân Anh',
		position: 'Trưởng ban Truyền thông FPT Telecom',
		content:
			'Vui nhất ở giải đấu này không phải là đi thi lấy giải, mà bất ngờ khám phá nhiều đồng môn yêu thích cầu lông ngay tại FTEL. Thế là trong Ban cùng thống nhất  đánh cầu với nhau 1 lần/tuần, cùng nhau khỏe, giảm cân thon thả, dành thời gian cho nhau, không còn khoảng cách sếp- nhân viên sau giờ làm.',
		image: 'https://i.imgur.com/yplot6j.png',
	},
	{
		fullName: 'Anh Trần Văn Tùng',
		position: 'Cán bộ Quản lý Hạ tầng INF - Chi nhánh FPT Telecom Nghệ An',
		content:
			'Mình không ngại vào Sài Gòn, mình chỉ cần lý do....Khoảng cách địa lý không là vấn đề khi bạn muốn chơi cầu và kết nối, giao lưu học hỏi cùng các đồng nghiệp FTEL. Cầu lông không chỉ là một môn thể thao, mà còn là một cách sống.',
		image: 'https://i.imgur.com/A32kZ8m.jpeg',
	},
];

export default function Home() {
	const { state } = useAppContext();
	const { isLoading } = state.set_toggle;
	const { _submitting } = useToggle();
	return (
		<>
			{(isLoading || _submitting) && <LoadingScreen />}
			<Container>
				<Hero />

				<SectionTitle
					preTitle="PRIZE STRUCTURE"
					title="CƠ CẤU GIẢI THƯỞNG"
				></SectionTitle>

				<div className="flex items-center justify-center w-full">
					<div className="">
						<Image
							src={prizeStructureImg}
							width="1000"
							height="617"
							className={'aspect-auto rounded-xl overflow-hidden'}
							alt="Background Image"
							loading="eager"
							placeholder="blur"
						/>
					</div>
				</div>

				<SectionTitle preTitle="BENEFITS" title="LỢI ÍCH KHI THAM GIA">
					Chơi cầu lông mang lại nhiều lợi ích cả về sức khỏe và tinh thần. Dưới
					đây là một số lợi ích chính
				</SectionTitle>

				<Benefits data={benefitOne} />

				<SectionTitle
					preTitle="SHARE"
					title="NHỮNG CHIA SẺ THÚ VỊ"
				></SectionTitle>
				<Testimonials data={DATA_TESTIMONIALS} />

				{/* <Benefits imgPos="right" data={benefitTwo} /> */}
				{/* <Video videoId="fZ0D0cnR88E" /> */}
				{/* <SectionTitle preTitle="FAQ " title="CÁC CÂU HỎI THƯỜNG GẶP">
					Giúp cho người dùng có thể biết được những thắc mắc mà mình
					đang gặp phải về chương trình
				</SectionTitle>
				<Faq /> */}

				<SectionTitle preTitle="" title="ĐƠN VỊ TỔ CHỨC"></SectionTitle>

				<div className="flex flex-col justify-center">
					<div className="flex flex-wrap items-center justify-center gap-10 md:justify-center">
						<div className="pt-2 text-gray-400">
							<Image
								src="/fpt-logo.png"
								width="130"
								alt="INF LOGO"
								height="130"
								className="w-[130px]"
							/>
						</div>
						<div className="pt-2 text-gray-400">
							<Image
								src="/FUN_Logo.png"
								width="130"
								alt="FUN LOGO"
								height="120"
								className="w-[120px]"
							/>
						</div>
					</div>
				</div>
				<SectionTitle preTitle="" title="ĐƠN VỊ ĐỒNG HÀNH"></SectionTitle>
				<div className="flex flex-col justify-center">
					<div className="flex flex-wrap items-center justify-center gap-10 md:justify-center">
						<div className="pt-2 text-gray-400">
							<Image
								src="/sponsors/INF_logo.png"
								width="130"
								alt="INF LOGO"
								height="120"
								className="w-[120px]"
							/>
						</div>
						<div className="pt-2 text-gray-400 flex bg-white rounded-xl bg-opacity-10 flex-col items-center justify-center">
							<div className="font-bold text-[20px] text-yellow-500">
								NHÀ TÀI TRỢ VÀNG
							</div>
							<Image
								src="/sponsors/play_logo.png"
								width="130"
								alt="PLAY LOGO"
								height="120"
								className="w-[230px]"
							/>
						</div>
						<div className="pt-2 text-gray-400">
							<Image
								src="/sponsors/pocari_logo_transparent.png"
								width="130"
								alt="POCARI LOGO"
								height="100"
								className="w-[100px]"
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
