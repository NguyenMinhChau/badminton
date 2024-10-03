'use client';
import { Container } from '@/components/Container';
import { Table } from '@/components/Table';

export default function Range() {
	const data = [
		{
			maNV: '0026816',
			email: 'icdp01@fpt.com',
			range: 1,
		},
		{
			maNV: '0026817',
			email: 'icdp02@fpt.com',
			range: 2,
		},
		{
			maNV: '0026815',
			email: 'icdp@fpt.com',
			range: 3,
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
			key: 'range',
			Header: 'Xếp hạng',
		},
	];
	return (
		<Container className="p-[0.3rem!important]">
			<Table columns={_columns} data={data} title="BẢNG XẾP HẠNG" />
		</Container>
	);
}
