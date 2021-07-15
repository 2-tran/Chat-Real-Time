import React from "react";
import { Row, Col } from "antd";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import styled from "styled-components";

export default function Sidebar() {
  return (
		<SidebarStyled>
			<Row>
				<Col span={24}><UserInfo /></Col>
				<Col span={24}><RoomList /></Col>
			</Row>
		</SidebarStyled>
  );
}

const SidebarStyled = styled.div`
	background-color: #3f0e40;
	color: white;
	height: 100vh;
`;
