import React from 'react';
import { Button, Collapse, Typography } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

export default function RoomList() {
	return (
		<div>
			<Collapse ghost defaultActiveKey={['1']}>
				<PanelStyled header="List rooms" key='1'>
					<LinkStyled>Room 1</LinkStyled>
					<LinkStyled>Room 2</LinkStyled>
					<LinkStyled>Room 3</LinkStyled>
					<Button type="text" icon={ <PlusSquareOutlined /> } className="add-room">Add room</Button>
				</PanelStyled>
			</Collapse>	
		</div>
	);
}

const PanelStyled = styled(Panel)`
	&&& {
		.ant-collapse-header, p {
			color: #fff;
		}
		.ant-collapse-content-box {
			padding: 0 40px;
		}
		.add-room {
			color: #fff;
			padding: 0;
		}
	}
`;

const LinkStyled = styled(Typography.Link)`
	display: block;
	margin-bottom: 5px;
	color: #fff;
`;