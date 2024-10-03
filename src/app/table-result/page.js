'use client';
import { Container } from '@/components/Container';
import { Table } from '@/components/Table';

export default function TableResult() {
	const data = [
		{
			maNV: '0026815',
			email: 'icdp@fpt.com',
			result: 0,
		},
		{
			maNV: '0026816',
			email: 'icdp01@fpt.com',
			result: 1,
		},
		{
			maNV: '0026817',
			email: 'icdp02@fpt.com',
			result: 2,
		},
	];
	const _columns = [
		{
			key: 'maNV',
			Header: 'Mã NV',
		},
		{
			key: 'email',
			Header: 'Email',
			accessor: (row) => row.email,
		},
		{
			key: 'result',
			Header: 'Kết quả',
			accessor: (row) => {
				return (
					<span>
						{row.result === 1
							? 'Thắng'
							: row.result === 2
							? 'Hòa'
							: 'Thua'}
					</span>
				);
			},
		},
	];
	return (
		<Container className="p-[0.3rem!important]">
			<Table columns={_columns} data={data} title="BẢNG KẾT QUẢ" />
		</Container>
	);
}
