'use client';
export const FileUpload = ({ color, onChangeFile, file }) => {
	return (
		<div className="flex items-center justify-center w-full">
			<label
				for="dropzone-file"
				className="flex flex-col items-center justify-center w-full h-64 border-2 bg-gray-200 border-dashed rounded-lg cursor-pointer"
				style={{
					borderColor: color,
				}}
			>
				<div className="flex flex-col items-center justify-center pt-5 pb-6">
					<svg
						className="w-8 h-8 mb-4"
						style={{
							color: color,
						}}
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 16"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
						/>
					</svg>
					<p
						className="mb-2 text-sm text-center"
						style={{
							color: color,
						}}
					>
						<span className="font-semibold">
							Nhấn vào để upload file
						</span>{' '}
						hoặc kéo thả file tại đây
					</p>
					<p
						className="text-xs text-center"
						style={{
							color: color,
						}}
					>
						File được tải lên: Excel
					</p>
				</div>
				<input
					id="dropzone-file"
					type="file"
					className="hidden"
					onChange={(e) => {
						onChangeFile(e.target.files);
					}}
					accept=".xlsx,.xls"
				/>
			</label>
		</div>
	);
};
