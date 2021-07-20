import React, { useContext, useEffect } from 'react';
import { Button, Collapse, Typography } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
import { AppContext } from '../../Context/AppProvider';

const { Panel } = Collapse;

const RoomList = ({ setVisibleSidebar }) => {
	const { rooms, setIsAddRoomVisible, selectedRoomId, setSelectedRoomId } = useContext(AppContext);

	useEffect(() => {
		if (rooms.length > 0) {
			setSelectedRoomId(rooms[0]?.id);
		}
	}, [rooms]);

	const handleAddRoom = () => {
		setIsAddRoomVisible(true);
	}

	const handleSelectRoom = (roomId) => {
		setSelectedRoomId(roomId);

		var width = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

		if (width < 768) {
			setVisibleSidebar(false);
		}
	}

	return (
		<div>
			<Collapse ghost defaultActiveKey={['1']}>
				<PanelStyled header="List rooms" key='1'>
					{
						rooms?.map(room => <LinkStyled style={{ color: room.id === selectedRoomId ? 'coral' : 'rgb(6 202 255)' }} onClick={() => handleSelectRoom(room.id)} key={ room.id }>{ room.name }</LinkStyled>)
					}
					<Button onClick={handleAddRoom} type="text" icon={ <PlusSquareOutlined /> } className="add-room">Add room</Button>
				</PanelStyled>
			</Collapse>	
		</div>
	);
}

export default RoomList;

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