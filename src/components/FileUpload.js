'use client';
export const FileUpload = ({ color, onChangeFile, file }) => {
	return (
		<div class="flex items-center justify-center w-full">
			<label
				for="dropzone-file"
				class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer"
				style={{ backgroundColor: color + '3a', borderColor: color }}
			>
				<div class="flex flex-col items-center justify-center pt-5 pb-6">
					<svg
						class="w-8 h-8 mb-4 text-white"
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
					<p class="mb-2 text-sm text-white text-center">
						<span class="font-semibold">
							Nhấn vào để upload file
						</span>{' '}
						hoặc kéo thả file tại đây
					</p>
					<p class="text-xs text-center text-white">
						File được tải lên: Excel
					</p>
				</div>
				<input
					id="dropzone-file"
					type="file"
					class="hidden"
					onChange={(e) => {
						onChangeFile(e.target.files);
					}}
					accept=".xlsx,.xls"
				/>
			</label>
		</div>
	);
};
