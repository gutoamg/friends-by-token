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
	const [mousePos, setMousePos] = useState(0);


	useEffect(() => {
		setMousePos({
            mouseX: 0, 
            mouseY: 0
        });
	}, []);


	// Adding global Mouse event listener
	useEventListener('mousemove', (e) => {
		setMousePos({
            mouseX: e.clientX, 
            mouseY: e.clientY
        });
	});

	return (
		<MouseMoveContext.Provider
			value={{
				mousePos,
			}}
		>
			{props.children}
		</MouseMoveContext.Provider>
	)
}