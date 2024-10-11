'use client';
import { useAppContext, useToast } from '../../../hooks/';
import { GET_LIST_SCHEDULE_MATCH } from '../../services';
import useToggle from '../../utils/useToogle';

export const useScheduleMatch = () => {
	const { state, dispatch } = useAppContext();
	const { data } = state.set_data;
	const { _submitting, _setSubmitting } = useToggle();
	const { schedule_match } = { ...data };
	const { openToast } = useToast();

	const CallApiGetListScheduleMatch = () => {
		GET_LIST_SCHEDULE_MATCH({
			dispatch,
			_setSubmitting,
			openToast,
		});
	};

	return {
		_submitting,
		schedule_match,

		CallApiGetListScheduleMatch,
	};
};
