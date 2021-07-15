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
			} else {
				history.push('/login');
			}
		});
		
		return () => {
			unsubscribed();
		}
	}, [history]);

	return (
		<AuthContext.Provider value={{ userInfo }}>
			{ isLoading ? <Spin /> : children }
		</AuthContext.Provider>
	);
}