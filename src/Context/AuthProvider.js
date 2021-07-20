import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
	const [userInfo, setUserInfo] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();

	useEffect(() => {
		const unsubscribed = auth.onAuthStateChanged((user) => {
			if (user) {
				const { displayName, email, uid, photoURL } = user;
				setUserInfo({displayName, email, uid, photoURL});
				setIsLoading(false);
				history.push('/');
				return;
			}
			
			history.push('/login');
			setIsLoading(false);
		});
		
		return () => {
			unsubscribed();
		}
	}, [history]);

	return (
		<AuthContext.Provider value={{ userInfo }}>
			{ isLoading ? <Spin style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} /> : children }
		</AuthContext.Provider>
	);
}