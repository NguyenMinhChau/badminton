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
