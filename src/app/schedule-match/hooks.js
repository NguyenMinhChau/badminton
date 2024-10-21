'use client';
import { fetchDataRead, TYPE_COLLECTIONS } from '@/firebase';
import { useAppContext, useModal, useToast } from '../../../hooks/';
import {
	CREATE_FIRST_ROUND,
	CREATE_MATCH_NEXT_ROUND,
	GET_LIST_SCHEDULE_MATCH,
	UPDATE_CA_THI_DAU,
} from '../../services';
import useToggle from '../../utils/useToogle';
import React from 'react';

export const useScheduleMatch = () => {
	const { state, dispatch } = useAppContext();
	const { data } = state.set_data;
	const { _submitting, _setSubmitting } = useToggle();
	const { schedule_match, user } = { ...data };
	const { openToast } = useToast();
	const { openModal } = useModal();

	React.useEffect(() => {
		const userID = localStorage.getItem('user_id');
		fetchDataRead({
			collection: TYPE_COLLECTIONS.BADMINTON_FTEL,
			docId: userID,
		}).then((data) => {
			dispatch(
				actions.SET_DATA_PAYLOAD({
					key: 'data',
					value: {
						user: data,
					},
				}),
			);
		});
	}, []);

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
						Bạn có chắc muốn tạo lịch thi đấu vòng tiếp theo cho các trận đấu?
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
	const CallApiCreateMatchFirstRound = (noiDungThiDau) => {
		openModal({
			title: 'Xác nhận tạo lịch thi đấu vòng đầu tiên',
			children: () => {
				return (
					<div className="text-orange-500">
						Bạn có chắc muốn tạo lịch thi đấu vòng đầu tiên cho các trận đấu?
					</div>
				);
			},
			showSubmitted: true,
			funcSubmitted: () => {
				CREATE_FIRST_ROUND({
					dispatch,
					_setSubmitting,
					openToast,
					noiDungThiDau,
				});
			},
		});
	};

	const CallApiUpdate = (data, _seeds) => {
		openModal({
			title: 'Xác nhận cập nhật tỉ số thi đấu',
			children: () => {
				return (
					<div className="text-orange-500">
						Bạn có chắc muốn cập nhật lịch tỉ số thi đấu cho các trận đấu?
					</div>
				);
			},
			showSubmitted: true,
			funcSubmitted: () => {
				UPDATE_CA_THI_DAU({
					dispatch,
					data,
					_setSubmitting,
					openToast,
					_seeds,
				});
			},
		});
	};

	return {
		_submitting,
		user,
		schedule_match,
		user,

		CallApiGetListScheduleMatch,
		CallApiUpdate,
		CallApiCreateMatchFirstRound,
		CallApiCreateMatchNextRound,
	};
};
