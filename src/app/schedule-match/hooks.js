'use client';
import { useAppContext, useToast } from '../../../hooks/';
import { GET_LIST_SCHEDULE_MATCH, UPDATE_CA_THI_DAU } from '../../services';
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

	const CallApiUpdate = (id, payload) => {
		UPDATE_CA_THI_DAU({
			dispatch,
			id,
			payload,
			_setSubmitting,
			openToast,
		});
	};

	return {
		_submitting,
		schedule_match,

		CallApiGetListScheduleMatch,
		CallApiUpdate,
	};
};
