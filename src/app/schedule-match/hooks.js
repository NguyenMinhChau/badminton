'use client';
import { useAppContext, useModal, useToast } from '../../../hooks/';
import {
	CREATE_MATCH_NEXT_ROUND,
	GET_LIST_SCHEDULE_MATCH,
	UPDATE_CA_THI_DAU,
} from '../../services';
import useToggle from '../../utils/useToogle';

export const useScheduleMatch = () => {
	const { state, dispatch } = useAppContext();
	const { data } = state.set_data;
	const { _submitting, _setSubmitting } = useToggle();
	const { schedule_match } = { ...data };
	const { openToast } = useToast();
	const { openModal } = useModal();

	const CallApiGetListScheduleMatch = () => {
		GET_LIST_SCHEDULE_MATCH({
			dispatch,
			_setSubmitting,
			openToast,
		});
	};

	const CallApiCreateMatchNextRound = () => {
		openModal({
			title: 'Xác nhận tạo lịch thi đấu vòng tiếp theo',
			children: () => {
				return (
					<div className="text-orange-500">
						Bạn có chắc muốn tạo lịch thi đấu vòng tiếp theo cho các
						trận đấu?
					</div>
				);
			},
			showSubmitted: true,
			funcSubmitted: () => {
				CREATE_MATCH_NEXT_ROUND({
					dispatch,
					_setSubmitting,
					openToast,
				});
			},
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
		CallApiCreateMatchNextRound,
	};
};
