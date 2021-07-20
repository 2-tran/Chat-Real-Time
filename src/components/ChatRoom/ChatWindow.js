import React, { useContext, useMemo, useState } from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import { Button, Tooltip, Avatar, Form, Input } from 'antd';
import styled from 'styled-components';
import Message from './Message';
import { AppContext } from '../../Context/AppProvider';
import { AddDocument } from '../../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';
import useFireStore from '../../hooks/useFireStore';

export default function ChatWindow() {
	const [form] = Form.useForm();
	const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext);
	const { userInfo: { uid, displayName, photoURL } } = useContext(AuthContext);
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (e) => {
		setInputValue(e.target.value)
	}

	const handleOnSubmit = () => {
		AddDocument('messages', {
			text: inputValue,
			uid,
			photoURL,
			roomId: selectedRoom.id,
			displayName
		});

		form.resetFields(['message']);
	}

	const condition = useMemo(() => ({
			fieldName: 'roomId',
			operator: '==',
			compareValue: selectedRoom?.id
	}), [selectedRoom?.id]);

	const messages = useFireStore('messages', condition);

	return (
		<WrapperStyled>
			<HeaderStyled>
				<div className="header__info">
					<p className="header__title">{selectedRoom?.name}</p>
					<span className="header__description">{selectedRoom?.description}</span>
				</div>
				<ButtonGroupStyled>
					<Button onClick={() => setIsInviteMemberVisible(true)} icon={ <UserAddOutlined />} style={{ marginRight: '10px' }}>Invite</Button>
					<Avatar.Group size="small" maxCount={2}>
						{
							members?.map((member) => {
								return (
									<Tooltip title={member.displayName} key={member.id}>
										<Avatar src={member.photoURL}>{member.photoURL ?? member.displayName?.charAt(0)?.toUpperCase()}</Avatar>
									</Tooltip>
								)
							})
						}
					</Avatar.Group>
				</ButtonGroupStyled>
			</HeaderStyled>

			<ContentStyled>
				<MessageListStyled>
					{
						messages.map(mes => (
							<Message 
								key={mes.id}
								text={mes.text} 
								photoURL={mes.photoURL}
								displayName={mes.displayName}
								createdAt={mes.createdAt} 
							/>
						))
					}
				</MessageListStyled>
				<FormStyled form={form}>
					<Form.Item name="message">
						<Input 
							onChange={handleInputChange}
							onPressEnter={handleOnSubmit}
							placeholder="Enter message..." 
							bordered={false} 
							autoComplete='off' 
						/>
					</Form.Item>
					<Button onClick={handleOnSubmit}>Send</Button>
				</FormStyled>
			</ContentStyled>
		</WrapperStyled>
	);
}

const HeaderStyled = styled.div`
	display: flex;
	justify-content: space-between;
	height: 56px;
	padding: 0 16px;
	align-items: center;
	border-bottom: 1px solid rgba(230, 230, 230);

	.header {
		&__info {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		&__title {
			margin: 0;
			font-weight: bold;
		}
		&__description {
			font-size: 12px;
		}
	}
`;

const ButtonGroupStyled = styled.div`
	display: flex;
	align-items: center;
`;

const ContentStyled = styled.div`
	height: calc(100% - 56px);
	display: flex;
	flex-direction: column;
	padding: 11px;
	justify-content: flex-end;
`;

const FormStyled = styled(Form)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2px 2px 2px 0;
	border 1px solid rgba(230, 230, 230);
	border-radius: 2px;

	.ant-form-item {
		flex: 1;
		margin-bottom: 0;
	}
`;

const MessageListStyled = styled.div`
	max-height: 100%;
	overflow-y: auto;
`;

const WrapperStyled = styled.div`
	height: 100vh;
`;