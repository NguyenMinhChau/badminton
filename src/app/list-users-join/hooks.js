'use client';
import { useAppContext } from '../../../hooks/';
import { GET_LIST_PLAYERS, GET_LIST_SCHEDULE_MATCH } from '../../services';
import useToggle from '../../utils/useToogle';

export const useListUserJoin = () => {
	const { state, dispatch } = useAppContext();
	const { data } = state.set_data;
	const { _submitting, _setSubmitting } = useToggle();
	const { user_list_join, schedule_match } = { ...data };

	const CallApiGetListPlayers = () => {
		GET_LIST_PLAYERS({
			dispatch,
			_setSubmitting,
		});
	};
	const CallApiGetListScheduleMatch = () => {
		GET_LIST_SCHEDULE_MATCH({
			dispatch,
			_setSubmitting,
		});
	};

	return {
		_submitting,
		user_list_join,
		schedule_match,

		CallApiGetListPlayers,
		CallApiGetListScheduleMatch,
	};
};
