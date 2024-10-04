import Image from 'next/image';
import heroImg from '../../public/img/badminton_bg.jpg';

export const Hero = () => {
	return (
		<>
			<div className="flex flex-wrap gap-3">
				<div className="flex items-center w-full md:flex-1 lg:w-1/2">
					<div className="max-w-2xl mb-8">
						<h1 className="text-3xl font-bold leading-snug tracking-tight text-white lg:text-3xl lg:leading-tight xl:text-5xl xl:leading-tight">
							FTEL NHẤT - CHƠI CẦU LÔNG CHẤT
						</h1>
						<p className="py-5 text-l leading-normal text-justify text-white lg:text-l xl:text-xl">
							Đây là một chương trình thi đấu cầu lông do FPT
							Telecom tổ chức, nhằm tạo sân chơi thể thao cho cán
							bộ, nhân viên và các thành viên trong công ty.
							Chương trình không chỉ thúc đẩy tinh thần thể dục
							thể thao mà còn gắn kết các đồng nghiệp, tạo nên môi
							trường làm việc tích cực. Với tổng giá trị giải
							thưởng lên đến{' '}
							<b className="text-orange-600">30.000.000 VNĐ</b>,
							đây là cơ hội để các tay vợt thể hiện tài năng và
							nhận được những phần thưởng giá trị từ chương trình.
						</p>

						<div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
							<a
								href="https://drive.google.com/file/d/18GoIzIijEiRHh5PfkBBNLoSD9XiByTC1/view?usp=sharing"
								target="_blank"
								rel="noopener"
								className="px-8 py-4 text-sm font-medium text-center text-white bg-[#ea580c] rounded-md "
							>
								THỂ LỆ CHƯƠNG TRÌNH
							</a>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center w-full md:flex-1 lg:w-1/2">
					<div className="">
						<Image
							src={heroImg}
							width="616"
							height="617"
							className={'aspect-auto rounded-xl overflow-hidden'}
							alt="Background Image"
							loading="eager"
							placeholder="blur"
						/>
					</div>
				</div>
			</div>
		</>
	);
};
