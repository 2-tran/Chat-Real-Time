import React from 'react';
import { Row, Col } from 'antd';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

export default function ChatRoom() {
	return (
		<div>
			<Row>
				<Col md={6} xs={12} >
					<Sidebar />
				</Col>
				<Col md={18} xs={24}>
					<ChatWindow />
				</Col>
			</Row>
		</div>
	);
}