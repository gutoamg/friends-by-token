import React from 'react'
import { createContext, useRef, useState, useEffect, useCallback } from 'react'

const animation_value = (intervalBeg, intervalEnd, currentPos, stateBeg, stateEnd) => {
    var animationVariable = undefined;
    if (currentPos <= intervalBeg)
        animationVariable = stateBeg;
    else if (currentPos >= intervalEnd)
        animationVariable = stateEnd;
    else {
        if (intervalBeg === 0)
            intervalBeg = 0.0001;
        else if (intervalEnd === 0)
            intervalEnd = 0.0001;
        else if (currentPos === 0)
            currentPos = 0.0001;
        else if (stateBeg === 0)
            stateBeg = 0.0001;
        else if (stateEnd === 0)
            stateEnd = 0.0001;
        var changeInState = stateEnd - stateBeg;
        var percentageIntervalPos = (intervalEnd / intervalBeg) - 1;
        animationVariable = (stateBeg + ((changeInState / percentageIntervalPos) * ((currentPos / intervalBeg) - 1)));
    }

    return animationVariable;
};

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


export const ScrollContext = createContext();
export const ScrollProvider = (props) => {
    // console.log("Scroll provider loaded");
    const [scrollPos, setScrollPos] = useState(0);
    const [percentageScrolled, setPercentageScrolled] = useState(0);
    const [pageHeight, setPageHeight] = useState(0);
    const [pageWidth, setPageWidth] = useState(0);

    useEffect(() => {
        setScrollPos(window.scrollY);
    }, []);

    // If there was resize event
    useEffect(() => {
        console.log("Page HEIGHT - Width:", pageHeight, pageWidth);
    }, [pageHeight, pageWidth]);

    // Adding global scroll event listener
    useEventListener('scroll', (e) => {
        setScrollPos(window.scrollY);
        const newPercentageScrolled = window.scrollY / (pageHeight - window.innerHeight);
        setPercentageScrolled(newPercentageScrolled);
    });


    return (
        <ScrollContext.Provider
            value={{
                scrollPos,
                pageHeight,
                setPageHeight,
                animation_value,
                percentageScrolled, 
                pageWidth, 
                setPageWidth
            }}
        >
            {props.children}
        </ScrollContext.Provider>
    )
}