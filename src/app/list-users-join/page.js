'use client';
import { Container } from '@/components/Container';
import { Table } from '@/components/Table';

export default function ListUsersJoin() {
	const data = [
		{
			maNV: '0026815',
			email: 'icdp@fpt.com',
		},
		{
			maNV: '0026816',
			email: 'icdp01@fpt.com',
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
	];
	return (
		<Container className="p-[0.3rem!important]">
			<Table columns={_columns} data={data} title="DANH SÁCH THAM GIA" />
		</Container>
	);
}
