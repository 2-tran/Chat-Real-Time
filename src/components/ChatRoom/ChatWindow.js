import React from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import { Button, Tooltip, Avatar, Form, Input } from 'antd';
import styled from 'styled-components';
import Message from './Message';

export default function ChatWindow() {
	return (
		<WrapperStyled>
			<HeaderStyled>
				<div className="header__info">
					<p className="header__title">Room 1</p>
					<span className="header__description">Day la room 1</span>
				</div>
				<ButtonGroupStyled>
					<Button icon={ <UserAddOutlined />} style={{ marginRight: '10px' }}>Invite</Button>
					<Avatar.Group size="small" maxCount={2}>
						<Tooltip title="A">
							<Avatar>A</Avatar>
						</Tooltip>
						<Tooltip title="A">
							<Avatar>A</Avatar>
						</Tooltip>
						<Tooltip title="A">
							<Avatar>A</Avatar>
						</Tooltip>
					</Avatar.Group>
				</ButtonGroupStyled>
			</HeaderStyled>

			<ContentStyled>
				<MessageListStyled>
					<Message text="test" photoURL="null" displayName="test" createdAt="12-02" />
					<Message text="test" photoURL="null" displayName="test" createdAt="12-02" />
					<Message text="test" photoURL="null" displayName="test" createdAt="12-02" />
					<Message text="test" photoURL="null" displayName="test" createdAt="12-02" />
				</MessageListStyled>
				<FormStyled>
					<Form.Item>
						<Input placeholder="Enter message..." bordered={false} autoComplete='off' />
					</Form.Item>
					<Button>Send</Button>
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