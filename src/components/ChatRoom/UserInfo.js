import { Avatar, Button, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

export default function UserInfo() {
	return (
		<WrapperStyled>
			<div>
				<Avatar>A</Avatar>
				<Typography.Text className='username'>ABC</Typography.Text>
			</div>
			<Button ghost>Logout</Button>
		</WrapperStyled>
	);
}

const WrapperStyled = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 12px 16px;
	border-bottom: 1px solid rgba(82, 38, 38);

	.username{
		color: #fff;
		margin-left: 5px;
	}
`;