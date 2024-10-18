'use client';
import { TYPE_TOAST } from '@/components/Toast';
import { useAppContext, useModal, useToast } from '../../../hooks/';
import { GET_LIST_PLAYERS } from '../../services';
import useToggle from '../../utils/useToogle';

export const useListUserJoin = () => {
	const { state, dispatch } = useAppContext();
	const { data } = state.set_data;
	const { _submitting, _setSubmitting } = useToggle();
	const { user_list_join } = { ...data };
	const { openToast } = useToast();
	const { openModal } = useModal();

	const CallApiGetListPlayers = () => {
		GET_LIST_PLAYERS({
			dispatch,
			_setSubmitting,
			openToast,
		});
	};

	const handleDownloadFileTemplate = () => {
		const link = document.createElement('a');
		link.href = '/TemplateBadmintonPlayers.xlsx';
		link.download = 'TemplateBadmintonPlayers.xlsx';
		link.click();
	};

	const handleUploadFileTemplate = () => {
		var fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.accept = '.xls, .xlsx';
		fileInput.multiple = false;
		fileInput.click();

		fileInput.addEventListener('change', async function (event) {
			var file = event.target.files[0];
			const form = new FormData();

			form.append('xlsxFile', file);
			const handleUpload = async () => {
				if (file) {
					//  call API
					return true;
				} else {
					openToast({
						message: 'File không hợp lệ',
						type: TYPE_TOAST.ERROR,
					});
				}
			};
			openModal({
				title: 'Xác nhận tải lên danh sách tham gia',
				children: () => {
					return (
						<div className="text-orange-500">
							Bạn có chắc muốn tải lên danh sách tham gia?
						</div>
					);
				},
				showSubmitted: true,
				funcSubmitted: () => {
					handleUpload();
				},
			});
		});
	};

	return {
		_submitting,
		user_list_join,

		CallApiGetListPlayers,
		handleDownloadFileTemplate,
		handleUploadFileTemplate,
	};
};
