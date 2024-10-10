'use client';
import { useAppContext } from '../../../hooks/';
import { GET_LIST_PLAYERS } from '../../services';
import useToggle from '../../utils/useToogle';

export const useListUserJoin = () => {
	const { state, dispatch } = useAppContext();
	const { data } = state.set_data;
	const { _submitting, _setSubmitting } = useToggle();
	const { user_list_join, schedule_match } = { ...data };

	const CallApiGetListPlayers = () => {
		GET_LIST_PLAYERS({
			dispatch,
			_submitting,
			_setSubmitting,
		});
	};

	return {
		_submitting,
		user_list_join,

		CallApiGetListPlayers,
	};
};
