import React from 'react'
import { createContext, useRef, useState, useEffect, useCallback } from 'react'


// Optimized global event listener functionality
const useEventListener = (eventName, eventCallback) => {
	const callbackRef = useRef(eventCallback);
	useEffect(() => {
		callbackRef.current = eventCallback; // updating callback internally if it changes
	});
	useEffect(() => {
		const updatedCallback = (e) => callbackRef.current(e); // Returns updated callback version
		document.addEventListener(eventName, updatedCallback);
		return () => document.removeEventListener(eventName, updatedCallback);
	}, [eventName]);
}


export const UserContext = createContext();
export const UserProvider = (props) => {
	const [userInfo, setUserInfo] = useState({
		email: ''
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