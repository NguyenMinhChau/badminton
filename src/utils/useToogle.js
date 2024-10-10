import React from 'react';

export default function useToggle(defaultChecked) {
	const [submitting, setSubmitting] = React.useState(defaultChecked || false);

	return {
		_submitting: submitting,
		_setSubmitting: React.useCallback(
			() => setSubmitting((state) => !state),
			[],
		),
		onOpen: () => setSubmitting(true),
		onClose: () => setSubmitting(false),
		setSubmitting: setSubmitting,
	};
}
