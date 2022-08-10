import React, { useContext, useEffect, useRef, useState } from 'react'
import { ScrollContext } from '../contexts/ScrollContext';
import { MouseMoveContext } from '../contexts/MouseMoveContext';
import classNames from '../../styles/Background.module.scss'


const Background = () => {
	// console.log("Rendering Background component", stringToParse);
	const mouseFollowerRef = useRef(null);
	let { animation_value, percentageScrolled } = useContext(ScrollContext);
	let { mousePos } = useContext(MouseMoveContext);
	const [animationValues, setAnimationValues] = useState({
		leftBallColor: `hsl(0, 73%, 39%)`,
		rightBallColor: `hsl(0, 73%, 39%)`,
		bgGradientLeft: `hsl(0, 73%, 39%)`,
		bgGradientRight: `hsl(0, 73%, 39%)`,
	});

	

	useEffect(() => {
		// console.log(scrollPos);
		const newLeftBallColor = animation_value(0, 1, percentageScrolled, 0, 309);
		const newRightBallColor = animation_value(0, 1, percentageScrolled, 150, 360);
		const newBgGradientLeft = animation_value(0, 1, percentageScrolled, -150, 300);
		const newBgGradientRight = animation_value(0, 1, percentageScrolled, 50, 1000);
		setAnimationValues(prevValues => {
			prevValues.leftBallColor = `hsla(${newLeftBallColor}, 73%, 39%, 1)`;
			prevValues.rightBallColor = `hsla(${newRightBallColor}, 73%, 39%, 0.8)`;
			prevValues.bgGradientLeft = `hsla(${newBgGradientLeft}, 73%, 39%, 1)`;
			prevValues.bgGradientRight = `hsla(${newBgGradientRight}, 73%, 39%, 1)`;
			return prevValues;
		});
	}, [percentageScrolled]);

	useEffect(() => {
		const newLeftPos = (mousePos.mouseX) - mouseFollowerRef.current.offsetWidth / 2;
		const newTopPos = (mousePos.mouseY) - mouseFollowerRef.current.offsetHeight / 2;
		// console.log(newLeftPos, newTopPos);
		setAnimationValues(prevValues => {
			prevValues.bgGradientPosLeft = `${newLeftPos}px`;
			prevValues.bgGradientPosTop = `${newTopPos}px`;
			return prevValues;
		});
	}, [mousePos]);


	return (
		<div className={classNames.backgroundContainer}>
			<div className={classNames.blurredLayer}></div>
			<div 
				className={classNames.leftBall} 
				style={{
					"backgroundColor": animationValues.leftBallColor,
				}}
			></div>
			<div 
				className={classNames.rightBall} 
				style={{
					"backgroundColor": animationValues.rightBallColor
				}}
			></div>
			<div 
				className={classNames.bgGradient} 
				style={{
					"background": `linear-gradient(${animationValues.bgGradientLeft}, ${animationValues.bgGradientRight})`,
				}}
			></div>
			<div 
				ref={mouseFollowerRef}
				className={classNames.cursorFollower} 
				style={{
					"background": `linear-gradient(${animationValues.bgGradientRight}, ${animationValues.bgGradientLeft})`,
					"left": animationValues.bgGradientPosLeft,
					"top": animationValues.bgGradientPosTop,
				}}
			></div>
		</div>
	)
}

export default Background