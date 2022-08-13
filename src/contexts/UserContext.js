import React from 'react'
import { createContext, useRef, useState, useEffect, useCallback } from 'react'

export const UserContext = createContext();
export const UserProvider = (props) => {
	const [userInfo, setUserInfo] = useState({
		email: '',
		emailSubmitted: 'false'
	});

	return (
		<UserContext.Provider
			value={{
				userInfo,
				setUserInfo
			}}
		>
			{props.children}
		</UserContext.Provider>
	)
}