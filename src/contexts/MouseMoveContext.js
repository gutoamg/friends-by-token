import React from 'react'
import { createContext, useRef, useState, useEffect } from 'react'

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


export const MouseMoveContext = createContext();

export const MouseProvider = (props) => {
	// console.log("Mouse provider loaded");
	const [mouseInfo, setMouseInfo] = useState(0);


	useEffect(() => {
		setMouseInfo({
            mouseX: 0, 
            mouseY: 0,
			target: 0
        });
	}, []);


	// Adding global Mouse event listener
	useEventListener('mousemove', (e) => {
		setMouseInfo({
            mouseX: e.clientX, 
            mouseY: e.clientY,
			target: e.target.id
        });
	});

	return (
		<MouseMoveContext.Provider
			value={{
				mouseInfo,
			}}
		>
			{props.children}
		</MouseMoveContext.Provider>
	)
}