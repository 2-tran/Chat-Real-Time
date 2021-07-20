import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth } from '../../firebase/config';
import { AddDocument, generateKeywords } from '../../firebase/services';

const { Title } = Typography;
const fbProvider = new firebase.auth.FacebookAuthProvider();

const Login = () => {

	const handleFbLogin = async () => {
		const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);

		if (additionalUserInfo?.isNewUser) {
			AddDocument('users', {
				displayName: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
				uid: user.uid,
				providerId: additionalUserInfo.providerId,
				keywords: generateKeywords(user.displayName),
			});
		}
	}

	return (
		<div>
			<Row style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(to right, #fc5c7d, #6a82fb)'}}>
				<Col span={18} style={{ textAlign: 'center' }}>
					<Title style={{ textAlign: 'center' }}>Fun Chat FB</Title>
					{/* <Button style={{ width: '100%', marginBottom: 5 }}>
						Login with Google
					</Button> */}
					<Button onClick={handleFbLogin} style={{ width: '100%', maxWidth: '200px' }}>
						Login with Facebook
					</Button>
					<span style={{ display: 'block', position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>Design by "2 Chan"</span>
				</Col>
			</Row>
		</div>
	);
}

export default Login;