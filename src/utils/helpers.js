export const isExist = (val) => {
	if (Array.isArray(val)) {
		return (
			val.length > 0 &&
			val?.[0] !== '' &&
			val?.[0] !== null &&
			val?.[0] !== undefined &&
			`${val?.[0]}`?.toLowerCase() !== 'undefined' &&
			`${val?.[0]}`?.toLowerCase() !== 'null' &&
			`${val?.[0]}`?.toLowerCase() !== 'none'
		);
	}

	if (typeof val === 'object') {
		return Object?.keys(val || {}).length > 0;
	}

	if (typeof val === 'number') {
		return true; // Accepts numbers including 0
	}

	return (
		val !== undefined &&
		val !== null &&
		`${val}`?.toLowerCase() !== 'undefined' &&
		`${val}`?.toLowerCase() !== 'null' &&
		`${val}`?.toLowerCase() !== 'none' &&
		val?.length > 0
	);
};

export function getDriveIdBeforeView(url) {
	const regex1 = /\/d\/([^/]+)/;
	const regex2 = /(?:id=|\/d\/)([\w-]+)/;
	const match = `${url}`?.match(regex1) || `${url}`?.match(regex2);
	if (match) {
		return 'https://drive.google.com/thumbnail?id=' + match[1]; // Trả về chuỗi ID trước /view
	}
	return url; // Không tìm thấy ID
}

export default function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export const fList = (list, func = (i) => i) => {
	if (!Array.isArray(list)) return [];

	return list.map(func);
};
