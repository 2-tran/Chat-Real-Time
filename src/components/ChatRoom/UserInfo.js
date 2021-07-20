import { Avatar, Button, Typography } from 'antd';
import React, { useContext } from 'react';
import { auth } from '../../firebase/config';
import { AuthContext } from '../../Context/AuthProvider';

import styled from 'styled-components';

export default function UserInfo() {

	const { userInfo: { displayName, photoURL}
	} = useContext(AuthContext);
	
	return (
		<WrapperStyled>
			<div>
				<Avatar src={photoURL}>{ photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}</Avatar>
				<Typography.Text className='username'>{ displayName }</Typography.Text>
			</div>
			<Button ghost onClick={() => auth.signOut()}>Logout</Button>
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