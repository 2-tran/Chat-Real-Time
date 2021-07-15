import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth } from '../../firebase/config';

const { Title } = Typography;
const fbProvider = new firebase.auth.FacebookAuthProvider();

const Login = () => {

	const handleFbLogin = () => {
		auth.signInWithPopup(fbProvider);
	}

	return (
		<div>
			<Row style={{ height: 'calc(100vh - 100px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Col span={8}>
					<Title style={{ textAlign: 'center' }}>Fun Chat</Title>
					<Button style={{ width: '100%', marginBottom: 5 }}>
						Login with Google
					</Button>
					<Button onClick={handleFbLogin} style={{ width: '100%' }}>
						Login with Facebook
					</Button>
				</Col>
			</Row>
		</div>
	);
}

export default Login;