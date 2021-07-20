import React, { useMemo, useContext, useState } from 'react';
import useFireStore from '../hooks/useFireStore';
import { AuthContext } from './AuthProvider';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {

  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const { userInfo: { uid } } = useContext(AuthContext);

	const roomsCondition = useMemo(() => {
		return {
			fieldName: 'members',
			operator: 'array-contains',
			compareValue: uid,
		}
	}, [uid]);

	const rooms = useFireStore('rooms', roomsCondition);

	const selectedRoom = useMemo(() => {
		return rooms.find(room => room.id === selectedRoomId);
	}, [rooms, selectedRoomId])

	const usersCondition = useMemo(() => {
		return {
			fieldName: 'uid',
			operator: 'in',
			compareValue: selectedRoom?.members,
		}
	}, [selectedRoom?.members]);
	
	const members = useFireStore('users', usersCondition);

	return (
		<AppContext.Provider value={{ 
			rooms, 
			selectedRoom,
			isAddRoomVisible, 
			setIsAddRoomVisible, 
			isInviteMemberVisible, 
			setIsInviteMemberVisible, 
			selectedRoomId, 
			setSelectedRoomId,
			members 
		}}>
			{ children }
		</AppContext.Provider>
	);
}