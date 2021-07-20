import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import styled from "styled-components";
import { MenuOutlined } from "@ant-design/icons";

export default function Sidebar() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		var width = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;
		if (width > 767) {
			setIsVisible(true);
		}
	},[]);

  return (
		<>
			<BgStyled onClick={() => setIsVisible(false)} style={{ display: isVisible ? 'block' : 'none' }}></BgStyled>
			<MenuStyled onClick={() => setIsVisible(true)}>
				<MenuOutlined style={{ color: '#fff' }} />
			</MenuStyled>
			<SidebarStyled style={{ display: isVisible ? 'block' : 'none' }}>
				<Row>
					<Col span={24}><UserInfo /></Col>
					<Col span={24}><RoomList setVisibleSidebar={setIsVisible} /></Col>
				</Row>
			</SidebarStyled>
		</>
  );
}

const SidebarStyled = styled.div`
	background-color: #3f0e40;
	color: white;
	height: 100vh;

	@media (max-width: 767px) {
		position: fixed;
		top: 0;
		left: 0;
		width: 80%;
		height: 100vh;
		overflow-y: auto;
		display: none;
		z-index: 4;
	}
`;

const MenuStyled = styled.div`
	display: none;
	
	@media (max-width: 767px) {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 20%;
		right: 10px;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: #3f0e40;
		z-index: 2;
	}
`;

const BgStyled = styled.div`
	display: none;
	
	@media (max-width: 767px) {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,0.5);
		display: none;
		z-index: 3;
	}
`;
